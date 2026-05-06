# Context Backend — Sistem Penilaian Siswa
> Stack: **Next.js 14 (App Router) + TypeScript + Prisma + MySQL**
> Backend dibangun sebagai **Next.js API Routes** (`app/api/...`)

---

## 1. STRUKTUR FOLDER BACKEND

```
backend/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── me/route.ts
│       ├── admin/
│       │   ├── dashboard/route.ts
│       │   └── users/
│       │       ├── route.ts
│       │       └── [id]/route.ts
│       ├── mata-pelajaran/
│       │   ├── route.ts
│       │   └── [mapelId]/
│       │       ├── route.ts
│       │       ├── soal/route.ts
│       │       ├── ujian/route.ts
│       │       ├── konfig-nilai/route.ts
│       │       └── nilai-akhir/route.ts
│       ├── soal/
│       │   └── [soalId]/route.ts
│       ├── ujian/
│       │   └── [ujianId]/
│       │       ├── route.ts
│       │       ├── status/route.ts
│       │       └── laporan/
│       │           ├── route.ts
│       │           └── siswa/[nisn]/route.ts
│       ├── siswa/
│       │   ├── ujian/[ujianId]/route.ts
│       │   ├── akses-ujian/route.ts
│       │   └── sesi/
│       │       └── [sesiId]/
│       │           ├── soal/route.ts
│       │           ├── jawab/route.ts
│       │           ├── pelanggaran/route.ts
│       │           └── selesai/route.ts
│       └── profil/route.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── lib/
│   ├── prisma.ts          ← Prisma client singleton
│   ├── auth.ts            ← JWT helper (sign, verify)
│   ├── middleware.ts      ← Auth guard helper
│   └── token.ts           ← Token generator untuk ujian
├── .env
└── package.json
```

---

## 2. SETUP & INSTALASI

### `package.json` dependencies

```json
{
  "dependencies": {
    "@prisma/client": "^5.13.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "zod": "^3.23.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20",
    "@types/react": "^18",
    "prisma": "^5.13.0",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node --project tsconfig.json prisma/seed.ts",
    "db:reset": "prisma migrate reset --force && npm run db:seed",
    "db:studio": "prisma studio"
  }
}
```

---

## 3. ENVIRONMENT

### `.env`
```env
DATABASE_URL="mysql://root:password@localhost:3306/sistem_penilaian"
JWT_SECRET="your-super-secret-jwt-key-minimal-32-chars"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
```

### `.env.local` (untuk Next.js, bisa digabung ke `.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 4. DATABASE SCHEMA (Prisma + MySQL)

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────
// AUTH & USER
// ─────────────────────────────────────────────

enum Role {
  ADMIN
  GURU
}

model User {
  id          String    @id @default(cuid())
  name        String
  email       String    @unique
  password    String
  role        Role      @default(GURU)
  nip         String?
  namaSekolah String?
  isActive    Boolean   @default(true)
  avatarUrl   String?
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  mataPelajaran MataPelajaran[]
  soal          Soal[]
  ujian         Ujian[]
  konfigNilai   KonfigNilai[]

  @@map("users")
}

// ─────────────────────────────────────────────
// MATA PELAJARAN
// ─────────────────────────────────────────────

model MataPelajaran {
  id        Int      @id @default(autoincrement())
  nama      String
  kelas     String
  deskripsi String?
  warna     String   @default("zinc")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id])

  soal        Soal[]
  ujian       Ujian[]
  konfigNilai KonfigNilai?

  @@map("mata_pelajaran")
}

// ─────────────────────────────────────────────
// BANK SOAL
// ─────────────────────────────────────────────

enum TipeSoal {
  PILIHAN_GANDA
  ESSAY
}

model Soal {
  id           String   @id @default(cuid())
  pertanyaan   String   @db.Text
  tipe         TipeSoal @default(PILIHAN_GANDA)
  topik        String?
  gambarUrl    String?
  opsiA        String?
  opsiB        String?
  opsiC        String?
  opsiD        String?
  jawabanBenar String?
  pembahasan   String?  @db.Text
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  mataPelajaranId Int
  mataPelajaran   MataPelajaran @relation(fields: [mataPelajaranId], references: [id])

  userId String
  user   User   @relation(fields: [userId], references: [id])

  ujianSoal UjianSoal[]

  @@map("soal")
}

// ─────────────────────────────────────────────
// UJIAN
// ─────────────────────────────────────────────

enum TipeUjian {
  UJIAN
  ULANGAN
  LATIHAN
  KUIS
}

enum StatusUjian {
  DRAFT
  AKTIF
  BERLANGSUNG
  SELESAI
}

model Ujian {
  id             String      @id @default(cuid())
  nama           String
  tipe           TipeUjian   @default(UJIAN)
  status         StatusUjian @default(DRAFT)
  token          String      @unique
  durasi         Int
  kelas          String
  tanggalMulai   DateTime?
  tanggalSelesai DateTime?
  acakSoal       Boolean     @default(false)
  acakOpsi       Boolean     @default(false)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  mataPelajaranId Int
  mataPelajaran   MataPelajaran @relation(fields: [mataPelajaranId], references: [id])

  userId String
  user   User   @relation(fields: [userId], references: [id])

  soalUjian UjianSoal[]
  sesiSiswa SesiSiswa[]

  @@map("ujian")
}

