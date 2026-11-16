// Edge-safe helpers (used by middleware and server code)
import { SignJWT, jwtVerify } from 'jose';

export const COOKIE = 'ham_session';

function key() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) throw new Error('AUTH_SECRET must be set (16+ chars)');
  return new TextEncoder().encode(s);
}

export async function signSession(user) {
  return new SignJWT({ uid: user.id, adm: !!user.is_admin })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('180d')
    .sign(key());
}

export async function readSession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return payload;
  } catch {
    return null;
  }
}
