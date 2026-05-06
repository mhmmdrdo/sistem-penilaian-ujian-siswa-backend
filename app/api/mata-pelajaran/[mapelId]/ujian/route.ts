// // import { NextRequest, NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";
// // import { requireAuth } from "@/lib/middleware";
// // import { generateTokenUjian } from "@/lib/token";

// // export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
// //   const auth = requireAuth(req);
// //   if (auth instanceof NextResponse) return auth;

// //   const { searchParams } = new URL(req.url);
// //   const tipe = searchParams.get("tipe");
// //   const status = searchParams.get("status");

// //   const data = await prisma.ujian.findMany({
// //     where: {
// //       mataPelajaranId: parseInt(params.mapelId),
// //       ...(tipe && { tipe: tipe as any }),
// //       ...(status && { status: status as any }),
// //     },
// //     include: {
// //       _count: { select: { soalUjian: true, sesiSiswa: true } },
// //       sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
// //     },
// //     orderBy: { createdAt: "desc" },
// //   });

// //   return NextResponse.json({
// //     data: data.map((u) => ({
// //       id: u.id, nama: u.nama, tipe: u.tipe, status: u.status,
// //       token: u.token, durasi: u.durasi, kelas: u.kelas,
// //       tanggalMulai: u.tanggalMulai,
// //       totalSoal: u._count.soalUjian,
// //       peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
// //       linkAkses: `${process.env.FRONTEND_URL}/siswa/akses-ujian/${u.id}`,
// //     })),
// //   });
// // }

// // export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
// //   const auth = requireAuth(req);
// //   if (auth instanceof NextResponse) return auth;

// //   const body = await req.json();
// //   const { nama, tipe, durasi, kelas, tanggalMulai, tanggalSelesai, acakSoal, acakOpsi, soalIds } = body;

// //   const mapel = await prisma.mataPelajaran.findUnique({ where: { id: parseInt(params.mapelId) } });
// //   if (!mapel) return NextResponse.json({ message: "Mapel tidak ditemukan" }, { status: 404 });

// //   let token: string;
// //   let attempts = 0;
// //   do {
// //     token = generateTokenUjian(mapel.nama);
// //     const exists = await prisma.ujian.findUnique({ where: { token } });
// //     if (!exists) break;
// //     attempts++;
// //   } while (attempts < 5);

// //   const ujian = await prisma.ujian.create({
// //     data: {
// //       nama, tipe, durasi, kelas, token: token!,
// //       tanggalMulai: tanggalMulai ? new Date(tanggalMulai) : null,
// //       tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
// //       acakSoal: acakSoal ?? false,
// //       acakOpsi: acakOpsi ?? false,
// //       mataPelajaranId: parseInt(params.mapelId),
// //       userId: auth.user.id,
// //       soalUjian: {
// //         create: (soalIds as string[]).map((soalId, idx) => ({
// //           soalId,
// //           urutan: idx + 1,
// //         })),
// //       },
// //     },
// //   });

// //   return NextResponse.json({ message: "Ujian berhasil dibuat", id: ujian.id, token: ujian.token }, { status: 201 });
// // }

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { requireAuth } from "@/lib/middleware";
// import { generateTokenUjian } from "@/lib/token";

// export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
//   const auth = requireAuth(req);
//   if (auth instanceof NextResponse) return auth;

//   const { searchParams } = new URL(req.url);
//   const tipe = searchParams.get("tipe");
//   const status = searchParams.get("status");

//   // ── FIX N+1: include soalUjian → soal langsung di satu query ──
//   const data = await prisma.ujian.findMany({
//     where: {
//       mataPelajaranId: parseInt(params.mapelId),
//       ...(tipe && { tipe: tipe as any }),
//       ...(status && { status: status as any }),
//     },
//     include: {
//       soalUjian: {
//         include: { soal: true },
//         orderBy: { urutan: "asc" },
//       },
//       _count: { select: { sesiSiswa: true } },
//       sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   const baseUrl = process.env.FRONTEND_URL;

//   return NextResponse.json({
//     data: data.map((u) => ({
//       id: u.id,
//       nama: u.nama,
//       tipe: u.tipe,
//       status: u.status,
//       token: u.token,
//       durasi: u.durasi,
//       kelas: u.kelas,
//       tanggalMulai: u.tanggalMulai,
//       acakSoal: u.acakSoal,
//       totalSoal: u.soalUjian.length,
//       peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
//       // ── DUA link berbeda ──
//       linkSiswa: `${baseUrl}/siswa/akses-ujian/${u.id}`,
//       linkPreview: `${baseUrl}/siswa/ujian/preview/${u.id}`,
//       // soal sudah di-include, tidak perlu fetch lagi di frontend
//       soalList: u.soalUjian.map((us) => ({
//         id: us.soal.id,
//         pertanyaan: us.soal.pertanyaan,
//         tipe: us.soal.tipe === "PILIHAN_GANDA" ? "pg" : "essay",
//         opsi: [us.soal.opsiA, us.soal.opsiB, us.soal.opsiC, us.soal.opsiD].filter(
//           (o): o is string => o !== null && o !== undefined && o !== ""
//         ),
//         jawaban: us.soal.jawabanBenar || "",
//         topik: us.soal.topik || "",
//         gambar: us.soal.gambarUrl || undefined,
//       })),
//     })),
//   });
// }

