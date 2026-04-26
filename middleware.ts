import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const response = NextResponse.next();
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  // Define public endpoints that bypass auth but still need CORS headers
  const publicPaths = ['/api/profile/me'];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    // Continue processing after CORS headers are applied below
    // (no auth check needed)
    return NextResponse.next();
  }

  // Authentication for protected routes
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // Propagate user info to downstream handlers
    request.headers.set('x-user-id', (payload as any).sub);
    request.headers.set('x-user-role', (payload as any).role);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*'], // protect all API routes
};
