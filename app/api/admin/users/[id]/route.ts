import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });

  return NextResponse.json({
    id: user.id, nama: user.name, email: user.email,
    role: user.role.toLowerCase(), bidang: user.namaSekolah,
    nip: user.nip, status: user.isActive ? "aktif" : "nonaktif",
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { nama, email, password, role, bidang, nip, status } = body;

  const updateData: Record<string, unknown> = {};
  if (nama) updateData.name = nama;
  if (email) updateData.email = email;
  if (password) updateData.password = await bcrypt.hash(password, 12);
  if (role) updateData.role = role.toUpperCase();
  if (bidang !== undefined) updateData.namaSekolah = bidang;
  if (nip !== undefined) updateData.nip = nip;
  if (status) updateData.isActive = status === "aktif";

  await prisma.user.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ message: "User berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User berhasil dihapus" });
}
