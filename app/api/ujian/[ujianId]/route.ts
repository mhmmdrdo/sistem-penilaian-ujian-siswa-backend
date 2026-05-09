


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: {
      soalUjian: {
        include: { soal: true },
        orderBy: { urutan: "asc" },
      },
      _count: { select: { sesiSiswa: true } },
      sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
    },
  });

  if (!ujian) return NextResponse.json({ message: "Ujian tidak ditemukan" }, { status: 404 });

  const baseUrl = process.env.FRONTEND_URL;

  return NextResponse.json({
    id: ujian.id,
    nama: ujian.nama,
    tipe: ujian.tipe,
    status: ujian.status,
    token: ujian.token,
    durasi: ujian.durasi,
    kelas: ujian.kelas,
    tanggalMulai: ujian.tanggalMulai,
    acakSoal: ujian.acakSoal,
    totalSoal: ujian.soalUjian.length,
    peserta: {
      masuk: ujian.sesiSiswa.length,
      total: ujian._count.sesiSiswa,
    },
    // ── DUA link berbeda ──
    linkSiswa: `${baseUrl}/siswa/akses-ujian/${ujian.id}`,
    linkPreview: `${baseUrl}/siswa/ujian/preview/${ujian.id}`,
    // soal: ujian.soalUjian.map((us) => ({
    //   id: us.soal.id,
    //   urutan: us.urutan,
    //   pertanyaan: us.soal.pertanyaan,
    //   tipe: us.soal.tipe,
    //   topik: us.soal.topik,
    //   opsiA: us.soal.opsiA,
    //   opsiB: us.soal.opsiB,
    //   opsiC: us.soal.opsiC,
    //   opsiD: us.soal.opsiD,
    //   opsiE: us.soal.opsiE,  // ← tambah opsiE
    //   jawabanBenar: us.soal.jawabanBenar,
    //   gambarUrl: us.soal.gambarUrl,
    // })),
    soal: ujian.soalUjian.map((us) => {
      // ✅ Hanya kirim gambarUrl jika berupa URL Cloudinary (https://)
      // Jangan pernah kirim base64 — browser tidak bisa render base64 panjang sebagai <img src>
      const gambarUrl = us.soal.gambarUrl?.startsWith("https://")
        ? us.soal.gambarUrl
        : null;

      return {
        id: us.soal.id,
        urutan: us.urutan,
        pertanyaan: us.soal.pertanyaan,
        tipe: us.soal.tipe,
        topik: us.soal.topik,
        opsiA: us.soal.opsiA,
        opsiB: us.soal.opsiB,
        opsiC: us.soal.opsiC,
        opsiD: us.soal.opsiD,
        opsiE: us.soal.opsiE,
        jawabanBenar: us.soal.jawabanBenar,
        gambarUrl,
      };
    }),
  });
}

export async function PUT(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await req.json();
    const { soalIds, ...rest } = body;

    if (soalIds && Array.isArray(soalIds)) {
      await prisma.ujianSoal.deleteMany({ where: { ujianId: params.ujianId } });

      if (soalIds.length > 0) {
        await prisma.ujianSoal.createMany({
          data: soalIds.map((soalId: string, idx: number) => ({
            ujianId: params.ujianId,
            soalId,
            urutan: idx + 1,
          })),
        });
      }
    }

    if (Object.keys(rest).length > 0) {
      await prisma.ujian.update({
        where: { id: params.ujianId },
        data: rest,
      });
    }

    return NextResponse.json({ message: "Ujian berhasil diperbarui" });
  } catch (error) {
    console.error("PUT ujian error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui ujian", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await prisma.ujianSoal.deleteMany({ where: { ujianId: params.ujianId } });
    await prisma.ujian.delete({ where: { id: params.ujianId } });
    return NextResponse.json({ message: "Ujian berhasil dihapus" });
  } catch (error) {
    console.error("DELETE ujian error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus ujian", error: String(error) },
      { status: 500 }
    );
  }
}