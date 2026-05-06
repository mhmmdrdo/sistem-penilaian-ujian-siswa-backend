import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// supabase
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
})
async function main() {
  console.log("🌱 Seeding database...");

  // ─── USERS ───────────────────────────────────────────
  const password = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@gmail.com" },
      update: {},
      create: {
        name: "Muhammad Ridho Ganteng",
        email: "admin@gmail.com",
        password,
        role: "ADMIN",
        namaSekolah: "Dinas Pendidikan",
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "budi.santosa@smansatu.sch.id" },
      update: {},
      create: {
        name: "Budi Santosa",
        email: "budi.santosa@smansatu.sch.id",
        password,
        role: "GURU",
        nip: "198703152010012005",
        namaSekolah: "SMA Negeri 1 Jakarta",
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "sari.indrawati@smandua.sch.id" },
      update: {},
      create: {
        name: "Sari Indrawati",
        email: "sari.indrawati@smandua.sch.id",
        password,
        role: "GURU",
        nip: "199001202015011003",
        namaSekolah: "SMA Negeri 2 Bandung",
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "andi.prasetyo@smantiga.sch.id" },
      update: {},
      create: {
        name: "Andi Prasetyo",
        email: "andi.prasetyo@smantiga.sch.id",
        password,
        role: "GURU",
        nip: "198812052012012009",
        namaSekolah: "SMA Negeri 3 Surabaya",
        isActive: true,
      },
    }),
  ]);

  const [admin, budi, sari, andi] = users;
  console.log(`✅ ${users.length} users created`);

  // ─── MATA PELAJARAN ───────────────────────────────────
  const mataPelajaran = await Promise.all([
    prisma.mataPelajaran.create({
      data: { nama: "Matematika Peminatan", kelas: "XII IPA 1", deskripsi: "Materi kalkulus, fungsi, dan limit", warna: "zinc", userId: budi.id },
    }),
    prisma.mataPelajaran.create({
      data: { nama: "Matematika Wajib", kelas: "XI IPA 2", deskripsi: "Trigonometri dan fungsi komposisi", warna: "blue", userId: budi.id },
    }),
    prisma.mataPelajaran.create({
      data: { nama: "Kimia", kelas: "XII IPS 1", deskripsi: "Kimia organik dan reaksi dasar", warna: "emerald", userId: sari.id },
    }),
    prisma.mataPelajaran.create({
      data: { nama: "Fisika", kelas: "XI IPA 1", deskripsi: "Dinamika dan kinematika", warna: "violet", userId: andi.id },
    }),
    prisma.mataPelajaran.create({
      data: { nama: "Biologi", kelas: "X IPA 1", deskripsi: "Sel dan jaringan tumbuhan", warna: "amber", userId: sari.id },
    }),
  ]);

  const [matmat, matwajib, kimia, fisika, bio] = mataPelajaran;
  console.log(`✅ ${mataPelajaran.length} mata pelajaran created`);

  // ─── SOAL ─────────────────────────────────────────────
  const soalMatmat = await Promise.all([
    prisma.soal.create({
      data: {
        pertanyaan: "Tentukan nilai lim x→2 (x²+3x−5)",
        tipe: "PILIHAN_GANDA", topik: "Limit Fungsi",
        opsiA: "5", opsiB: "7", opsiC: "9", opsiD: "11",opsiE: "121",
        jawabanBenar: "A",
        pembahasan: "Substitusi langsung x=2: 4+6-5=5",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Diketahui fungsi f(x) = 2x² + 3x − 5. Tentukan nilai f(3).",
        tipe: "PILIHAN_GANDA", topik: "Fungsi Kuadrat",
        opsiA: "22", opsiB: "18", opsiC: "16", opsiD: "28",opsiE: "281",
        jawabanBenar: "A",
        pembahasan: "f(3) = 2(9) + 9 − 5 = 22",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Hitung integral ∫(3x²+2x) dx",
        tipe: "PILIHAN_GANDA", topik: "Integral",
        opsiA: "x³+x²+C", opsiB: "3x³+2x²+C", opsiC: "x³+x²", opsiD: "6x+2+C",opsiE: "6x+2+C+x",
        jawabanBenar: "A",
        pembahasan: "Integral dari 3x² adalah x³, dari 2x adalah x², tambah konstanta C",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
  ]);

  console.log(`✅ ${soalMatmat.length} soal created`);

  // ─── UJIAN ────────────────────────────────────────────
  const ujian = await prisma.ujian.create({
    data: {
      nama: "Ujian Tengah Semester Matematika",
      tipe: "UJIAN",
      token: "MAT-7X2K-9PQR",
      durasi: 60,
      kelas: "XII IPA 1",
      tanggalMulai: new Date(),
      tanggalSelesai: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      acakSoal: false,
      acakOpsi: false,
      mataPelajaranId: matmat.id,
      userId: budi.id,
      soalUjian: {
        create: soalMatmat.map((s, idx) => ({
          soalId: s.id,
          urutan: idx + 1,
        })),
      },
    },
  });

  console.log(`✅ Ujian created: ${ujian.nama}`);

  // ─── SESI SISWA (CONTOH) ─────────────────────────────
  const siswaSample = [
    { nisn: "1234567890", namaLengkap: "Andi Pratama", kelas: "XII IPA 1" },
    { nisn: "0987654321", namaLengkap: "Budi Santoso", kelas: "XII IPA 1" },
    { nisn: "1122334455", namaLengkap: "Citra Dewi", kelas: "XII IPA 1" },
  ];

  for (const siswa of siswaSample) {
    const sesi = await prisma.sesiSiswa.create({
      data: {
        nisn: siswa.nisn,
        namaLengkap: siswa.namaLengkap,
        kelas: siswa.kelas,
        ujianId: ujian.id,
        status: "SELESAI",
        nilaiBenar: 2,
        nilaiSalah: 1,
        nilaiAkhir: 66.67,
        selesaiAt: new Date(),
      },
    });

    // Contoh jawaban siswa
    for (const soal of soalMatmat) {
      await prisma.jawabanSiswa.create({
        data: {
          sesiId: sesi.id,
          soalId: soal.id,
          jawabanDipilih: soal.jawabanBenar,
          isBenar: true,
          waktuDijawab: new Date(),
        },
      });
    }
  }

  console.log(`✅ ${siswaSample.length} sesi siswa created`);

  // ─── KONFIGURASI NILAI ───────────────────────────────
  await prisma.konfigNilai.create({
    data: {
      bobotUjian: 40,
      bobotUlangan: 25,
      bobotLatihan: 20,
      bobotKuis: 15,
      kkm: 70,
      mataPelajaranId: matmat.id,
      userId: budi.id,
    },
  });

  console.log("✅ Konfigurasi nilai created");
  console.log("✅ Seed selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
