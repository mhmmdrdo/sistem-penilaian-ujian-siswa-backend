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
