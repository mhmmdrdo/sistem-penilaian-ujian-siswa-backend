import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.teacherSubject.deleteMany({ where: { userId, subjectId: params.id } });
  return NextResponse.json({ message: 'Removed' });
}
