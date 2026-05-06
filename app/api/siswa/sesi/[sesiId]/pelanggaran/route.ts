import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BATAS_PELANGGARAN = 3;

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { jenis, catatan } = await req.json();

  await prisma.pelanggaranSiswa.create({
    data: { sesiId: params.sesiId, jenis, catatan },
  });

  const sesi = await prisma.sesiSiswa.update({
    where: { id: params.sesiId },
    data: { jumlahPelanggaran: { increment: 1 } },
  });

  const dihentikan = sesi.jumlahPelanggaran >= BATAS_PELANGGARAN;

  if (dihentikan && sesi.status === "BERLANGSUNG") {
    await prisma.sesiSiswa.update({
      where: { id: params.sesiId },
      data: { status: "DIHENTIKAN", selesaiAt: new Date() },
    });
  }

  return NextResponse.json({ jumlahPelanggaran: sesi.jumlahPelanggaran, dihentikan });
}
