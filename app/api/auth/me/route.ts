import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: {
      id: true, name: true, email: true, role: true,
      nip: true, namaSekolah: true, isActive: true,
      avatarUrl: true, lastLoginAt: true, createdAt: true,
    },
  });

  if (!user) return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
  return NextResponse.json(user);
}
