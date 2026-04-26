import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  return NextResponse.json({ accessToken, refreshToken });
}
