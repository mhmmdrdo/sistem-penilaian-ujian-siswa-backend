import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { soalId, jawaban, isRagu } = await req.json();

  const soal = await prisma.soal.findUnique({ where: { id: soalId } });
  if (!soal) return NextResponse.json({ message: "Soal tidak ditemukan" }, { status: 404 });

  const isBenar = soal.tipe === "PILIHAN_GANDA"
    ? soal.jawabanBenar === jawaban
    : false;

  await prisma.jawabanSiswa.upsert({
    where: { sesiId_soalId: { sesiId: params.sesiId, soalId } },
    update: { jawabanDipilih: jawaban, isBenar, isRagu: isRagu ?? false, waktuDijawab: new Date() },
    create: { sesiId: params.sesiId, soalId, jawabanDipilih: jawaban, isBenar, isRagu: isRagu ?? false },
  });

  return NextResponse.json({ message: "Jawaban disimpan" });
}
