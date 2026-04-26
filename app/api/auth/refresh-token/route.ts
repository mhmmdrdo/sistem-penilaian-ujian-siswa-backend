import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { refreshToken } = await request.json();
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { sub: string };
    const newAccess = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return NextResponse.json({ accessToken: newAccess });
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}
