import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function PUT(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  
  // Hanya ambil field yang valid di schema — buang totalSoal, totalUjian, id, dll
  const { nama, kelas, deskripsi, warna } = body;

  await prisma.mataPelajaran.update({
    where: { id: parseInt(params.mapelId) },
    data: { nama, kelas, deskripsi, warna },
  });

  return NextResponse.json({ message: "Mata pelajaran berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  await prisma.mataPelajaran.delete({
    where: { id: parseInt(params.mapelId) },
  });

  return NextResponse.json({ message: "Mata pelajaran berhasil dihapus" });
}