import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const [totalSoal, totalGuru, ujianAktif, ujianBerlangsung, recentUsers] = await Promise.all([
    prisma.soal.count(),
    prisma.user.count({ where: { role: "GURU" } }),
    prisma.ujian.count({ where: { status: "AKTIF" } }),
    prisma.ujian.findMany({
      where: { status: "BERLANGSUNG" },
      include: {
        user: { select: { name: true, namaSekolah: true } },
        sesiSiswa: { where: { status: "BERLANGSUNG" } },
        _count: { select: { sesiSiswa: true } },
      },
      take: 5,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true, name: true, email: true, role: true,
        nip: true, namaSekolah: true, isActive: true, createdAt: true,
      },
    }),
  ]);

  const nilaiResult = await prisma.sesiSiswa.aggregate({
    where: { status: "SELESAI" },
    _avg: { nilaiAkhir: true },
  });

  return NextResponse.json({
    totalSoal,
    ujianAktif,
    totalGuru,
    rataRataNilai: Math.round((nilaiResult._avg.nilaiAkhir ?? 0) * 10) / 10,
    ujianBerlangsung: ujianBerlangsung.map((u) => ({
      id: u.id,
      nama: u.nama,
      namaSekolah: u.user.namaSekolah,
      namaGuru: u.user.name,
      kelas: u.kelas,
      peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
      status: u.status,
    })),
    recentUsers,
  });
}
