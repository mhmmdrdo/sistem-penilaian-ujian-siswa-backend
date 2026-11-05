import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";
import { decryptSecret } from "@/lib/secret";

const textRequestSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().min(1).max(120_000),
});

const imageRequestSchema = z.object({
  type: z.literal("vision"),
  images: z.array(z.string().min(1).max(12_000_000)).min(1).max(20),
});

const schema = z.discriminatedUnion("type", [textRequestSchema, imageRequestSchema]);

// Model sebelumnya mengembalikan 404 dari provider NVIDIA meski masih tampil di katalog OpenRouter.
const TEXT_MODEL = "nvidia/nemotron-3.5-lightning:free";
const VISION_MODEL = "nvidia/nemotron-3.5-super-vl:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const textSystemPrompt = `Kamu adalah parser soal ujian profesional yang sangat teliti.
Tugasmu adalah mengonversi SETIAP soal dalam teks ke format JSON.

Aturan WAJIB:
1. Output HANYA array JSON mentah, tanpa markdown atau teks lain.
2. Konversi SEMUA soal yang ada.
3. Jika teks memuat bagian "KUNCI JAWABAN", gunakan kunci tersebut sebagai sumber jawaban. Jangan menghitung atau menebak ulang jawaban pilihan ganda.
4. Field "jawaban" soal pilihan ganda HANYA berisi HURUF opsi yang benar: "A", "B", "C", "D", atau "E".
5. Untuk essay, field "jawaban" berisi jawaban akhir yang tertulis pada kunci jawaban, tanpa langkah penyelesaian. Jika tidak ada kunci, gunakan string kosong.
6. Field "pembahasan" berisi langkah penyelesaian essay bila tersedia, atau string kosong.
7. Opsi bisa sampai 5 (A, B, C, D, E).
8. Hapus teks duplikat dari pertanyaan dan opsi.

Format setiap soal:
{"no":1,"pertanyaan":"teks soal","tipe":"pg","opsi":["teks opsi A","teks opsi B"],"jawaban":"A","pembahasan":"","topik":""}`;

const visionSystemPrompt = `Kamu adalah parser soal ujian profesional dengan kemampuan vision.
Tugas: baca gambar halaman PDF soal ujian, ekstrak SEMUA soal beserta info gambar.

Aturan WAJIB:
1. Output HANYA array JSON mentah, tanpa markdown atau teks lain.
2. Ekstrak SEMUA soal dari semua halaman.
3. Field "jawaban" berisi HURUF KAPITAL: "A", "B", "C", "D", atau "E".
4. Field "hasGambar" true jika ada gambar/foto/ilustrasi/diagram yang menempel pada soal.
5. "gambarPageIndex" memakai indeks halaman mulai dari 0, atau -1 jika tidak ada gambar.
6. "gambarBoundingBox" adalah {"x":0-100,"y":0-100,"w":0-100,"h":0-100} atau null.
7. Opsi bisa A sampai E.

