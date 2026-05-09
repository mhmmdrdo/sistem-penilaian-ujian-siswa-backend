import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const sesi = await prisma.sesiSiswa.findUnique({
    where: { id: params.sesiId },
    include: { ujian: { include: { soalUjian: { include: { soal: true }, orderBy: { urutan: "asc" } } } } },
  });

  if (!sesi) return NextResponse.json({ message: "Sesi tidak ditemukan" }, { status: 404 });

  const durasi = sesi.ujian.durasi * 60 * 1000;
  const elapsed = Date.now() - sesi.mulaiAt.getTime();
  const sisaWaktu = Math.max(0, Math.floor((durasi - elapsed) / 1000));

  if (sisaWaktu <= 0 && sesi.status === "BERLANGSUNG") {
    await prisma.sesiSiswa.update({
      where: { id: sesi.id },
      data: { status: "TIMEOUT", selesaiAt: new Date() },
    });
    return NextResponse.json({ message: "Waktu ujian habis", timeout: true }, { status: 403 });
  }

  let soalList = sesi.ujian.soalUjian;

  if (sesi.ujian.acakSoal) {
    soalList = [...soalList].sort(() => Math.random() - 0.5);
  }

  // return NextResponse.json({
  //   soal: soalList.map((us, idx) => ({
  //     id: us.soal.id,
  //     nomorUrut: idx + 1,
  //     pertanyaan: us.soal.pertanyaan,
  //     tipe: us.soal.tipe,
  //     topik: us.soal.topik,
  //     gambarUrl: us.soal.gambarUrl,
  //     opsiA: us.soal.opsiA,
  //     opsiB: us.soal.opsiB,
  //     opsiC: us.soal.opsiC,
  //     opsiD: us.soal.opsiD,
  //     opsiE: us.soal.opsiE,

  //   })),
  //   sisaWaktu,
  // });
  return NextResponse.json({
    soal: soalList.map((us, idx) => {
      // ✅ Hanya kirim gambarUrl jika berupa URL Cloudinary (https://)
      const gambarUrl = us.soal.gambarUrl?.startsWith("https://")
        ? us.soal.gambarUrl
        : null;

      return {
        id: us.soal.id,
        nomorUrut: idx + 1,
        pertanyaan: us.soal.pertanyaan,
        tipe: us.soal.tipe,
        topik: us.soal.topik,
        gambarUrl,
        opsiA: us.soal.opsiA,
        opsiB: us.soal.opsiB,
        opsiC: us.soal.opsiC,
        opsiD: us.soal.opsiD,
        opsiE: us.soal.opsiE,
      };
    }),
    sisaWaktu,
  });
}
