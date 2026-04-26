import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email already used' }, { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  return NextResponse.json({ accessToken, refreshToken });
}