model UjianSoal {
  id     Int @id @default(autoincrement())
  urutan Int @default(0)

  ujianId String
  ujian   Ujian  @relation(fields: [ujianId], references: [id], onDelete: Cascade)

  soalId String
  soal   Soal   @relation(fields: [soalId], references: [id])

  @@unique([ujianId, soalId])
  @@map("ujian_soal")
}

// ─────────────────────────────────────────────
// SESI UJIAN SISWA
// ─────────────────────────────────────────────

enum StatusSesi {
  BERLANGSUNG
  SELESAI
  TIMEOUT
  DIHENTIKAN
}

model SesiSiswa {
  id                String     @id @default(cuid())
  nisn              String
  namaLengkap       String
  kelas             String
  status            StatusSesi @default(BERLANGSUNG)
  nilaiBenar        Int        @default(0)
  nilaiSalah        Int        @default(0)
  nilaiAkhir        Float      @default(0)
  jumlahPelanggaran Int        @default(0)
  mulaiAt           DateTime   @default(now())
  selesaiAt         DateTime?
  ipAddress         String?
  userAgent         String?

  ujianId String
  ujian   Ujian  @relation(fields: [ujianId], references: [id])

  jawaban     JawabanSiswa[]
  pelanggaran PelanggaranSiswa[]

  @@map("sesi_siswa")
}

model JawabanSiswa {
  id             Int      @id @default(autoincrement())
  jawabanDipilih String?
  isBenar        Boolean  @default(false)
  isRagu         Boolean  @default(false)
  waktuDijawab   DateTime @default(now())
  soalId         String

  sesiId String
  sesi   SesiSiswa @relation(fields: [sesiId], references: [id], onDelete: Cascade)

  @@unique([sesiId, soalId])
  @@map("jawaban_siswa")
}

model PelanggaranSiswa {
  id      Int      @id @default(autoincrement())
  jenis   String
  catatan String?
  waktu   DateTime @default(now())

  sesiId String
  sesi   SesiSiswa @relation(fields: [sesiId], references: [id], onDelete: Cascade)

  @@map("pelanggaran_siswa")
}

// ─────────────────────────────────────────────
// KONFIGURASI NILAI AKHIR
// ─────────────────────────────────────────────

model KonfigNilai {
  id            Int   @id @default(autoincrement())
  bobotUjian    Int   @default(40)
  bobotUlangan  Int   @default(25)
  bobotLatihan  Int   @default(20)
  bobotKuis     Int   @default(15)
  kkm           Int   @default(70)
  subBobotUjian Json?
  updatedAt     DateTime @updatedAt

  mataPelajaranId Int    @unique
  mataPelajaran   MataPelajaran @relation(fields: [mataPelajaranId], references: [id])

  userId String
  user   User   @relation(fields: [userId], references: [id])

  @@map("konfig_nilai")
}
```

---

## 5. LIBRARY HELPERS

### `lib/prisma.ts`
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

### `lib/auth.ts`
```typescript
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface JwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "GURU";
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
```

---

### `lib/middleware.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JwtPayload } from "./auth";

export function getAuthUser(req: NextRequest): JwtPayload | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireAuth(
  req: NextRequest,
  allowedRoles?: Array<"ADMIN" | "GURU">
): { user: JwtPayload } | NextResponse {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  return { user };
}
```

---

### `lib/token.ts`
```typescript
import { customAlphabet } from "nanoid";

const alpha = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4);

/**
 * Format: [3HurufMapel]-[4CHAR]-[4CHAR]
 * Contoh: MAT-7X2K-9PQR
 */
export function generateTokenUjian(namaMapel: string): string {
  const prefix = namaMapel
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3)
    .padEnd(3, "X");
  return `${prefix}-${alpha()}-${alpha()}`;
}
```

> Install nanoid: `npm install nanoid`

---

## 6. API ROUTES

### 6.1. Auth

#### `app/api/auth/login/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Data tidak valid" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      nip: user.nip,
      namaSekolah: user.namaSekolah,
      isActive: user.isActive,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    },
  });
}
```

#### `app/api/auth/me/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: {
      id: true, name: true, email: true, role: true,
      nip: true, namaSekolah: true, isActive: true,
      avatarUrl: true, lastLoginAt: true, createdAt: true,
    },
  });

  if (!user) return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
  return NextResponse.json(user);
}
```

---

### 6.2. Admin Dashboard

#### `app/api/admin/dashboard/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const [totalSoal, totalGuru, ujianAktif, ujianBerlangsung, recentUsers] = await Promise.all([
    prisma.soal.count(),
    prisma.user.count({ where: { role: "GURU" } }),
    prisma.ujian.count({ where: { status: "AKTIF" } }),
    prisma.ujian.findMany({
      where: { status: "BERLANGSUNG" },
      include: {
        user: { select: { name: true, namaSekolah: true } },
        sesiSiswa: { where: { status: "BERLANGSUNG" } },
        _count: { select: { sesiSiswa: true } },
      },
      take: 5,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true, name: true, email: true, role: true,
        nip: true, namaSekolah: true, isActive: true, createdAt: true,
      },
    }),
  ]);

  // Hitung rata-rata nilai dari semua sesi selesai
  const nilaiResult = await prisma.sesiSiswa.aggregate({
    where: { status: "SELESAI" },
    _avg: { nilaiAkhir: true },
  });

  return NextResponse.json({
    totalSoal,
    ujianAktif,
    totalGuru,
    rataRataNilai: Math.round((nilaiResult._avg.nilaiAkhir ?? 0) * 10) / 10,
    ujianBerlangsung: ujianBerlangsung.map((u) => ({
      id: u.id,
      nama: u.nama,
      namaSekolah: u.user.namaSekolah,
      namaGuru: u.user.name,
      kelas: u.kelas,
      peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
      status: u.status,
    })),
    recentUsers,
  });
}
```

---

### 6.3. Admin Manajemen User

#### `app/api/admin/users/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { z } from "zod";

