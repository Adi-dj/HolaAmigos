import { cookies } from 'next/headers';
import { query } from './db';
import { COOKIE, readSession } from './session';

const FIELDS = 'id, username, display_name, track, avatar, is_admin, streak, last_active';

// Always re-read the user from the DB, so a deleted user loses access immediately.
export async function getCurrentUser() {
  const jar = await cookies();
  const s = await readSession(jar.get(COOKIE)?.value);
  if (!s) return null;
  const { rows } = await query(`SELECT ${FIELDS} FROM users WHERE id = $1`, [s.uid]);
  return rows[0] || null;
}

export async function requireAdmin() {
  const u = await getCurrentUser();
  return u && u.is_admin ? u : null;
}
