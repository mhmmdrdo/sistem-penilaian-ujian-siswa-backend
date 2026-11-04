import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { encryptSecret } from "@/lib/secret";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: {
      id: true, name: true, email: true, role: true, nip: true,
       namaSekolah: true, isActive: true, avatarUrl: true,
       openrouterApiKeyLast4: true,
       lastLoginAt: true, createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { name, avatarUrl, oldPassword, newPassword, openrouterApiKey, removeOpenrouterApiKey } = await req.json();
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

  if (removeOpenrouterApiKey === true) {
    updateData.openrouterApiKeyEncrypted = null;
    updateData.openrouterApiKeyLast4 = null;
  } else if (openrouterApiKey !== undefined) {
    if (typeof openrouterApiKey !== "string" || openrouterApiKey.trim().length < 12) {
      return NextResponse.json({ message: "API key OpenRouter tidak valid" }, { status: 400 });
    }

    const apiKey = openrouterApiKey.trim();
    updateData.openrouterApiKeyEncrypted = encryptSecret(apiKey);
    updateData.openrouterApiKeyLast4 = apiKey.slice(-4);
  }

  await prisma.user.update({ where: { id: auth.user.id }, data: updateData });
  return NextResponse.json({ message: "Profil berhasil diperbarui" });
}
