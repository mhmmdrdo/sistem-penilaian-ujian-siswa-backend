import {
  PrismaClient,
  QuestionType,
  CognitiveLevel,
  Difficulty,
  SessionStatus,
  AntiCheatLevel,
  DailyTestCategory,
  SessionType,
} from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

function generateCode(prefix: string) {
  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

function generateToken() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

async function main() {
  console.log('🌱 Seeding...')

  // =====================
  // USERS — hanya admin dan guru (Fix #1: hapus role siswa)
  // =====================
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@gmail.com',
      passwordHash: '$2b$10$hashedpassword', // gunakan bcrypt di production
      role: 'admin',
      namaSekolah: 'SMK Negeri 1 Pekanbaru',
      logoSekolah: 'https://example.com/logo.png',
    },
  })

  const guru = await prisma.user.create({
    data: {
      name: 'Guru Matematika',
      email: 'guru@gmail.com',
      passwordHash: '$2b$10$hashedpassword',
      role: 'guru',
      namaSekolah: 'SMK Negeri 1 Pekanbaru',
      logoSekolah: 'https://example.com/logo.png',
    },
  })

  // =====================
  // SUBJECT
  // =====================
  const subject = await prisma.subject.create({
    data: {
      name: 'Matematika',
      code: 'MTK',
      createdBy: admin.id,
    },
  })

  // =====================
  // RELASI GURU <-> MAPEL
  // =====================
  await prisma.teacherSubject.create({
    data: {
      userId: guru.id,
      subjectId: subject.id,
    },
  })

  // =====================
  // QUESTIONS + OPTIONS
  // =====================
  const questionIds: string[] = []

  for (let i = 1; i <= 30; i++) {
    const question = await prisma.question.create({
      data: {
        createdBy: guru.id,
        questionType: QuestionType.multiple_choice,
        content: `Berapakah ${i} + ${i}?`,
        subjectId: subject.id,
        kelas: '10',
        cognitiveLevel: CognitiveLevel.C1,
        difficulty: Difficulty.mudah,
        // Fix #9: Buat opsi jawaban
        options: {
          create: [
            { label: 'A', content: `${i + i - 2}`, isCorrect: false, orderIndex: 0 },
            { label: 'B', content: `${i + i - 1}`, isCorrect: false, orderIndex: 1 },
            { label: 'C', content: `${i + i}`,     isCorrect: true,  orderIndex: 2 },
            { label: 'D', content: `${i + i + 1}`, isCorrect: false, orderIndex: 3 },
            { label: 'E', content: `${i + i + 2}`, isCorrect: false, orderIndex: 4 },
          ],
        },
      },
    })
    questionIds.push(question.id)
  }

  // =====================
  // EXAM (dibuat oleh Guru, bukan siswa — Fix #13)
  // =====================
  const exam = await prisma.exam.create({
    data: {
      examCode: generateCode('UJN'),
      createdBy: guru.id,
      title: 'Ujian Tengah Semester Matematika',
      subjectId: subject.id,
      kelas: '10',
      durationMinutes: 60,
      accessToken: generateToken(),
      instructions: 'Kerjakan soal dengan teliti. Pilih satu jawaban yang paling tepat.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari ke depan
    },
  })

  // Assign soal ke ujian (Fix #5: pakai tabel pivot)
  await prisma.examQuestion.createMany({
    data: questionIds.slice(0, 20).map((qId, idx) => ({
      examId: exam.id,
      questionId: qId,
      orderIndex: idx,
      points: 5,
    })),
  })

  // =====================
  // PRACTICE SET (dibuat oleh Guru — Fix #13)
  // =====================
  const practiceSet = await prisma.practiceSet.create({
    data: {
      practiceCode: generateCode('LAT'),
      createdBy: guru.id,
      title: 'Latihan Persiapan UTS Matematika',
      subjectId: subject.id,
      kelas: '10',
      description: 'Latihan mandiri untuk mempersiapkan UTS. Pembahasan tersedia setelah menjawab.',
      showExplanation: true,
      showResult: true,
    },
  })

  await prisma.practiceQuestion.createMany({
    data: questionIds.slice(0, 15).map((qId, idx) => ({
      practiceId: practiceSet.id,
      questionId: qId,
      orderIndex: idx,
    })),
  })

  // =====================
  // QUIZ (dibuat oleh Guru — Fix #13)
  // =====================
  const quiz = await prisma.quiz.create({
    data: {
      quizCode: generateCode('KUI'),
      createdBy: guru.id,
      title: 'Kuis Harian — Operasi Bilangan',
      subjectId: subject.id,
      kelas: '10',
      durationMinutes: 15,
      accessToken: generateToken(),
      antiCheatLevel: AntiCheatLevel.light,
      showResultImmediately: true,
    },
  })

  await prisma.quizQuestion.createMany({
    data: questionIds.slice(0, 10).map((qId, idx) => ({
      quizId: quiz.id,
      questionId: qId,
      orderIndex: idx,
      points: 10,
    })),
  })

  // =====================
  // DAILY TEST (dibuat oleh Guru — Fix #13)
  // =====================
  const dailyTest = await prisma.dailyTest.create({
    data: {
      testCode: generateCode('ULG'),
      createdBy: guru.id,
      title: 'Ulangan Harian Bab 1 — Bilangan',
      category: DailyTestCategory.ulangan_harian,
      subjectId: subject.id,
      kelas: '10',
      semester: '1',
      tahunAjaran: '2025/2026',
      durationMinutes: 45,
      accessToken: generateToken(),
      kkm: 75,
      instructions: 'Kerjakan soal berikut dengan jujur.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.dailyTestQuestion.createMany({
    data: questionIds.slice(0, 20).map((qId, idx) => ({
      testId: dailyTest.id,
      questionId: qId,
      orderIndex: idx,
      points: 5,
    })),
  })

  // =====================
  // CONTOH SESI SISWA (guest — Fix #7)
  // Siswa tidak punya akun, hanya pakai NISN + nama + kelas
  // =====================
  const siswaSample = [
    { nisn: '1234567890', name: 'Andi Pratama', kelas: '10A' },
    { nisn: '0987654321', name: 'Budi Santoso', kelas: '10B' },
    { nisn: '1122334455', name: 'Citra Dewi',   kelas: '10A' },
  ]

  for (const siswa of siswaSample) {
    const examSession = await prisma.examSession.create({
      data: {
        examId: exam.id,
        nisn: siswa.nisn,
        studentName: siswa.name,
        studentClass: siswa.kelas,
        sessionToken: generateToken(),
        status: SessionStatus.submitted,
        score: Math.floor(Math.random() * 40 + 60), // 60–100
        totalCorrect: 15,
        totalWrong: 5,
        totalUnanswered: 0,
        submittedAt: new Date(),
      },
    })

    // Contoh jawaban siswa
    const examQs = await prisma.examQuestion.findMany({ where: { examId: exam.id }, take: 3 })
    for (const eq of examQs) {
      const options = await prisma.questionOption.findMany({ where: { questionId: eq.questionId } })
      const correctOption = options.find((o) => o.isCorrect)
      await prisma.studentAnswer.create({
        data: {
          sessionType: SessionType.exam,
          examSessionId: examSession.id,
          questionId: eq.questionId,
          selectedOptionId: correctOption?.id ?? null,
          isCorrect: true,
          timeSpentSeconds: Math.floor(Math.random() * 60 + 10),
        },
      })
    }
  }

  console.log('✅ Seeder selesai')
  console.log(`   Exam code  : ${exam.examCode}  | Token: ${exam.accessToken}`)
  console.log(`   Latihan    : ${practiceSet.practiceCode}`)
  console.log(`   Kuis       : ${quiz.quizCode}  | Token: ${quiz.accessToken}`)
  console.log(`   Ulangan    : ${dailyTest.testCode} | Token: ${dailyTest.accessToken}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })