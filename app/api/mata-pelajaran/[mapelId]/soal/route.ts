import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const tipe = searchParams.get("tipe");

  const data = await prisma.soal.findMany({
    where: {
      mataPelajaranId: parseInt(params.mapelId),
      ...(tipe && { tipe: tipe as "PILIHAN_GANDA" | "ESSAY" }),
      ...(search && { pertanyaan: { contains: search } }),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data, total: data.length });
}

export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();

  // Destructure hanya field yang ada di schema Soal
  const {
    pertanyaan,
    tipe,
    topik,
    gambarUrl,
    opsiA,
    opsiB,
    opsiC,
    opsiD,
    opsiE,
    jawabanBenar,
    pembahasan,
  } = body;

  const soal = await prisma.soal.create({
    data: {
      pertanyaan,
      tipe: tipe || "PILIHAN_GANDA",
      topik: topik || null,
      gambarUrl: gambarUrl || null,
      opsiA: opsiA || null,
      opsiB: opsiB || null,
      opsiC: opsiC || null,
      opsiD: opsiD || null,
      opsiE: opsiE || null,
      jawabanBenar: jawabanBenar || null,
      pembahasan: pembahasan || null,
      mataPelajaranId: parseInt(params.mapelId),
      userId: auth.user.id,
    },
  });

  return NextResponse.json(
    { message: "Soal berhasil ditambahkan", id: soal.id },
    { status: 201 }
  );
}