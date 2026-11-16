import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { COOKIE, signSession } from '@/lib/session';

const attempts = new Map(); // simple per-instance brute-force brake

export async function POST(req) {
  const { username = '', password = '' } = await req.json().catch(() => ({}));
  const name = String(username).trim().toLowerCase();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const k = `${ip}:${name}`;
  const a = attempts.get(k) || { n: 0, t: 0 };
  if (a.n >= 8 && Date.now() - a.t < 5 * 60_000) {
    return NextResponse.json({ error: 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.' }, { status: 429 });
  }
  const { rows } = await query('SELECT * FROM users WHERE username = $1', [name]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(String(password), user.password_hash))) {
    attempts.set(k, { n: a.n + 1, t: Date.now() });
    return NextResponse.json({ error: 'שם המשתמש או הסיסמה לא נכונים' }, { status: 401 });
  }
  attempts.delete(k);
  const res = NextResponse.json({ ok: true, isAdmin: user.is_admin });
  res.cookies.set(COOKIE, await signSession(user), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
    path: '/', maxAge: 60 * 60 * 24 * 180,
  });
  return res;
}
