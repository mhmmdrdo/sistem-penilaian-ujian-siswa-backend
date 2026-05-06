import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function PATCH(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { status } = await req.json();
  await prisma.ujian.update({
    where: { id: params.ujianId },
    data: { status },
  });

  return NextResponse.json({ message: "Status ujian berhasil diubah" });
}
