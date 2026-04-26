import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: Request) {
  // For demo purposes, we allow unauthenticated access.
  // In production, use the auth middleware to set x-user-id and fetch the real user.
  const dummyUser = {
    id: 'demo-id',
    name: 'Budi Santosa',
    email: 'admin123@gmail.com',
    role: 'admin',
    avatarUrl: null,
  };
  return NextResponse.json(dummyUser);
}
