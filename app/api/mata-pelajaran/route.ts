import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const kelas = searchParams.get("kelas");

  const where = {
    ...(auth.user.role === "GURU" && { userId: auth.user.id }),
    ...(kelas && { kelas }),
  };

  const mapel = await prisma.mataPelajaran.findMany({
    where,
    include: {
      _count: { select: { soal: true, ujian: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const [totalSoal, totalUjian] = await Promise.all([
    prisma.soal.count({ where: { mataPelajaran: where } }),
    prisma.ujian.count({ where: { mataPelajaran: where } }),
  ]);

  return NextResponse.json({
    data: mapel.map((m) => ({
      id: m.id, nama: m.nama, kelas: m.kelas,
      deskripsi: m.deskripsi, warna: m.warna,
      totalSoal: m._count.soal, totalUjian: m._count.ujian,
    })),
    stats: { totalSoal, totalUjian },
  });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { nama, kelas, deskripsi, warna } = await req.json();

  const mapel = await prisma.mataPelajaran.create({
    data: { nama, kelas, deskripsi, warna: warna || "zinc", userId: auth.user.id },
  });

  return NextResponse.json({ message: "Mata pelajaran berhasil ditambahkan", id: mapel.id }, { status: 201 });
}
