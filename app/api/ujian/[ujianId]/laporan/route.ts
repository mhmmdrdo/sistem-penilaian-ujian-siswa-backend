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

  const [soalUjian, sesiUntukAnalisis] = await Promise.all([
    prisma.ujianSoal.findMany({
      where: { ujianId: params.ujianId },
      select: { soalId: true, urutan: true },
      orderBy: { urutan: "asc" },
    }),
    prisma.sesiSiswa.findMany({
      where: {
        ujianId: params.ujianId,
        status: { in: ["SELESAI", "TIMEOUT", "DIHENTIKAN"] },
      },
      select: {
        jawaban: { select: { soalId: true, isBenar: true } },
      },
    }),
  ]);

  const totalPesertaAnalisis = sesiUntukAnalisis.length;
  const totalBenarPeserta = sesiUntukAnalisis.map((sesi) =>
    sesi.jawaban.filter((jawaban) => jawaban.isBenar).length
  );
  const analisisSoal = soalUjian.map((soal) => {
    const jawabanBenar = sesiUntukAnalisis.map((sesi) =>
      sesi.jawaban.some((jawaban) => jawaban.soalId === soal.soalId && jawaban.isBenar)
    );
    const jumlahBenar = jawabanBenar.filter(Boolean).length;
    const jumlahSalah = totalPesertaAnalisis - jumlahBenar;
    const kesukaran = totalPesertaAnalisis ? jumlahBenar / totalPesertaAnalisis : 0;
    const kategori = kesukaran <= 0.3 ? "Sukar" : kesukaran <= 0.7 ? "Sedang" : "Mudah";

    // Korelasi point-biserial menggunakan total skor tanpa soal yang sedang dianalisis.
    const totalTanpaSoal = totalBenarPeserta.map((total, index) => total - (jawabanBenar[index] ? 1 : 0));
    const rataRataTotalTanpaSoal = totalTanpaSoal.length
      ? totalTanpaSoal.reduce((total, benar) => total + benar, 0) / totalTanpaSoal.length
      : 0;
    const simpanganBakuTotalTanpaSoal = totalTanpaSoal.length
      ? Math.sqrt(totalTanpaSoal.reduce((total, benar) => total + (benar - rataRataTotalTanpaSoal) ** 2, 0) / totalTanpaSoal.length)
      : 0;
    const rataRataBenar = jumlahBenar
      ? totalTanpaSoal
        .filter((_, index) => jawabanBenar[index])
        .reduce((total, benar) => total + benar, 0) / jumlahBenar
      : 0;
    const rataRataSalah = jumlahSalah
      ? totalTanpaSoal
        .filter((_, index) => !jawabanBenar[index])
        .reduce((total, benar) => total + benar, 0) / jumlahSalah
      : 0;
    const reliabilitas = jumlahBenar && jumlahSalah && simpanganBakuTotalTanpaSoal
      ? ((rataRataBenar - rataRataSalah) / simpanganBakuTotalTanpaSoal) * Math.sqrt(kesukaran * (1 - kesukaran))
      : null;

    return {
      nomorSoal: soal.urutan,
      jumlahBenar,
      jumlahSalah,
      kesukaran: Math.round(kesukaran * 1000) / 1000,
      kategori,
      reliabilitas: reliabilitas === null ? null : Math.round(reliabilitas * 1000) / 1000,
    };
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
    analisisSoal: {
      totalPeserta: totalPesertaAnalisis,
      data: analisisSoal,
    },
  });
}
