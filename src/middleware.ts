import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './util/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await verifySession();

  if (!token) {
    if (path === '/auth/signin' || path === '/auth/signup') {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl))
  } else {
    if (path === '/auth/signin' || path === '/auth/signup') {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }
  
  return NextResponse.next(); 
}
 
export const config = {
  matcher: [
    '/',
    '/auth/signin',
    '/auth/signup',
  ]
}