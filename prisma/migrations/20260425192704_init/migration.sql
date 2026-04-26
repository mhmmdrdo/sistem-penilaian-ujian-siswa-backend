-- CreateTable
CREATE TABLE `GradeConfig` (
    `id` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `tahunAjaran` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `kkm` INTEGER NOT NULL DEFAULT 75,
    `bobotExam` INTEGER NOT NULL DEFAULT 40,
    `bobotDailyTest` INTEGER NOT NULL DEFAULT 25,
    `bobotPractice` INTEGER NOT NULL DEFAULT 20,
    `bobotQuiz` INTEGER NOT NULL DEFAULT 15,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GradeConfig_subjectId_kelas_semester_tahunAjaran_key`(`subjectId`, `kelas`, `semester`, `tahunAjaran`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamWeight` (
    `id` VARCHAR(191) NOT NULL,
    `gradeConfigId` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ExamWeight_gradeConfigId_examId_key`(`gradeConfigId`, `examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalGrade` (
    `id` VARCHAR(191) NOT NULL,
    `gradeConfigId` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `examScore` DECIMAL(5, 2) NOT NULL,
    `dailyScore` DECIMAL(5, 2) NOT NULL,
    `practiceScore` DECIMAL(5, 2) NOT NULL,
    `quizScore` DECIMAL(5, 2) NOT NULL,
    `finalScore` DECIMAL(5, 2) NOT NULL,
    `isPassed` BOOLEAN NOT NULL DEFAULT false,
    `grade` VARCHAR(191) NULL,
    `calculatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FinalGrade_gradeConfigId_nisn_key`(`gradeConfigId`, `nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GradeConfig` ADD CONSTRAINT `GradeConfig_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GradeConfig` ADD CONSTRAINT `GradeConfig_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamWeight` ADD CONSTRAINT `ExamWeight_gradeConfigId_fkey` FOREIGN KEY (`gradeConfigId`) REFERENCES `GradeConfig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamWeight` ADD CONSTRAINT `ExamWeight_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGrade` ADD CONSTRAINT `FinalGrade_gradeConfigId_fkey` FOREIGN KEY (`gradeConfigId`) REFERENCES `GradeConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGrade` ADD CONSTRAINT `FinalGrade_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGrade` ADD CONSTRAINT `FinalGrade_nisn_fkey` FOREIGN KEY (`nisn`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
