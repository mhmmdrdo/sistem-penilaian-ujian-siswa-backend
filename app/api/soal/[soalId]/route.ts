import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function PUT(req: NextRequest, { params }: { params: { soalId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  await prisma.soal.update({ where: { id: params.soalId }, data: body });
  return NextResponse.json({ message: "Soal berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { soalId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  await prisma.soal.delete({ where: { id: params.soalId } });
  return NextResponse.json({ message: "Soal berhasil dihapus" });
}
