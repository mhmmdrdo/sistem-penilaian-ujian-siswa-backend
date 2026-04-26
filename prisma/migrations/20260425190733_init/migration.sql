/*
  Warnings:

  - You are about to drop the column `userId` on the `dailytest` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `practiceset` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `quiz` table. All the data in the column will be lost.
  - The values [siswa] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `attempt` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[testCode]` on the table `DailyTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[practiceCode]` on the table `PracticeSet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizCode]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMinutes` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahunAjaran` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCode` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DailyTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `PracticeSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas` to the `PracticeSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practiceCode` to the `PracticeSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PracticeSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizCode` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attempt` DROP FOREIGN KEY `Attempt_examId_fkey`;

-- DropForeignKey
ALTER TABLE `attempt` DROP FOREIGN KEY `Attempt_userId_fkey`;

-- DropForeignKey
ALTER TABLE `dailytest` DROP FOREIGN KEY `DailyTest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_userId_fkey`;

-- DropForeignKey
ALTER TABLE `practiceset` DROP FOREIGN KEY `PracticeSet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_userId_fkey`;

-- DropForeignKey
ALTER TABLE `teachersubject` DROP FOREIGN KEY `TeacherSubject_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `teachersubject` DROP FOREIGN KEY `TeacherSubject_userId_fkey`;

-- AlterTable
ALTER TABLE `dailytest` DROP COLUMN `userId`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` ENUM('ulangan_harian', 'uts', 'uas', 'sumatif', 'formatif') NOT NULL,
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `durationMinutes` INTEGER NOT NULL,
    ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `instructions` TEXT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `kelas` VARCHAR(191) NOT NULL,
    ADD COLUMN `kkm` INTEGER NOT NULL DEFAULT 75,
    ADD COLUMN `maxViolations` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `randomizeOptions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `randomizeQuestions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    ADD COLUMN `showResult` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `startTime` DATETIME(3) NULL,
    ADD COLUMN `tahunAjaran` VARCHAR(191) NOT NULL,
    ADD COLUMN `testCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `exam` DROP COLUMN `userId`,
    MODIFY `instructions` TEXT NULL;

-- AlterTable
ALTER TABLE `practiceset` DROP COLUMN `userId`,
    ADD COLUMN `accessToken` VARCHAR(191) NULL,
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `displayMode` ENUM('all', 'one_by_one') NOT NULL DEFAULT 'all',
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `kelas` VARCHAR(191) NOT NULL,
    ADD COLUMN `practiceCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `randomizeOptions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `randomizeQuestions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showExplanation` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `showResult` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `correctAnswer`,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `explanation` TEXT NULL,
    MODIFY `kompetensiDasar` TEXT NULL,
    MODIFY `indikator` TEXT NULL,
    MODIFY `tags` TEXT NULL,
    MODIFY `imageUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `userId`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `antiCheatLevel` ENUM('none', 'light', 'strict') NOT NULL DEFAULT 'light',
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `durationMinutes` INTEGER NULL,
    ADD COLUMN `instructions` TEXT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `kelas` VARCHAR(191) NOT NULL,
    ADD COLUMN `quizCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `randomizeOptions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `randomizeQuestions` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showResultImmediately` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('admin', 'guru') NOT NULL;

-- DropTable
DROP TABLE `attempt`;

-- CreateTable
CREATE TABLE `QuestionOption` (
    `id` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `points` DECIMAL(5, 2) NOT NULL DEFAULT 1,

    UNIQUE INDEX `ExamQuestion_examId_questionId_key`(`examId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PracticeQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `practiceId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `PracticeQuestion_practiceId_questionId_key`(`practiceId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `points` DECIMAL(5, 2) NOT NULL DEFAULT 1,

    UNIQUE INDEX `QuizQuestion_quizId_questionId_key`(`quizId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyTestQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `testId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `points` DECIMAL(5, 2) NOT NULL DEFAULT 1,

    UNIQUE INDEX `DailyTestQuestion_testId_questionId_key`(`testId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSession` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `studentClass` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `status` ENUM('in_progress', 'submitted', 'auto_submitted', 'violation_ended') NOT NULL DEFAULT 'in_progress',
    `violationCount` INTEGER NOT NULL DEFAULT 0,
    `score` DECIMAL(5, 2) NULL,
    `totalCorrect` INTEGER NOT NULL DEFAULT 0,
    `totalWrong` INTEGER NOT NULL DEFAULT 0,
    `totalUnanswered` INTEGER NOT NULL DEFAULT 0,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submittedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ExamSession_sessionToken_key`(`sessionToken`),
    UNIQUE INDEX `ExamSession_examId_nisn_key`(`examId`, `nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PracticeSession` (
    `id` VARCHAR(191) NOT NULL,
    `practiceId` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `studentClass` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `score` DECIMAL(5, 2) NULL,
    `totalCorrect` INTEGER NOT NULL DEFAULT 0,
    `totalWrong` INTEGER NOT NULL DEFAULT 0,
    `totalUnanswered` INTEGER NOT NULL DEFAULT 0,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submittedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PracticeSession_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizSession` (
    `id` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `studentClass` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `status` ENUM('in_progress', 'submitted', 'auto_submitted', 'violation_ended') NOT NULL DEFAULT 'in_progress',
    `violationCount` INTEGER NOT NULL DEFAULT 0,
    `score` DECIMAL(5, 2) NULL,
    `totalCorrect` INTEGER NOT NULL DEFAULT 0,
    `totalWrong` INTEGER NOT NULL DEFAULT 0,
    `totalUnanswered` INTEGER NOT NULL DEFAULT 0,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submittedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `QuizSession_sessionToken_key`(`sessionToken`),
    UNIQUE INDEX `QuizSession_quizId_nisn_key`(`quizId`, `nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyTestSession` (
    `id` VARCHAR(191) NOT NULL,
    `testId` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `studentClass` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `status` ENUM('in_progress', 'submitted', 'auto_submitted', 'violation_ended') NOT NULL DEFAULT 'in_progress',
    `violationCount` INTEGER NOT NULL DEFAULT 0,
    `isPassed` BOOLEAN NOT NULL DEFAULT false,
    `score` DECIMAL(5, 2) NULL,
    `totalCorrect` INTEGER NOT NULL DEFAULT 0,
    `totalWrong` INTEGER NOT NULL DEFAULT 0,
    `totalUnanswered` INTEGER NOT NULL DEFAULT 0,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submittedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DailyTestSession_sessionToken_key`(`sessionToken`),
    UNIQUE INDEX `DailyTestSession_testId_nisn_key`(`testId`, `nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `sessionType` ENUM('exam', 'practice', 'quiz', 'daily_test') NOT NULL,
    `examSessionId` VARCHAR(191) NULL,
    `practiceSessionId` VARCHAR(191) NULL,
    `quizSessionId` VARCHAR(191) NULL,
    `dailyTestSessionId` VARCHAR(191) NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `selectedOptionId` VARCHAR(191) NULL,
    `essayAnswer` TEXT NULL,
    `isCorrect` BOOLEAN NULL,
    `manualScore` DECIMAL(5, 2) NULL,
    `teacherComment` TEXT NULL,
    `answeredAt` DATETIME(3) NULL,
    `timeSpentSeconds` INTEGER NULL,
    `isFlagged` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Violation` (
    `id` VARCHAR(191) NOT NULL,
    `sessionType` ENUM('exam', 'quiz', 'daily_test') NOT NULL,
    `violationType` ENUM('tab_switch', 'window_blur', 'fullscreen_exit', 'devtools_open', 'print_screen', 'copy_attempt', 'context_menu') NOT NULL,
    `violationNumber` INTEGER NOT NULL,
    `currentQuestion` INTEGER NULL,
    `description` TEXT NULL,
    `occurredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `examSessionId` VARCHAR(191) NULL,
    `quizSessionId` VARCHAR(191) NULL,
    `dailyTestSessionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KisiKisi` (
    `id` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `tahunAjaran` VARCHAR(191) NOT NULL,
    `kompetensiInti` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KisiKisiItem` (
    `id` VARCHAR(191) NOT NULL,
    `kisiKisiId` VARCHAR(191) NOT NULL,
    `kompetensiDasar` TEXT NULL,
    `materi` TEXT NULL,
    `indikatorSoal` TEXT NULL,
    `levelKognitif` VARCHAR(191) NULL,
    `bentukSoal` VARCHAR(191) NULL,
    `nomorSoal` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardSet` (
    `id` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NULL,
    `kelas` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionCard` (
    `id` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `cardSetId` VARCHAR(191) NULL,
    `frontQuestion` TEXT NOT NULL,
    `frontKd` TEXT NULL,
    `frontIndikator` TEXT NULL,
    `backAnswer` TEXT NOT NULL,
    `backExplanation` TEXT NULL,
    `backBloomLevel` VARCHAR(191) NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `tags` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DailyTest_testCode_key` ON `DailyTest`(`testCode`);

-- CreateIndex
CREATE UNIQUE INDEX `PracticeSet_practiceCode_key` ON `PracticeSet`(`practiceCode`);

-- CreateIndex
CREATE UNIQUE INDEX `Quiz_quizCode_key` ON `Quiz`(`quizCode`);

-- AddForeignKey
ALTER TABLE `TeacherSubject` ADD CONSTRAINT `TeacherSubject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherSubject` ADD CONSTRAINT `TeacherSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionOption` ADD CONSTRAINT `QuestionOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PracticeSet` ADD CONSTRAINT `PracticeSet_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyTest` ADD CONSTRAINT `DailyTest_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestion` ADD CONSTRAINT `ExamQuestion_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestion` ADD CONSTRAINT `ExamQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PracticeQuestion` ADD CONSTRAINT `PracticeQuestion_practiceId_fkey` FOREIGN KEY (`practiceId`) REFERENCES `PracticeSet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PracticeQuestion` ADD CONSTRAINT `PracticeQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyTestQuestion` ADD CONSTRAINT `DailyTestQuestion_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `DailyTest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyTestQuestion` ADD CONSTRAINT `DailyTestQuestion_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSession` ADD CONSTRAINT `ExamSession_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PracticeSession` ADD CONSTRAINT `PracticeSession_practiceId_fkey` FOREIGN KEY (`practiceId`) REFERENCES `PracticeSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizSession` ADD CONSTRAINT `QuizSession_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyTestSession` ADD CONSTRAINT `DailyTestSession_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `DailyTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_selectedOptionId_fkey` FOREIGN KEY (`selectedOptionId`) REFERENCES `QuestionOption`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_examSessionId_fkey` FOREIGN KEY (`examSessionId`) REFERENCES `ExamSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_practiceSessionId_fkey` FOREIGN KEY (`practiceSessionId`) REFERENCES `PracticeSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_quizSessionId_fkey` FOREIGN KEY (`quizSessionId`) REFERENCES `QuizSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAnswer` ADD CONSTRAINT `StudentAnswer_dailyTestSessionId_fkey` FOREIGN KEY (`dailyTestSessionId`) REFERENCES `DailyTestSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_examSessionId_fkey` FOREIGN KEY (`examSessionId`) REFERENCES `ExamSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_quizSessionId_fkey` FOREIGN KEY (`quizSessionId`) REFERENCES `QuizSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_dailyTestSessionId_fkey` FOREIGN KEY (`dailyTestSessionId`) REFERENCES `DailyTestSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KisiKisi` ADD CONSTRAINT `KisiKisi_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KisiKisi` ADD CONSTRAINT `KisiKisi_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KisiKisiItem` ADD CONSTRAINT `KisiKisiItem_kisiKisiId_fkey` FOREIGN KEY (`kisiKisiId`) REFERENCES `KisiKisi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardSet` ADD CONSTRAINT `CardSet_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionCard` ADD CONSTRAINT `QuestionCard_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionCard` ADD CONSTRAINT `QuestionCard_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionCard` ADD CONSTRAINT `QuestionCard_cardSetId_fkey` FOREIGN KEY (`cardSetId`) REFERENCES `CardSet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
