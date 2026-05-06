/*
  Warnings:

  - You are about to drop the `cardset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailytest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailytestquestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailytestsession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examquestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examsession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `examweight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `finalgrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gradeconfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kisikisi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kisikisiitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practicequestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practicesession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `practiceset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questioncard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionoption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizquestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizsession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentanswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachersubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `violation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cardset` DROP FOREIGN KEY `CardSet_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `dailytest` DROP FOREIGN KEY `DailyTest_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `dailytest` DROP FOREIGN KEY `DailyTest_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `dailytestquestion` DROP FOREIGN KEY `DailyTestQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `dailytestquestion` DROP FOREIGN KEY `DailyTestQuestion_testId_fkey`;

-- DropForeignKey
ALTER TABLE `dailytestsession` DROP FOREIGN KEY `DailyTestSession_testId_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `examquestion` DROP FOREIGN KEY `ExamQuestion_examId_fkey`;

-- DropForeignKey
ALTER TABLE `examquestion` DROP FOREIGN KEY `ExamQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `examsession` DROP FOREIGN KEY `ExamSession_examId_fkey`;

-- DropForeignKey
ALTER TABLE `examweight` DROP FOREIGN KEY `ExamWeight_examId_fkey`;

-- DropForeignKey
ALTER TABLE `examweight` DROP FOREIGN KEY `ExamWeight_gradeConfigId_fkey`;

-- DropForeignKey
ALTER TABLE `finalgrade` DROP FOREIGN KEY `FinalGrade_gradeConfigId_fkey`;

-- DropForeignKey
ALTER TABLE `finalgrade` DROP FOREIGN KEY `FinalGrade_nisn_fkey`;

-- DropForeignKey
ALTER TABLE `finalgrade` DROP FOREIGN KEY `FinalGrade_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `gradeconfig` DROP FOREIGN KEY `GradeConfig_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `gradeconfig` DROP FOREIGN KEY `GradeConfig_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `kisikisi` DROP FOREIGN KEY `KisiKisi_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `kisikisi` DROP FOREIGN KEY `KisiKisi_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `kisikisiitem` DROP FOREIGN KEY `KisiKisiItem_kisiKisiId_fkey`;

-- DropForeignKey
ALTER TABLE `practicequestion` DROP FOREIGN KEY `PracticeQuestion_practiceId_fkey`;

-- DropForeignKey
ALTER TABLE `practicequestion` DROP FOREIGN KEY `PracticeQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `practicesession` DROP FOREIGN KEY `PracticeSession_practiceId_fkey`;

-- DropForeignKey
ALTER TABLE `practiceset` DROP FOREIGN KEY `PracticeSet_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `practiceset` DROP FOREIGN KEY `PracticeSet_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `questioncard` DROP FOREIGN KEY `QuestionCard_cardSetId_fkey`;

-- DropForeignKey
ALTER TABLE `questioncard` DROP FOREIGN KEY `QuestionCard_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `questioncard` DROP FOREIGN KEY `QuestionCard_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `questionoption` DROP FOREIGN KEY `QuestionOption_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `quizquestion` DROP FOREIGN KEY `QuizQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `quizquestion` DROP FOREIGN KEY `QuizQuestion_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quizsession` DROP FOREIGN KEY `QuizSession_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_dailyTestSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_examSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_practiceSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_quizSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `studentanswer` DROP FOREIGN KEY `StudentAnswer_selectedOptionId_fkey`;

-- DropForeignKey
ALTER TABLE `teachersubject` DROP FOREIGN KEY `TeacherSubject_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `teachersubject` DROP FOREIGN KEY `TeacherSubject_userId_fkey`;

-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_dailyTestSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_examSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_quizSessionId_fkey`;

-- DropTable
DROP TABLE `cardset`;

-- DropTable
DROP TABLE `dailytest`;

-- DropTable
DROP TABLE `dailytestquestion`;

-- DropTable
DROP TABLE `dailytestsession`;

-- DropTable
DROP TABLE `exam`;

-- DropTable
DROP TABLE `examquestion`;

-- DropTable
DROP TABLE `examsession`;

-- DropTable
DROP TABLE `examweight`;

-- DropTable
DROP TABLE `finalgrade`;

-- DropTable
DROP TABLE `gradeconfig`;

-- DropTable
DROP TABLE `kisikisi`;

-- DropTable
DROP TABLE `kisikisiitem`;

-- DropTable
DROP TABLE `practicequestion`;

-- DropTable
DROP TABLE `practicesession`;

-- DropTable
DROP TABLE `practiceset`;

-- DropTable
DROP TABLE `question`;

-- DropTable
DROP TABLE `questioncard`;

-- DropTable
DROP TABLE `questionoption`;

-- DropTable
DROP TABLE `quiz`;

-- DropTable
DROP TABLE `quizquestion`;

-- DropTable
DROP TABLE `quizsession`;

-- DropTable
DROP TABLE `studentanswer`;

-- DropTable
DROP TABLE `subject`;

-- DropTable
DROP TABLE `teachersubject`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `violation`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'GURU') NOT NULL DEFAULT 'GURU',
    `nip` VARCHAR(191) NULL,
    `namaSekolah` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `avatarUrl` VARCHAR(191) NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mata_pelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `warna` VARCHAR(191) NOT NULL DEFAULT 'zinc',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soal` (
    `id` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `tipe` ENUM('PILIHAN_GANDA', 'ESSAY') NOT NULL DEFAULT 'PILIHAN_GANDA',
    `topik` VARCHAR(191) NULL,
    `gambarUrl` VARCHAR(191) NULL,
    `opsiA` VARCHAR(191) NULL,
    `opsiB` VARCHAR(191) NULL,
    `opsiC` VARCHAR(191) NULL,
    `opsiD` VARCHAR(191) NULL,
    `opsiE` VARCHAR(191) NULL,
    `jawabanBenar` VARCHAR(191) NULL,
    `pembahasan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `mataPelajaranId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ujian` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tipe` ENUM('UJIAN', 'ULANGAN', 'LATIHAN', 'KUIS') NOT NULL DEFAULT 'UJIAN',
    `status` ENUM('DRAFT', 'AKTIF', 'BERLANGSUNG', 'SELESAI') NOT NULL DEFAULT 'AKTIF',
    `token` VARCHAR(191) NOT NULL,
    `durasi` INTEGER NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `tanggalMulai` DATETIME(3) NULL,
    `tanggalSelesai` DATETIME(3) NULL,
    `acakSoal` BOOLEAN NOT NULL DEFAULT false,
    `acakOpsi` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `mataPelajaranId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ujian_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ujian_soal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `ujianId` VARCHAR(191) NOT NULL,
    `soalId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ujian_soal_ujianId_soalId_key`(`ujianId`, `soalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesi_siswa` (
    `id` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `status` ENUM('BERLANGSUNG', 'SELESAI', 'TIMEOUT', 'DIHENTIKAN') NOT NULL DEFAULT 'BERLANGSUNG',
    `nilaiBenar` INTEGER NOT NULL DEFAULT 0,
    `nilaiSalah` INTEGER NOT NULL DEFAULT 0,
    `nilaiAkhir` DOUBLE NOT NULL DEFAULT 0,
    `jumlahPelanggaran` INTEGER NOT NULL DEFAULT 0,
    `mulaiAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `selesaiAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `ujianId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jawaban_siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jawabanDipilih` VARCHAR(191) NULL,
    `isBenar` BOOLEAN NOT NULL DEFAULT false,
    `isRagu` BOOLEAN NOT NULL DEFAULT false,
    `waktuDijawab` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soalId` VARCHAR(191) NOT NULL,
    `sesiId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `jawaban_siswa_sesiId_soalId_key`(`sesiId`, `soalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggaran_siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NULL,
    `waktu` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sesiId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konfig_nilai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bobotUjian` INTEGER NOT NULL DEFAULT 40,
    `bobotUlangan` INTEGER NOT NULL DEFAULT 25,
    `bobotLatihan` INTEGER NOT NULL DEFAULT 20,
    `bobotKuis` INTEGER NOT NULL DEFAULT 15,
    `kkm` INTEGER NOT NULL DEFAULT 70,
    `subBobotUjian` JSON NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `mataPelajaranId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `konfig_nilai_mataPelajaranId_key`(`mataPelajaranId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mata_pelajaran` ADD CONSTRAINT `mata_pelajaran_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soal` ADD CONSTRAINT `soal_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `mata_pelajaran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soal` ADD CONSTRAINT `soal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ujian` ADD CONSTRAINT `ujian_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `mata_pelajaran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ujian` ADD CONSTRAINT `ujian_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ujian_soal` ADD CONSTRAINT `ujian_soal_ujianId_fkey` FOREIGN KEY (`ujianId`) REFERENCES `ujian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ujian_soal` ADD CONSTRAINT `ujian_soal_soalId_fkey` FOREIGN KEY (`soalId`) REFERENCES `soal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesi_siswa` ADD CONSTRAINT `sesi_siswa_ujianId_fkey` FOREIGN KEY (`ujianId`) REFERENCES `ujian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jawaban_siswa` ADD CONSTRAINT `jawaban_siswa_sesiId_fkey` FOREIGN KEY (`sesiId`) REFERENCES `sesi_siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pelanggaran_siswa` ADD CONSTRAINT `pelanggaran_siswa_sesiId_fkey` FOREIGN KEY (`sesiId`) REFERENCES `sesi_siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konfig_nilai` ADD CONSTRAINT `konfig_nilai_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `mata_pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konfig_nilai` ADD CONSTRAINT `konfig_nilai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
