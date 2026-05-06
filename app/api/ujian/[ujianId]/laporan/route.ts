import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "nama";
  const dir = (searchParams.get("dir") || "asc") as "asc" | "desc";

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: { _count: { select: { soalUjian: true } } },
  });
  if (!ujian) return NextResponse.json({ message: "Ujian tidak ditemukan" }, { status: 404 });

  const sesiWhere: Record<string, unknown> = {
    ujianId: params.ujianId,
    status: { in: ["SELESAI", "TIMEOUT", "DIHENTIKAN"] },
  };

  const kkm = 70;
  if (filter === "lulus") sesiWhere.nilaiAkhir = { gte: kkm };
  if (filter === "gagal") sesiWhere.nilaiAkhir = { lt: kkm };
  if (filter === "viol") sesiWhere.jumlahPelanggaran = { gt: 0 };

  const sortMap: Record<string, string> = {
    nilai: "nilaiAkhir", nama: "namaLengkap",
    benar: "nilaiBenar", salah: "nilaiSalah",
    pelanggaran: "jumlahPelanggaran",
  };

  const sesiList = await prisma.sesiSiswa.findMany({
    where: sesiWhere,
    include: { pelanggaran: { select: { jenis: true } } },
    orderBy: { [sortMap[sort] || "namaLengkap"]: dir },
  });

  const nilaiList = sesiList.map((s) => s.nilaiAkhir);
  const lulus = sesiList.filter((s) => s.nilaiAkhir >= kkm).length;

  return NextResponse.json({
    ujian: {
      id: ujian.id, nama: ujian.nama, durasi: `${ujian.durasi} menit`,
      totalSoal: ujian._count.soalUjian, kelas: ujian.kelas,
    },
    summary: {
      rataRata: nilaiList.length ? Math.round(nilaiList.reduce((a, b) => a + b, 0) / nilaiList.length * 10) / 10 : 0,
      tertinggi: nilaiList.length ? Math.max(...nilaiList) : 0,
      terendah: nilaiList.length ? Math.min(...nilaiList) : 0,
      lulus, gagal: sesiList.length - lulus, totalSiswa: sesiList.length,
    },
    siswa: sesiList.map((s) => ({
      nisn: s.nisn, nama: s.namaLengkap, kelas: s.kelas,
      benar: s.nilaiBenar, salah: s.nilaiSalah,
      nilai: Math.round(s.nilaiAkhir), lulus: s.nilaiAkhir >= kkm,
      pelanggaran: s.jumlahPelanggaran,
      catatan: [...new Set(s.pelanggaran.map((p) => p.jenis))],
    })),
  });
}
