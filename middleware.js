import { NextResponse } from 'next/server';
import { COOKIE, readSession } from './lib/session';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const s = await readSession(req.cookies.get(COOKIE)?.value);
  if (!s) {
    if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if ((pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) && !s.adm) {
    if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api/login|_next|icons|manifest.webmanifest|favicon.ico|apple-touch-icon.png).*)'],
};
