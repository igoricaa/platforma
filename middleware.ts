import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();

  // const sessionCookie = getSessionCookie(request, {
  //   // Optionally pass config if cookie name, prefix or useSecureCookies option is customized in auth config.
  //   // cookieName: 'session_token',
  //   // cookiePrefix: 'better-auth',
  //   // useSecureCookies: true,
  // });

  // if (!sessionCookie) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

// const publicRoutes = [
//   '/',
//   '/pricing',
//   '/contact',
//   '/sign-in',
//   '/sign-up',
//   '/api/auth',
// ];

// const isPublicRoute = publicRoutes.some(
//   (route) =>
//     request.nextUrl.pathname === route ||
//     request.nextUrl.pathname.startsWith(`${route}/`)
// );

// if (isPublicRoute) {
//   return NextResponse.next();
// }
