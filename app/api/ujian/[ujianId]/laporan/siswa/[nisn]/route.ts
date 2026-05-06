import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { ujianId: string; nisn: string } }
) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const sesi = await prisma.sesiSiswa.findFirst({
    where: { ujianId: params.ujianId, nisn: params.nisn },
    include: { jawaban: true },
  });
  if (!sesi) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: { soalUjian: { include: { soal: true }, orderBy: { urutan: "asc" } } },
  });

  const kkm = 70;

  const jawaban = ujian!.soalUjian.map((us, idx) => {
    const jwb = sesi.jawaban.find((j) => j.soalId === us.soal.id);
    return {
      nomorSoal: idx + 1,
      pertanyaan: us.soal.pertanyaan,
      jawabanSiswa: jwb?.jawabanDipilih ?? null,
      jawabanBenar: us.soal.jawabanBenar,
      isBenar: jwb?.isBenar ?? false,
      isRagu: jwb?.isRagu ?? false,
    };
  });

  return NextResponse.json({
    siswa: {
      nisn: sesi.nisn, nama: sesi.namaLengkap, kelas: sesi.kelas,
      nilai: Math.round(sesi.nilaiAkhir),
      benar: sesi.nilaiBenar, salah: sesi.nilaiSalah,
      lulus: sesi.nilaiAkhir >= kkm,
      pelanggaran: sesi.jumlahPelanggaran,
    },
    jawaban,
  });
}