// export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
//   const auth = requireAuth(req);
//   if (auth instanceof NextResponse) return auth;

//   const body = await req.json();
//   const { nama, tipe, durasi, kelas, tanggalMulai, tanggalSelesai, acakSoal, acakOpsi, soalIds } = body;

//   const mapel = await prisma.mataPelajaran.findUnique({ where: { id: parseInt(params.mapelId) } });
//   if (!mapel) return NextResponse.json({ message: "Mapel tidak ditemukan" }, { status: 404 });

//   let token: string;
//   let attempts = 0;
//   do {
//     token = generateTokenUjian(mapel.nama);
//     const exists = await prisma.ujian.findUnique({ where: { token } });
//     if (!exists) break;
//     attempts++;
//   } while (attempts < 5);

//   const ujian = await prisma.ujian.create({
//     data: {
//       nama, tipe, durasi, kelas, token: token!,
//       tanggalMulai: tanggalMulai ? new Date(tanggalMulai) : null,
//       tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
//       acakSoal: acakSoal ?? false,
//       acakOpsi: acakOpsi ?? false,
//       mataPelajaranId: parseInt(params.mapelId),
//       userId: auth.user.id,
//       soalUjian: {
//         create: (soalIds as string[]).map((soalId, idx) => ({
//           soalId,
//           urutan: idx + 1,
//         })),
//       },
//     },
//   });

//   return NextResponse.json(
//     { message: "Ujian berhasil dibuat", id: ujian.id, token: ujian.token },
//     { status: 201 }
//   );
// }
// Letakkan file ini di:
// backend/app/api/mata-pelajaran/[mapelId]/ujian/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { generateTokenUjian } from "@/lib/token";

export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const tipe = searchParams.get("tipe");
  const status = searchParams.get("status");

  const data = await prisma.ujian.findMany({
    where: {
      mataPelajaranId: parseInt(params.mapelId),
      ...(tipe && { tipe: tipe as any }),
      ...(status && { status: status as any }),
    },
    include: {
      soalUjian: {
        include: { soal: true },
        orderBy: { urutan: "asc" },
      },
      _count: { select: { sesiSiswa: true } },
      sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.FRONTEND_URL;

  return NextResponse.json({
    data: data.map((u) => ({
      id: u.id,
      nama: u.nama,
      tipe: u.tipe,
      status: u.status,
      token: u.token,
      durasi: u.durasi,
      kelas: u.kelas,
      tanggalMulai: u.tanggalMulai,
      acakSoal: u.acakSoal,
      totalSoal: u.soalUjian.length,
      peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
      linkSiswa: `${baseUrl}/siswa/akses-ujian/${u.id}`,
      linkPreview: `${baseUrl}/siswa/ujian/preview/${u.id}`,
      soalList: u.soalUjian.map((us) => ({
        id: us.soal.id,
        pertanyaan: us.soal.pertanyaan,
        tipe: us.soal.tipe === "PILIHAN_GANDA" ? "pg" : "essay",
        opsi: [
          us.soal.opsiA,
          us.soal.opsiB,
          us.soal.opsiC,
          us.soal.opsiD,
          us.soal.opsiE,  // ← tambah opsiE
        ].filter((o): o is string => o !== null && o !== undefined && o !== ""),
        jawaban: us.soal.jawabanBenar || "",
        topik: us.soal.topik || "",
        gambar: us.soal.gambarUrl || undefined,
      })),
    })),
  });
}

export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const {
    nama,
    tipe,
    durasi,
    kelas,
    tanggalMulai,
    tanggalSelesai,
    acakSoal,
    acakOpsi,
    soalIds,
  } = body;

  const mapel = await prisma.mataPelajaran.findUnique({
    where: { id: parseInt(params.mapelId) },
  });
  if (!mapel) {
    return NextResponse.json({ message: "Mapel tidak ditemukan" }, { status: 404 });
  }

  // Generate token unik
  let token: string = "";
  let attempts = 0;
  do {
    token = generateTokenUjian(mapel.nama);
    const exists = await prisma.ujian.findUnique({ where: { token } });
    if (!exists) break;
    attempts++;
  } while (attempts < 5);

  const ujian = await prisma.ujian.create({
    data: {
      nama,
      tipe,
      // ── FIX: Set status AKTIF secara eksplisit ──
      status: "AKTIF",
      durasi,
      kelas,
      token,
      tanggalMulai: tanggalMulai ? new Date(tanggalMulai) : null,
      tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
      acakSoal: acakSoal ?? false,
      acakOpsi: acakOpsi ?? false,
      mataPelajaranId: parseInt(params.mapelId),
      userId: auth.user.id,
      soalUjian: {
        create: ((soalIds as string[]) || []).map((soalId, idx) => ({
          soalId,
          urutan: idx + 1,
        })),
      },
    },
  });

  return NextResponse.json(
    { message: "Ujian berhasil dibuat", id: ujian.id, token: ujian.token },
    { status: 201 }
  );
}