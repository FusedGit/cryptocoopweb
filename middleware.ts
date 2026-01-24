import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/investors/:path*',
};

export function middleware(request: NextRequest) {
  // Allow access to login page
  if (request.nextUrl.pathname === '/investors/login') {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('investors_auth');
  const authToken = process.env.INVESTORS_AUTH_TOKEN || 'authenticated';
  
  if (authCookie?.value === authToken) {
    return NextResponse.next();
  }

  // Redirect to login
  return NextResponse.redirect(new URL('/investors/login', request.url));
}
