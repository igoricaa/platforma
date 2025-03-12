import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/pricing',
    '/contact',
    '/sign-in',
    '/sign-up',
    '/api/auth',
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('better-auth.session_token');

  // If no session cookie and not a public route, redirect to sign-in
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow access to authenticated routes
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring _next, assets, favicon.ico, etc.
  matcher: ['/((?!_next|.*\\..*).*)'],
}; 