const createSchema = z.object({
  nama: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "guru"]),
  bidang: z.string().optional(),
  nip: z.string().optional(),
  hp: z.string().optional(),
  status: z.enum(["aktif", "nonaktif"]).default("aktif"),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  const roleFilter =
    role === "admin" ? "ADMIN" : role === "guru" ? "GURU" : undefined;

  const where = {
    ...(roleFilter && { role: roleFilter as "ADMIN" | "GURU" }),
    ...(search && {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
      ],
    }),
  };

  const [data, total, adminCount, guruCount] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "GURU" } }),
  ]);

  return NextResponse.json({
    data: data.map((u) => ({
      id: u.id,
      nama: u.name,
      email: u.email,
      role: u.role.toLowerCase(),
      bidang: u.namaSekolah,
      nip: u.nip,
      status: u.isActive ? "aktif" : "nonaktif",
    })),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    stats: { total: total, admin: adminCount, guru: guruCount, siswa: 0 },
  });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Data tidak valid", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { nama, email, password, role, bidang, nip, status } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Email sudah digunakan" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: nama,
      email,
      password: hashed,
      role: role.toUpperCase() as "ADMIN" | "GURU",
      namaSekolah: bidang,
      nip,
      isActive: status === "aktif",
    },
  });

  return NextResponse.json({ message: "User berhasil ditambahkan", id: user.id }, { status: 201 });
}
```

#### `app/api/admin/users/[id]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });

  return NextResponse.json({
    id: user.id, nama: user.name, email: user.email,
    role: user.role.toLowerCase(), bidang: user.namaSekolah,
    nip: user.nip, status: user.isActive ? "aktif" : "nonaktif",
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { nama, email, password, role, bidang, nip, status } = body;

  const updateData: Record<string, unknown> = {};
  if (nama) updateData.name = nama;
  if (email) updateData.email = email;
  if (password) updateData.password = await bcrypt.hash(password, 12);
  if (role) updateData.role = role.toUpperCase();
  if (bidang !== undefined) updateData.namaSekolah = bidang;
  if (nip !== undefined) updateData.nip = nip;
  if (status) updateData.isActive = status === "aktif";

  await prisma.user.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ message: "User berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User berhasil dihapus" });
}
```

---

### 6.4. Mata Pelajaran

#### `app/api/mata-pelajaran/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const kelas = searchParams.get("kelas");

  const where = {
    ...(auth.user.role === "GURU" && { userId: auth.user.id }),
    ...(kelas && { kelas }),
  };

  const mapel = await prisma.mataPelajaran.findMany({
    where,
    include: {
      _count: { select: { soal: true, ujian: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const [totalSoal, totalUjian] = await Promise.all([
    prisma.soal.count({ where: { mataPelajaran: where } }),
    prisma.ujian.count({ where: { mataPelajaran: where } }),
  ]);

  return NextResponse.json({
    data: mapel.map((m) => ({
      id: m.id, nama: m.nama, kelas: m.kelas,
      deskripsi: m.deskripsi, warna: m.warna,
      totalSoal: m._count.soal, totalUjian: m._count.ujian,
    })),
    stats: { totalSoal, totalUjian },
  });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { nama, kelas, deskripsi, warna } = await req.json();

  const mapel = await prisma.mataPelajaran.create({
    data: { nama, kelas, deskripsi, warna: warna || "zinc", userId: auth.user.id },
  });

  return NextResponse.json({ message: "Mata pelajaran berhasil ditambahkan", id: mapel.id }, { status: 201 });
}
```

#### `app/api/mata-pelajaran/[mapelId]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function PUT(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  await prisma.mataPelajaran.update({
    where: { id: parseInt(params.mapelId) },
    data: body,
  });

  return NextResponse.json({ message: "Mata pelajaran berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  await prisma.mataPelajaran.delete({ where: { id: parseInt(params.mapelId) } });
  return NextResponse.json({ message: "Mata pelajaran berhasil dihapus" });
}
```

---

### 6.5. Soal

#### `app/api/mata-pelajaran/[mapelId]/soal/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const tipe = searchParams.get("tipe");

  const data = await prisma.soal.findMany({
    where: {
      mataPelajaranId: parseInt(params.mapelId),
      ...(tipe && { tipe: tipe as "PILIHAN_GANDA" | "ESSAY" }),
      ...(search && { pertanyaan: { contains: search } }),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data, total: data.length });
}

export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();

  const soal = await prisma.soal.create({
    data: {
      ...body,
      mataPelajaranId: parseInt(params.mapelId),
      userId: auth.user.id,
    },
  });

  return NextResponse.json({ message: "Soal berhasil ditambahkan", id: soal.id }, { status: 201 });
}
```

#### `app/api/soal/[soalId]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function PUT(req: NextRequest, { params }: { params: { soalId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  await prisma.soal.update({ where: { id: params.soalId }, data: body });
  return NextResponse.json({ message: "Soal berhasil diperbarui" });
}

export async function DELETE(req: NextRequest, { params }: { params: { soalId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  await prisma.soal.delete({ where: { id: params.soalId } });
  return NextResponse.json({ message: "Soal berhasil dihapus" });
}
```

---

### 6.6. Ujian

#### `app/api/mata-pelajaran/[mapelId]/ujian/route.ts`
```typescript
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
      _count: { select: { soalUjian: true, sesiSiswa: true } },
      sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    data: data.map((u) => ({
      id: u.id, nama: u.nama, tipe: u.tipe, status: u.status,
      token: u.token, durasi: u.durasi, kelas: u.kelas,
      tanggalMulai: u.tanggalMulai,
      totalSoal: u._count.soalUjian,
      peserta: `${u.sesiSiswa.length}/${u._count.sesiSiswa}`,
      linkAkses: `${process.env.FRONTEND_URL}/siswa/akses-ujian/${u.id}`,
    })),
  });
}

export async function POST(req: NextRequest, { params }: { params: { mapelId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { nama, tipe, durasi, kelas, tanggalMulai, tanggalSelesai, acakSoal, acakOpsi, soalIds } = body;

  const mapel = await prisma.mataPelajaran.findUnique({ where: { id: parseInt(params.mapelId) } });
  if (!mapel) return NextResponse.json({ message: "Mapel tidak ditemukan" }, { status: 404 });

  let token: string;
  let attempts = 0;
  do {
    token = generateTokenUjian(mapel.nama);
    const exists = await prisma.ujian.findUnique({ where: { token } });
    if (!exists) break;
    attempts++;
  } while (attempts < 5);

  const ujian = await prisma.ujian.create({
    data: {
      nama, tipe, durasi, kelas, token: token!,
      tanggalMulai: tanggalMulai ? new Date(tanggalMulai) : null,
      tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
      acakSoal: acakSoal ?? false,
      acakOpsi: acakOpsi ?? false,
      mataPelajaranId: parseInt(params.mapelId),
      userId: auth.user.id,
      soalUjian: {
        create: (soalIds as string[]).map((soalId, idx) => ({
          soalId,
          urutan: idx + 1,
        })),
      },
    },
  });

  return NextResponse.json({ message: "Ujian berhasil dibuat", id: ujian.id, token: ujian.token }, { status: 201 });
}
```

#### `app/api/ujian/[ujianId]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: {
      soalUjian: {
        include: { soal: true },
        orderBy: { urutan: "asc" },
      },
      _count: { select: { sesiSiswa: true } },
      sesiSiswa: { where: { status: "BERLANGSUNG" }, select: { id: true } },
    },
  });

  if (!ujian) return NextResponse.json({ message: "Ujian tidak ditemukan" }, { status: 404 });

  return NextResponse.json({
    id: ujian.id, nama: ujian.nama, tipe: ujian.tipe, status: ujian.status,
    token: ujian.token, durasi: ujian.durasi, kelas: ujian.kelas,
    totalSoal: ujian.soalUjian.length,
    peserta: { masuk: ujian.sesiSiswa.length, total: ujian._count.sesiSiswa },
    linkAkses: `${process.env.FRONTEND_URL}/siswa/akses-ujian/${ujian.id}`,
    soal: ujian.soalUjian.map((us) => ({
      id: us.soal.id, urutan: us.urutan,
      pertanyaan: us.soal.pertanyaan, tipe: us.soal.tipe,
      opsiA: us.soal.opsiA, opsiB: us.soal.opsiB,
      opsiC: us.soal.opsiC, opsiD: us.soal.opsiD,
    })),
  });
}

export async function PUT(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const ujian = await prisma.ujian.findUnique({ where: { id: params.ujianId } });
  if (!ujian) return NextResponse.json({ message: "Ujian tidak ditemukan" }, { status: 404 });
  if (ujian.status !== "DRAFT") {
    return NextResponse.json({ message: "Ujian hanya bisa diedit saat masih DRAFT" }, { status: 400 });
  }

  const body = await req.json();
  await prisma.ujian.update({ where: { id: params.ujianId }, data: body });
  return NextResponse.json({ message: "Ujian berhasil diperbarui" });
}
```

#### `app/api/ujian/[ujianId]/status/route.ts`
```typescript
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
```

---

### 6.7. Laporan Ujian

#### `app/api/ujian/[ujianId]/laporan/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "nama";
  const dir = (searchParams.get("dir") || "asc") as "asc" | "desc";

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: { _count: { select: { soalUjian: true } } },
  });
  if (!ujian) return NextResponse.json({ message: "Ujian tidak ditemukan" }, { status: 404 });

  const sesiWhere: Record<string, unknown> = {
    ujianId: params.ujianId,
    status: { in: ["SELESAI", "TIMEOUT", "DIHENTIKAN"] },
  };

  const kkm = 70;
  if (filter === "lulus") sesiWhere.nilaiAkhir = { gte: kkm };
  if (filter === "gagal") sesiWhere.nilaiAkhir = { lt: kkm };
  if (filter === "viol") sesiWhere.jumlahPelanggaran = { gt: 0 };

  const sortMap: Record<string, string> = {
    nilai: "nilaiAkhir", nama: "namaLengkap",
    benar: "nilaiBenar", salah: "nilaiSalah",
    pelanggaran: "jumlahPelanggaran",
  };

  const sesiList = await prisma.sesiSiswa.findMany({
    where: sesiWhere,
    include: { pelanggaran: { select: { jenis: true } } },
    orderBy: { [sortMap[sort] || "namaLengkap"]: dir },
  });

  const nilaiList = sesiList.map((s) => s.nilaiAkhir);
  const lulus = sesiList.filter((s) => s.nilaiAkhir >= kkm).length;

  return NextResponse.json({
    ujian: {
      id: ujian.id, nama: ujian.nama, durasi: `${ujian.durasi} menit`,
      totalSoal: ujian._count.soalUjian, kelas: ujian.kelas,
    },
    summary: {
      rataRata: nilaiList.length ? Math.round(nilaiList.reduce((a, b) => a + b, 0) / nilaiList.length * 10) / 10 : 0,
      tertinggi: nilaiList.length ? Math.max(...nilaiList) : 0,
      terendah: nilaiList.length ? Math.min(...nilaiList) : 0,
      lulus, gagal: sesiList.length - lulus, totalSiswa: sesiList.length,
    },
    siswa: sesiList.map((s) => ({
      nisn: s.nisn, nama: s.namaLengkap, kelas: s.kelas,
      benar: s.nilaiBenar, salah: s.nilaiSalah,
      nilai: Math.round(s.nilaiAkhir), lulus: s.nilaiAkhir >= kkm,
      pelanggaran: s.jumlahPelanggaran,
      catatan: [...new Set(s.pelanggaran.map((p) => p.jenis))],
    })),
  });
}
```

#### `app/api/ujian/[ujianId]/laporan/siswa/[nisn]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { ujianId: string; nisn: string } }
) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const sesi = await prisma.sesiSiswa.findFirst({
    where: { ujianId: params.ujianId, nisn: params.nisn },
    include: { jawaban: true },
  });
  if (!sesi) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: { soalUjian: { include: { soal: true }, orderBy: { urutan: "asc" } } },
  });

  const kkm = 70;

  const jawaban = ujian!.soalUjian.map((us, idx) => {
    const jwb = sesi.jawaban.find((j) => j.soalId === us.soal.id);
    return {
      nomorSoal: idx + 1,
      pertanyaan: us.soal.pertanyaan,
      jawabanSiswa: jwb?.jawabanDipilih ?? null,
      jawabanBenar: us.soal.jawabanBenar,
      isBenar: jwb?.isBenar ?? false,
      isRagu: jwb?.isRagu ?? false,
    };
  });

  return NextResponse.json({
    siswa: {
      nisn: sesi.nisn, nama: sesi.namaLengkap, kelas: sesi.kelas,
      nilai: Math.round(sesi.nilaiAkhir),
      benar: sesi.nilaiBenar, salah: sesi.nilaiSalah,
      lulus: sesi.nilaiAkhir >= kkm,
      pelanggaran: sesi.jumlahPelanggaran,
    },
    jawaban,
  });
}
```

---

### 6.8. Konfigurasi Nilai

#### `app/api/mata-pelajaran/[mapelId]/konfig-nilai/route.ts`
```typescript
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
```

---

### 6.9. Siswa — Akses Ujian (Tanpa Auth)

#### `app/api/siswa/ujian/[ujianId]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { ujianId: string } }) {
  const ujian = await prisma.ujian.findUnique({
    where: { id: params.ujianId },
    include: { user: { select: { namaSekolah: true } } },
  });

  if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
    return NextResponse.json({ message: "Ujian tidak ditemukan atau tidak aktif" }, { status: 404 });
  }

  return NextResponse.json({
    id: ujian.id, nama: ujian.nama, kelas: ujian.kelas,
    durasi: ujian.durasi, status: ujian.status,
    namaSekolah: ujian.user.namaSekolah,
  });
}
```

#### `app/api/siswa/akses-ujian/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { nisn, namaLengkap, kelas, token } = await req.json();

  const ujian = await prisma.ujian.findUnique({ where: { token } });
  if (!ujian || !["AKTIF", "BERLANGSUNG"].includes(ujian.status)) {
    return NextResponse.json({ message: "Token tidak valid atau ujian tidak aktif" }, { status: 400 });
  }

  // Cek apakah sudah ada sesi selesai
  const sesiSelesai = await prisma.sesiSiswa.findFirst({
    where: { ujianId: ujian.id, nisn, status: { in: ["SELESAI", "TIMEOUT", "DIHENTIKAN"] } },
  });
  if (sesiSelesai) {
    return NextResponse.json({ message: "Anda sudah mengerjakan ujian ini" }, { status: 400 });
  }

  // Cek apakah ada sesi berlangsung
  let sesi = await prisma.sesiSiswa.findFirst({
    where: { ujianId: ujian.id, nisn, status: "BERLANGSUNG" },
  });

  if (!sesi) {
    sesi = await prisma.sesiSiswa.create({
      data: {
        nisn, namaLengkap, kelas,
        ujianId: ujian.id,
        ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });
  }

  return NextResponse.json({
    sesiId: sesi.id, ujianId: ujian.id, namaUjian: ujian.nama,
    durasi: ujian.durasi,
    mulaiAt: sesi.mulaiAt,
  });
}
```

#### `app/api/siswa/sesi/[sesiId]/soal/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const sesi = await prisma.sesiSiswa.findUnique({
    where: { id: params.sesiId },
    include: { ujian: { include: { soalUjian: { include: { soal: true }, orderBy: { urutan: "asc" } } } } },
  });

  if (!sesi) return NextResponse.json({ message: "Sesi tidak ditemukan" }, { status: 404 });

  // Cek timeout
  const durasi = sesi.ujian.durasi * 60 * 1000;
  const elapsed = Date.now() - sesi.mulaiAt.getTime();
  const sisaWaktu = Math.max(0, Math.floor((durasi - elapsed) / 1000));

  if (sisaWaktu <= 0 && sesi.status === "BERLANGSUNG") {
    await prisma.sesiSiswa.update({
      where: { id: sesi.id },
      data: { status: "TIMEOUT", selesaiAt: new Date() },
    });
    return NextResponse.json({ message: "Waktu ujian habis", timeout: true }, { status: 403 });
  }

  let soalList = sesi.ujian.soalUjian;

  // Acak soal jika diaktifkan
  if (sesi.ujian.acakSoal) {
    soalList = [...soalList].sort(() => Math.random() - 0.5);
  }

  return NextResponse.json({
    soal: soalList.map((us, idx) => ({
      id: us.soal.id,
      nomorUrut: idx + 1,
      pertanyaan: us.soal.pertanyaan,
      tipe: us.soal.tipe,
      topik: us.soal.topik,
      gambarUrl: us.soal.gambarUrl,
      opsiA: us.soal.opsiA,
      opsiB: us.soal.opsiB,
      opsiC: us.soal.opsiC,
      opsiD: us.soal.opsiD,
      // TIDAK mengembalikan jawabanBenar dan pembahasan!
    })),
    sisaWaktu,
  });
}
```

#### `app/api/siswa/sesi/[sesiId]/jawab/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { soalId, jawaban, isRagu } = await req.json();

  const soal = await prisma.soal.findUnique({ where: { id: soalId } });
  if (!soal) return NextResponse.json({ message: "Soal tidak ditemukan" }, { status: 404 });

  const isBenar = soal.tipe === "PILIHAN_GANDA"
    ? soal.jawabanBenar === jawaban
    : false; // Essay dinilai manual

  await prisma.jawabanSiswa.upsert({
    where: { sesiId_soalId: { sesiId: params.sesiId, soalId } },
    update: { jawabanDipilih: jawaban, isBenar, isRagu: isRagu ?? false, waktuDijawab: new Date() },
    create: { sesiId: params.sesiId, soalId, jawabanDipilih: jawaban, isBenar, isRagu: isRagu ?? false },
  });

  return NextResponse.json({ message: "Jawaban disimpan" });
}
```

#### `app/api/siswa/sesi/[sesiId]/pelanggaran/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BATAS_PELANGGARAN = 3;

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { jenis, catatan } = await req.json();

  await prisma.pelanggaranSiswa.create({
    data: { sesiId: params.sesiId, jenis, catatan },
  });

  const sesi = await prisma.sesiSiswa.update({
    where: { id: params.sesiId },
    data: { jumlahPelanggaran: { increment: 1 } },
  });

  const dihentikan = sesi.jumlahPelanggaran >= BATAS_PELANGGARAN;

  if (dihentikan && sesi.status === "BERLANGSUNG") {
    await prisma.sesiSiswa.update({
      where: { id: params.sesiId },
      data: { status: "DIHENTIKAN", selesaiAt: new Date() },
    });
  }

  return NextResponse.json({ jumlahPelanggaran: sesi.jumlahPelanggaran, dihentikan });
}
```

#### `app/api/siswa/sesi/[sesiId]/selesai/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { sesiId: string } }) {
  const { alasan } = await req.json();

  const sesi = await prisma.sesiSiswa.findUnique({
    where: { id: params.sesiId },
    include: {
      jawaban: true,
      ujian: { include: { soalUjian: { include: { soal: true } } } },
    },
  });

  if (!sesi) return NextResponse.json({ message: "Sesi tidak ditemukan" }, { status: 404 });

  const totalSoal = sesi.ujian.soalUjian.length;
  const pgSoal = sesi.ujian.soalUjian.filter((us) => us.soal.tipe === "PILIHAN_GANDA");
  const benar = sesi.jawaban.filter((j) => j.isBenar).length;
  const salah = pgSoal.length - benar;
  const nilaiAkhir = pgSoal.length > 0 ? (benar / pgSoal.length) * 100 : 0;

  // Ambil KKM dari konfigurasi
  const konfig = await prisma.konfigNilai.findUnique({
    where: { mataPelajaranId: sesi.ujian.mataPelajaranId },
  });
  const kkm = konfig?.kkm ?? 70;

  const status = alasan === "TIMEOUT" ? "TIMEOUT"
    : alasan === "DIHENTIKAN" ? "DIHENTIKAN" : "SELESAI";

  await prisma.sesiSiswa.update({
    where: { id: params.sesiId },
    data: { status, selesaiAt: new Date(), nilaiBenar: benar, nilaiSalah: salah, nilaiAkhir },
  });

  return NextResponse.json({
    nilaiBenar: benar, nilaiSalah: salah,
    nilaiAkhir: Math.round(nilaiAkhir * 10) / 10,
    totalSoal, lulus: nilaiAkhir >= kkm, kkm,
  });
}
```

---

### 6.10. Profil

#### `app/api/profil/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: {
      id: true, name: true, email: true, role: true, nip: true,
      namaSekolah: true, isActive: true, avatarUrl: true,
      lastLoginAt: true, createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { name, avatarUrl, oldPassword, newPassword } = await req.json();
  const updateData: Record<string, unknown> = {};

  if (name) updateData.name = name;
  if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

  if (oldPassword && newPassword) {
    const user = await prisma.user.findUnique({ where: { id: auth.user.id } });
    const match = await bcrypt.compare(oldPassword, user!.password);
    if (!match) {
      return NextResponse.json({ message: "Password lama tidak sesuai" }, { status: 400 });
    }
    updateData.password = await bcrypt.hash(newPassword, 12);
  }

  await prisma.user.update({ where: { id: auth.user.id }, data: updateData });
  return NextResponse.json({ message: "Profil berhasil diperbarui" });
}
```

---

## 7. SEED DATA

### `prisma/seed.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── USERS ───────────────────────────────────────────
  const password = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@examhub.id" },
      update: {},
      create: {
        name: "Rizal Hakim",
        email: "admin@examhub.id",
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
        opsiA: "5", opsiB: "7", opsiC: "9", opsiD: "11",
        jawabanBenar: "A",
        pembahasan: "Substitusi langsung x=2: 4+6-5=5",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Diketahui fungsi f(x) = 2x² + 3x − 5. Tentukan nilai f(3).",
        tipe: "PILIHAN_GANDA", topik: "Fungsi Kuadrat",
        opsiA: "22", opsiB: "18", opsiC: "16", opsiD: "28",
        jawabanBenar: "A",
        pembahasan: "f(3) = 2(9) + 9 − 5 = 22",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Hitung integral ∫(3x²+2x) dx",
        tipe: "PILIHAN_GANDA", topik: "Integral",
        opsiA: "x³+x²+C", opsiB: "3x³+2x²+C", opsiC: "x³+x²", opsiD: "6x+2+C",
        jawabanBenar: "A",
        pembahasan: "Integral dari 3x² adalah x³, dari 2x adalah x², tambah konstanta C",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Jelaskan konsep turunan dan aplikasinya dalam kehidupan sehari-hari.",
        tipe: "ESSAY", topik: "Turunan",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
    prisma.soal.create({
      data: {
        pertanyaan: "Nilai dari sin(30°) adalah...",
        tipe: "PILIHAN_GANDA", topik: "Trigonometri",
        opsiA: "1/2", opsiB: "√2/2", opsiC: "√3/2", opsiD: "1",
        jawabanBenar: "A",
        mataPelajaranId: matmat.id, userId: budi.id,
      },
    }),
  ]);

  console.log(`✅ ${soalMatmat.length} soal created`);

  // ─── UJIAN ────────────────────────────────────────────
  const ujianUAS = await prisma.ujian.create({
    data: {
      nama: "UAS Matematika Peminatan",
      tipe: "UJIAN", status: "BERLANGSUNG",
      token: "MAT-7X2K-9PQR",
      durasi: 90, kelas: "XII IPA 1",
      tanggalMulai: new Date("2026-04-22T08:00:00Z"),
      tanggalSelesai: new Date("2026-04-22T09:30:00Z"),
      mataPelajaranId: matmat.id, userId: budi.id,
      soalUjian: {
        create: soalMatmat.map((s, idx) => ({ soalId: s.id, urutan: idx + 1 })),
      },
    },
  });

  const ujianUTS = await prisma.ujian.create({
    data: {
      nama: "UTS Fungsi Komposisi",
      tipe: "UJIAN", status: "SELESAI",
      token: "MAT-4A1B-7CDE",
      durasi: 60, kelas: "XII IPA 1",
      tanggalMulai: new Date("2026-03-10T08:00:00Z"),
      mataPelajaranId: matmat.id, userId: budi.id,
      soalUjian: {
        create: soalMatmat.slice(0, 3).map((s, idx) => ({ soalId: s.id, urutan: idx + 1 })),
      },
    },
  });

  const ujianUH = await prisma.ujian.create({
    data: {
      nama: "UH Trigonometri",
      tipe: "ULANGAN", status: "AKTIF",
      token: "MAT-3B5C-1FGH",
      durasi: 45, kelas: "XII IPA 1",
      mataPelajaranId: matmat.id, userId: budi.id,
      soalUjian: {
        create: [soalMatmat[4]].map((s, idx) => ({ soalId: s.id, urutan: idx + 1 })),
      },
    },
  });

  console.log(`✅ 3 ujian created`);

  // ─── SESI SISWA (Contoh Data Ujian Selesai) ───────────
  const siswaData = [
    { nisn: "0051234001", nama: "Adi Nugroho",     benar: 4, salah: 1 },
    { nisn: "0051234002", nama: "Bella Rahmawati", benar: 2, salah: 3 },
    { nisn: "0051234003", nama: "Candra Wijaya",   benar: 3, salah: 2 },
    { nisn: "0051234004", nama: "Dewi Anggraeni",  benar: 5, salah: 0 },
    { nisn: "0051234005", nama: "Eko Prasetyo",    benar: 1, salah: 4 },
  ];

  for (const s of siswaData) {
    const nilaiAkhir = (s.benar / soalMatmat.length) * 100;
    await prisma.sesiSiswa.create({
      data: {
        nisn: s.nisn, namaLengkap: s.nama, kelas: "XII IPA 1",
        ujianId: ujianUTS.id, status: "SELESAI",
        nilaiBenar: s.benar, nilaiSalah: s.salah, nilaiAkhir,
        mulaiAt: new Date("2026-03-10T08:05:00Z"),
        selesaiAt: new Date("2026-03-10T09:00:00Z"),
      },
    });
  }

  console.log(`✅ ${siswaData.length} sesi siswa created`);

  // ─── KONFIG NILAI ─────────────────────────────────────
  await prisma.konfigNilai.create({
    data: {
      bobotUjian: 40, bobotUlangan: 25, bobotLatihan: 20, bobotKuis: 15, kkm: 70,
      subBobotUjian: [
        { ujianId: ujianUAS.id, nama: "UAS Matematika Peminatan", bobot: 60 },
        { ujianId: ujianUTS.id, nama: "UTS Fungsi Komposisi", bobot: 40 },
      ],
      mataPelajaranId: matmat.id, userId: budi.id,
    },
  });

  console.log("✅ Konfig nilai created");
  console.log("\n🎉 Seeding selesai!");
  console.log("─────────────────────────────");
  console.log("Login credentials:");
  console.log("  Admin : admin@examhub.id / password123");
  console.log("  Guru  : budi.santosa@smansatu.sch.id / password123");
  console.log("  Token : MAT-7X2K-9PQR (ujian berlangsung)");
  console.log("          MAT-3B5C-1FGH (ujian aktif)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
```

---

## 8. PERINTAH SETUP

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit DATABASE_URL, JWT_SECRET

# 3. Generate Prisma client
npx prisma generate

# 4. Jalankan migrasi database
npx prisma migrate dev --name init

# 5. Jalankan seed data
npm run db:seed

# 6. Jalankan development server
npm run dev

# Opsional: buka Prisma Studio
npm run db:studio
```

---

## 9. BUSINESS RULES (Implementasi)

| Rule | Implementasi |
|------|-------------|
| Token ujian unik | Generate dengan `generateTokenUjian()`, loop jika collision |
| Siswa hanya 1 sesi aktif per ujian | Cek di `POST /akses-ujian` |
| Jawaban tanpa kunci | `GET /sesi/:id/soal` tidak return `jawabanBenar` |
| Timeout otomatis | Dicek di `GET /sesi/:id/soal` berdasarkan `mulaiAt + durasi` |
| Pelanggaran ≥ 3 → dihentikan | Dicek di `POST /sesi/:id/pelanggaran` |
| Bobot nilai total = 100% | Validasi di `PUT /konfig-nilai` |
| Grade | A ≥ 90, B ≥ 80, C ≥ 70, D < 70 |
| Password hashed | `bcrypt.hash(password, 12)` |
| Ujian hanya edit saat DRAFT | Cek `status === "DRAFT"` di `PUT /ujian/:id` |