Format setiap soal:
{"no":1,"pertanyaan":"teks soal","tipe":"pg","opsi":["A","B","C","D","E"],"jawaban":"A","topik":"","hasGambar":false,"gambarPageIndex":-1,"gambarBoundingBox":null}`;

function parseResponse(content: unknown) {
  if (typeof content !== "string") throw new Error("Respons AI tidak memiliki isi");

  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  const match = cleaned.match(/(\[[\s\S]*\])/);
  const parsed = JSON.parse(match ? match[1] : cleaned);

  if (!Array.isArray(parsed)) throw new Error("Respons AI bukan daftar soal");
  return parsed;
}

// Model terkadang mengembalikan label opsi sebagai bagian dari isi teks,
// misalnya "A. 0,82". Label tersebut dirender oleh frontend, jadi harus
// dibuang agar tidak tampil menjadi "A. A. 0,82".
function normalizeOptionText(value: unknown): string {
  if (typeof value !== "string") return "";

  let normalized = value.trim();
  let previous = "";
  while (normalized !== previous) {
    previous = normalized;
    normalized = normalized
      .replace(/^\s*[\[\(]?[A-E][\]\)]?\s*[.:)\-]\s*/i, "")
      .trim();
  }
  return normalized;
}

function normalizeQuestion(question: unknown) {
  if (!question || typeof question !== "object") return question;

  const item = question as Record<string, unknown>;
  const options = Array.isArray(item.opsi)
    ? item.opsi.map(normalizeOptionText).filter(Boolean)
    : [];
  const rawAnswer = typeof item.jawaban === "string" ? item.jawaban.trim() : "";
  const answerMatch = rawAnswer.match(/^\s*[\[\(]?([A-E])[\]\)]?(?:\s*[.:)\-]|\s*$)/i);
  const answer = answerMatch
    ? answerMatch[1].toUpperCase()
    : (() => {
        const normalizedAnswer = normalizeOptionText(rawAnswer).toLowerCase();
        const optionIndex = options.findIndex((option) => option.toLowerCase() === normalizedAnswer);
        return optionIndex >= 0 ? String.fromCharCode(65 + optionIndex) : rawAnswer;
      })();

  return {
    ...item,
    opsi: options,
    jawaban: answer,
  };
}

function normalizeQuestions(questions: unknown[]) {
  return questions.map(normalizeQuestion);
}

function extractMultipleChoiceAnswerKey(text: string): string[] {
  const answerKeySection = text.match(
    /A\.\s*Kunci\s+Jawaban\s+Pilihan\s+Ganda\s+([\s\S]*?)(?=\s+B\.\s*Kunci\s+Jawaban(?:\s+dan\s+Pembahasan)?(?:\s+Uraian)?\b)/i
  )?.[1];

  if (!answerKeySection) return [];
  return [...answerKeySection.matchAll(/\b([A-E])\b/gi)].map((match) => match[1].toUpperCase());
}

function applyAnswerKey(parsed: unknown[], text: string) {
  const answerKey = extractMultipleChoiceAnswerKey(text);
  if (!answerKey.length) return parsed;

  let answerIndex = 0;
  return parsed.map((question) => {
    if (!question || typeof question !== "object") return question;
    const item = question as Record<string, unknown>;
    const isEssay = String(item.tipe).toLowerCase() === "essay";
    if (isEssay) return item;

    const answer = answerKey[answerIndex++];
    return answer ? { ...item, jawaban: answer } : item;
  });
}

async function requestOpenRouter(apiKey: string, body: Record<string, unknown>) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
      });

      // Do not retry client errors, rate limits, or a response from OpenRouter.
      if (response.ok || response.status < 500) return response;
      lastError = new Error(`OpenRouter merespons ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw lastError instanceof Error ? lastError : new Error("Koneksi ke OpenRouter terputus");
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Data import soal tidak valid" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: { openrouterApiKeyEncrypted: true },
  });
  if (!user?.openrouterApiKeyEncrypted) {
    return NextResponse.json(
      { message: "Simpan API key OpenRouter di halaman Profil sebelum memakai Import Soal." },
      { status: 400 }
    );
  }

  try {
    const apiKey = decryptSecret(user.openrouterApiKeyEncrypted);
    const isVision = parsed.data.type === "vision";
    const sourceText = parsed.data.type === "text" ? parsed.data.text : null;
    let userContent: string | Array<Record<string, unknown>>;
    if (parsed.data.type === "vision") {
      userContent = [
          { type: "text", text: "Berikut halaman PDF soal. Ekstrak semua soal. Keluarkan hanya array JSON." },
          ...parsed.data.images.flatMap((image, index) => [
            { type: "text", text: `--- HALAMAN ${index + 1} (index ${index}) ---` },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}`, detail: "high" } },
          ]),
        ];
    } else {
      userContent = `Konversi semua soal berikut ke dalam JSON array.\n\n===SOAL===\n${parsed.data.text}\n===AKHIR SOAL===`;
    }

    const response = await requestOpenRouter(apiKey, {
        model: isVision ? VISION_MODEL : TEXT_MODEL,
        messages: [
          { role: "system", content: isVision ? visionSystemPrompt : textSystemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0,
        max_tokens: isVision ? 16_000 : 12_000,
        include_reasoning: false,
        reasoning: { enabled: false },
      });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({ message: "API key OpenRouter tidak valid atau tidak memiliki akses ke model ini." }, { status: 400 });
      }
      if (response.status === 429) {
        return NextResponse.json({ message: "Batas penggunaan OpenRouter tercapai. Coba lagi nanti atau periksa kredit akun Anda." }, { status: 429 });
      }
      return NextResponse.json({ message: "OpenRouter gagal memproses soal. Coba lagi beberapa saat." }, { status: 502 });
    }

    const result = await response.json();
    const questions = parseResponse(result.choices?.[0]?.message?.content);
    const withAnswerKey = sourceText ? applyAnswerKey(questions, sourceText) : questions;
    const normalizedQuestions = normalizeQuestions(withAnswerKey);
    return NextResponse.json({
      questions: normalizedQuestions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("AI parse soal error:", message);
    const isConnectionError = /terminated|abort|fetch failed|socket|network/i.test(message);
    return NextResponse.json(
      { message: isConnectionError ? "Koneksi ke OpenRouter terputus. Silakan coba impor kembali." : "Gagal memproses soal dengan AI" },
      { status: isConnectionError ? 503 : 500 }
    );
  }
}
