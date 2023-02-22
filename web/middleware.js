import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request?.nextUrl?.pathname;
  const host = request?.headers.get('host');

  if (path === '/restaurants' && !host.toLowerCase().includes('localhost')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export default middleware;
