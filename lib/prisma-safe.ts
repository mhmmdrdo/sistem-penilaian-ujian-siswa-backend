import { prisma } from "@/prisma/client";
import { PrismaClient } from "@prisma/client";

// Wrapper yang otomatis retry jika koneksi terputus (P1017)
export async function safeQuery<T>(
  fn: (client: PrismaClient) => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Cek koneksi sebelum query
      await prisma.$queryRaw`SELECT 1`;
      return await fn(prisma);
    } catch (error: any) {
      lastError = error;

      const isConnectionError =
        error?.code === "P1017" ||
        error?.code === "P1001" ||
        error?.message?.includes("Server has closed the connection") ||
        error?.message?.includes("Connection refused");

      if (isConnectionError && attempt < maxRetries) {
        console.warn(`[Prisma] Koneksi terputus, retry ${attempt}/${maxRetries}...`);
        // Tunggu sebentar sebelum retry
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        // Reconnect
        try {
          await prisma.$disconnect();
          await prisma.$connect();
        } catch (_) {
          // Abaikan error disconnect/connect, biarkan retry handle
        }
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}