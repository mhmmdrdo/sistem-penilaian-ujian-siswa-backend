import { NextResponse } from 'next/server';

// In a stateless JWT setup, logout is handled client‑side by discarding the token.
// Optionally you could implement a token blacklist.
export async function POST() {
  return NextResponse.json({ message: 'Logged out' });
}
