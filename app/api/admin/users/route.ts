import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { z } from "zod";

const createSchema = z.object({
  nama: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "guru"]),
  bidang: z.string().optional(),
  nip: z.string().optional(),
  hp: z.string().optional(),
  status: z.enum(["aktif", "nonaktif"]).default("aktif"),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  const roleFilter =
    role === "admin" ? "ADMIN" : role === "guru" ? "GURU" : undefined;

  const where = {
    ...(roleFilter && { role: roleFilter as "ADMIN" | "GURU" }),
    ...(search && {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
      ],
    }),
  };

  const [data, total, adminCount, guruCount] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "GURU" } }),
  ]);

  return NextResponse.json({
    data: data.map((u) => ({
      id: u.id,
      nama: u.name,
      email: u.email,
      role: u.role.toLowerCase(),
      bidang: u.namaSekolah,
      nip: u.nip,
      status: u.isActive ? "aktif" : "nonaktif",
    })),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    stats: { total: total, admin: adminCount, guru: guruCount, siswa: 0 },
  });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Data tidak valid", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { nama, email, password, role, bidang, nip, status } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Email sudah digunakan" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: nama,
      email,
      password: hashed,
      role: role.toUpperCase() as "ADMIN" | "GURU",
      namaSekolah: bidang,
      nip,
      isActive: status === "aktif",
    },
  });

  return NextResponse.json({ message: "User berhasil ditambahkan", id: user.id }, { status: 201 });
}
