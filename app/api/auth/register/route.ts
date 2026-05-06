import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  nip: z.string().optional(),
  bidang: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Data tidak valid" }, { status: 400 });
  }

  const { name, email, password, nip, bidang } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Email sudah digunakan" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "GURU",
      nip,
      namaSekolah: bidang,
    },
  });

  return NextResponse.json({ message: "Registrasi berhasil" }, { status: 201 });
}