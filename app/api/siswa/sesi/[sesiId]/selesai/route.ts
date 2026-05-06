import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { alasan } = await req.json();

  const sesi = await prisma.sesiSiswa.findUnique({
    where: { id: params.sesiId },
    include: {
      jawaban: true,
      ujian: { include: { soalUjian: { include: { soal: true } } } },
    },
  });

  if (!sesi) return NextResponse.json({ message: "Sesi tidak ditemukan" }, { status: 404 });

  const totalSoal = sesi.ujian.soalUjian.length;
  const pgSoal = sesi.ujian.soalUjian.filter((us) => us.soal.tipe === "PILIHAN_GANDA");
  const benar = sesi.jawaban.filter((j) => j.isBenar).length;
  const salah = pgSoal.length - benar;
  const nilaiAkhir = pgSoal.length > 0 ? (benar / pgSoal.length) * 100 : 0;

  const konfig = await prisma.konfigNilai.findUnique({
    where: { mataPelajaranId: sesi.ujian.mataPelajaranId },
  });
  const kkm = konfig?.kkm ?? 70;

  const status = alasan === "TIMEOUT" ? "TIMEOUT"
    : alasan === "DIHENTIKAN" ? "DIHENTIKAN" : "SELESAI";

  await prisma.sesiSiswa.update({
    where: { id: params.sesiId },
    data: { status, selesaiAt: new Date(), nilaiBenar: benar, nilaiSalah: salah, nilaiAkhir },
  });

  return NextResponse.json({
    nilaiBenar: benar, nilaiSalah: salah,
    nilaiAkhir: Math.round(nilaiAkhir * 10) / 10,
    totalSoal, lulus: nilaiAkhir >= kkm, kkm,
  });
}
