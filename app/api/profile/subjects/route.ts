import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const subjects = await prisma.teacherSubject.findMany({
    where: { userId },
    include: { subject: true },
  });
  return NextResponse.json(subjects.map(ts => ts.subject));
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { subjectId } = await request.json();
  const existing = await prisma.teacherSubject.findUnique({ where: { userId_subjectId: { userId, subjectId } } });
  if (existing) return NextResponse.json({ error: 'Already added' }, { status: 400 });
  const ts = await prisma.teacherSubject.create({ data: { userId, subjectId } });
  return NextResponse.json(ts);
}
