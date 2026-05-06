import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { nisn, namaLengkap, kelas, token } = await req.json();

  const ujian = await prisma.ujian.findUnique({ where: { token } });
  if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
    return NextResponse.json({ message: "Token tidak valid atau ujian tidak aktif" }, { status: 400 });
  }

  const sesiSelesai = await prisma.sesiSiswa.findFirst({
    where: { ujianId: ujian.id, nisn, status: { in: ["SELESAI", "TIMEOUT", "DIHENTIKAN"] } },
  });
  if (sesiSelesai) {
    return NextResponse.json({ message: "Anda sudah mengerjakan ujian ini" }, { status: 400 });
  }

  let sesi = await prisma.sesiSiswa.findFirst({
    where: { ujianId: ujian.id, nisn, status: "BERLANGSUNG" },
  });

  if (!sesi) {
    sesi = await prisma.sesiSiswa.create({
      data: {
        nisn, namaLengkap, kelas,
        ujianId: ujian.id,
        ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });
  }

  return NextResponse.json({
    sesiId: sesi.id, ujianId: ujian.id, namaUjian: ujian.nama,
    durasi: ujian.durasi,
    mulaiAt: sesi.mulaiAt,
  });
}
