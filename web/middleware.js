import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request?.nextUrl?.pathname;
  const host = request?.headers.get('host');

  const isLocalhost = host.toLowerCase().includes('localhost');

  if ((path === '/create-restaurants' && !isLocalhost) || (path === '/update-restaurants' && !isLocalhost)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export default middleware;
