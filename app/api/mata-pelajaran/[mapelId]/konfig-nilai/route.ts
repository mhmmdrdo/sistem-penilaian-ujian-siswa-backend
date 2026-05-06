import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const konfig = await prisma.konfigNilai.findUnique({
    where: { mataPelajaranId: parseInt(params.mapelId) },
  });

  if (!konfig) {
    return NextResponse.json({
      id: null, bobotUjian: 40, bobotUlangan: 25,
      bobotLatihan: 20, bobotKuis: 15, kkm: 70, subBobotUjian: [],
    });
  }

  return NextResponse.json({ ...konfig, subBobotUjian: konfig.subBobotUjian ?? [] });
}

export async function PUT(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { bobotUjian, bobotUlangan, bobotLatihan, bobotKuis, kkm, subBobotUjian } = body;

  const total = bobotUjian + bobotUlangan + bobotLatihan + bobotKuis;
  if (total !== 100) {
    return NextResponse.json({ message: "Total bobot harus 100%" }, { status: 400 });
  }

  const konfig = await prisma.konfigNilai.upsert({
    where: { mataPelajaranId: parseInt(params.mapelId) },
    update: { bobotUjian, bobotUlangan, bobotLatihan, bobotKuis, kkm, subBobotUjian },
    create: {
      bobotUjian, bobotUlangan, bobotLatihan, bobotKuis, kkm,
      subBobotUjian,
      mataPelajaranId: parseInt(params.mapelId),
      userId: auth.user.id,
    },
  });

  return NextResponse.json({ message: "Konfigurasi berhasil disimpan", id: konfig.id });
}
