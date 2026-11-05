-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GURU');

-- CreateEnum
CREATE TYPE "TipeSoal" AS ENUM ('PILIHAN_GANDA', 'ESSAY');

-- CreateEnum
CREATE TYPE "TipeUjian" AS ENUM ('UJIAN', 'ULANGAN', 'LATIHAN', 'KUIS');

-- CreateEnum
CREATE TYPE "StatusUjian" AS ENUM ('DRAFT', 'AKTIF', 'BERLANGSUNG', 'SELESAI');

-- CreateEnum
CREATE TYPE "StatusSesi" AS ENUM ('BERLANGSUNG', 'SELESAI', 'TIMEOUT', 'DIHENTIKAN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GURU',
    "nip" TEXT,
    "namaSekolah" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "avatarUrl" TEXT,
    "openrouterApiKeyEncrypted" TEXT,
    "openrouterApiKeyLast4" VARCHAR(4),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mata_pelajaran" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "deskripsi" TEXT,
    "warna" TEXT NOT NULL DEFAULT 'zinc',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "mata_pelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soal" (
    "id" TEXT NOT NULL,
    "pertanyaan" TEXT NOT NULL,
    "tipe" "TipeSoal" NOT NULL DEFAULT 'PILIHAN_GANDA',
    "topik" TEXT,
    "gambarUrl" TEXT,
    "opsiA" TEXT,
    "opsiB" TEXT,
    "opsiC" TEXT,
    "opsiD" TEXT,
    "opsiE" TEXT,
    "jawabanBenar" TEXT,
    "pembahasan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mataPelajaranId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ujian" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tipe" "TipeUjian" NOT NULL DEFAULT 'UJIAN',
    "status" "StatusUjian" NOT NULL DEFAULT 'AKTIF',
    "token" TEXT NOT NULL,
    "durasi" INTEGER NOT NULL,
    "kelas" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3),
    "tanggalSelesai" TIMESTAMP(3),
    "acakSoal" BOOLEAN NOT NULL DEFAULT false,
    "acakOpsi" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mataPelajaranId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ujian_soal" (
    "id" SERIAL NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "ujianId" TEXT NOT NULL,
    "soalId" TEXT NOT NULL,

    CONSTRAINT "ujian_soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesi_siswa" (
    "id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "status" "StatusSesi" NOT NULL DEFAULT 'BERLANGSUNG',
    "nilaiBenar" INTEGER NOT NULL DEFAULT 0,
    "nilaiSalah" INTEGER NOT NULL DEFAULT 0,
    "nilaiAkhir" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jumlahPelanggaran" INTEGER NOT NULL DEFAULT 0,
    "mulaiAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selesaiAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "ujianId" TEXT NOT NULL,

    CONSTRAINT "sesi_siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jawaban_siswa" (
    "id" SERIAL NOT NULL,
    "jawabanDipilih" TEXT,
    "isBenar" BOOLEAN NOT NULL DEFAULT false,
    "isRagu" BOOLEAN NOT NULL DEFAULT false,
    "waktuDijawab" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "soalId" TEXT NOT NULL,
    "sesiId" TEXT NOT NULL,

    CONSTRAINT "jawaban_siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pelanggaran_siswa" (
    "id" SERIAL NOT NULL,
    "jenis" TEXT NOT NULL,
    "catatan" TEXT,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sesiId" TEXT NOT NULL,

    CONSTRAINT "pelanggaran_siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "konfig_nilai" (
    "id" SERIAL NOT NULL,
    "bobotUjian" INTEGER NOT NULL DEFAULT 40,
    "bobotUlangan" INTEGER NOT NULL DEFAULT 25,
    "bobotLatihan" INTEGER NOT NULL DEFAULT 20,
    "bobotKuis" INTEGER NOT NULL DEFAULT 15,
    "kkm" INTEGER NOT NULL DEFAULT 70,
    "subBobotUjian" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mataPelajaranId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "konfig_nilai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ujian_token_key" ON "ujian"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ujian_soal_ujianId_soalId_key" ON "ujian_soal"("ujianId", "soalId");

-- CreateIndex
CREATE UNIQUE INDEX "jawaban_siswa_sesiId_soalId_key" ON "jawaban_siswa"("sesiId", "soalId");

-- CreateIndex
CREATE UNIQUE INDEX "konfig_nilai_mataPelajaranId_key" ON "konfig_nilai"("mataPelajaranId");

-- AddForeignKey
ALTER TABLE "mata_pelajaran" ADD CONSTRAINT "mata_pelajaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soal" ADD CONSTRAINT "soal_mataPelajaranId_fkey" FOREIGN KEY ("mataPelajaranId") REFERENCES "mata_pelajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soal" ADD CONSTRAINT "soal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ujian" ADD CONSTRAINT "ujian_mataPelajaranId_fkey" FOREIGN KEY ("mataPelajaranId") REFERENCES "mata_pelajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ujian" ADD CONSTRAINT "ujian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ujian_soal" ADD CONSTRAINT "ujian_soal_ujianId_fkey" FOREIGN KEY ("ujianId") REFERENCES "ujian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ujian_soal" ADD CONSTRAINT "ujian_soal_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesi_siswa" ADD CONSTRAINT "sesi_siswa_ujianId_fkey" FOREIGN KEY ("ujianId") REFERENCES "ujian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jawaban_siswa" ADD CONSTRAINT "jawaban_siswa_sesiId_fkey" FOREIGN KEY ("sesiId") REFERENCES "sesi_siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pelanggaran_siswa" ADD CONSTRAINT "pelanggaran_siswa_sesiId_fkey" FOREIGN KEY ("sesiId") REFERENCES "sesi_siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konfig_nilai" ADD CONSTRAINT "konfig_nilai_mataPelajaranId_fkey" FOREIGN KEY ("mataPelajaranId") REFERENCES "mata_pelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konfig_nilai" ADD CONSTRAINT "konfig_nilai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
