// // import { NextRequest, NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";

// // export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
// //   const ujian = await prisma.ujian.findUnique({
// //     where: { id: params.ujianId },
// //     include: { user: { select: { namaSekolah: true } } },
// //   });

// //   if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
// //     return NextResponse.json({ message: "Ujian tidak ditemukan atau tidak aktif" }, { status: 404 });
// //   }

// //   return NextResponse.json({
// //     id: ujian.id, nama: ujian.nama, kelas: ujian.kelas,
// //     durasi: ujian.durasi, status: ujian.status,
// //     namaSekolah: ujian.user.namaSekolah,
// //   });
// // }

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
//   const ujian = await prisma.ujian.findUnique({
//     where: { id: params.ujianId },
//     include: {
//       user: {
//         select: {
//           namaLengkap: true, // nama guru/admin pembuat soal
//           namaSekolah: true,
//         },
//       },
//     },
//   });

//   if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
//     return NextResponse.json(
//       { message: "Ujian tidak ditemukan atau tidak aktif" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     id: ujian.id,
//     nama: ujian.nama,
//     kelas: ujian.kelas,
//     durasi: ujian.durasi,
//     status: ujian.status,
//     namaSekolah: ujian.user.namaSekolah,
//     namaGuru: ujian.user.namaLengkap,
//   });
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  try {
    const ujian = await prisma.ujian.findUnique({
      where: { id: params.ujianId },
      include: {
        user: {
          select: {
            name: true,       // ← field yang benar sesuai schema Prisma
            namaSekolah: true,
          },
        },
      },
    });

    if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
      return NextResponse.json(
        { message: "Ujian tidak ditemukan atau tidak aktif" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: ujian.id,
      nama: ujian.nama,
      kelas: ujian.kelas,
      durasi: ujian.durasi,
      status: ujian.status,
      namaSekolah: ujian.user.namaSekolah ?? "",
      namaGuru: ujian.user.name ?? "",   // ← map name → namaGuru untuk frontend
    });
  } catch (error) {
    console.error("GET siswa/ujian error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}