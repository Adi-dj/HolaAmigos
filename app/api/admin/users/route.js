import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const { rows } = await query(`
    SELECT u.id, u.username, u.display_name, u.track, u.avatar, u.is_admin, u.streak, u.last_active, u.created_at,
           COUNT(p.lesson_id)::int AS lessons_done, COALESCE(SUM(p.stars),0)::int AS stars
    FROM users u LEFT JOIN progress p ON p.user_id = u.id
    GROUP BY u.id ORDER BY u.is_admin DESC, u.created_at`);
  return NextResponse.json({ users: rows });
}

const AVATARS = ['🦁','🐯','🐼','🐨','🐸','🦊','🐰','🐵','🦄','🐙','🐬','🦉','🐻','🐱','🐶','🦋'];

export async function POST(req) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const b = await req.json().catch(() => ({}));
  const username = String(b.username || '').trim().toLowerCase();
  const password = String(b.password || '');
  const displayName = String(b.displayName || '').trim() || username;
  const track = b.track === 'older' ? 'older' : 'young';
  const avatar = AVATARS.includes(b.avatar) ? b.avatar : AVATARS[0];
  if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
    return NextResponse.json({ error: 'שם משתמש: 3-30 תווים באנגלית, ספרות או . _ -' }, { status: 400 });
  }
  if (password.length < 4) return NextResponse.json({ error: 'הסיסמה צריכה להכיל לפחות 4 תווים' }, { status: 400 });
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await query(
      `INSERT INTO users (username, password_hash, display_name, track, avatar, is_admin)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      [username, hash, displayName.slice(0, 40), track, avatar, !!b.isAdmin]
    );
    return NextResponse.json({ ok: true, id: rows[0].id });
  } catch (e) {
    if (e.code === '23505') return NextResponse.json({ error: 'שם המשתמש כבר קיים' }, { status: 409 });
    throw e;
  }
}
