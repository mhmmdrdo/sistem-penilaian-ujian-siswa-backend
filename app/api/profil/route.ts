import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: {
      id: true, name: true, email: true, role: true, nip: true,
      namaSekolah: true, isActive: true, avatarUrl: true,
      lastLoginAt: true, createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { name, avatarUrl, oldPassword, newPassword } = await req.json();
  const updateData: Record<string, unknown> = {};

  if (name) updateData.name = name;
  if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

  if (oldPassword && newPassword) {
    const user = await prisma.user.findUnique({ where: { id: auth.user.id } });
    const match = await bcrypt.compare(oldPassword, user!.password);
    if (!match) {
      return NextResponse.json({ message: "Password lama tidak sesuai" }, { status: 400 });
    }
    updateData.password = await bcrypt.hash(newPassword, 12);
  }

  await prisma.user.update({ where: { id: auth.user.id }, data: updateData });
  return NextResponse.json({ message: "Profil berhasil diperbarui" });
}
