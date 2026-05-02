import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a mock middleware since we don't have a real auth provider yet.
// In a real app, you would verify the session token (e.g., via Supabase Auth or NextAuth)
// and check the user's role and regionId.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('mock_role')?.value;

  // Example: Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'STATE_ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Example: Protect /region routes
  if (pathname.startsWith('/region')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'REGIONAL_CHAIR' && role !== 'STATE_ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Example: Protect /coach routes
  if (pathname.startsWith('/coach')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'COACH' && role !== 'REGIONAL_CHAIR' && role !== 'STATE_ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Example: Protect /student routes
  if (pathname.startsWith('/student')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'STUDENT' && role !== 'COACH' && role !== 'STATE_ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/region/:path*', '/coach/:path*', '/student/:path*'],
};
