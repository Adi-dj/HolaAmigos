import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { lessonById } from '@/lib/curriculum';

// Dates in Spain time, so the daily streak follows the child's day.
function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { lessonId, stars } = await req.json().catch(() => ({}));
  if (!lessonById(lessonId)) return NextResponse.json({ error: 'bad lesson' }, { status: 400 });
  const s = Math.max(1, Math.min(3, Number(stars) || 1));
  await query(
    `INSERT INTO progress (user_id, lesson_id, stars, attempts) VALUES ($1, $2, $3, 1)
     ON CONFLICT (user_id, lesson_id) DO UPDATE
     SET stars = GREATEST(progress.stars, EXCLUDED.stars), attempts = progress.attempts + 1, updated_at = now()`,
    [user.id, lessonId, s]
  );
  const t = today();
  const last = user.last_active ? new Intl.DateTimeFormat('en-CA').format(new Date(user.last_active)) : null;
  if (last !== t) {
    const y = new Date(t + 'T12:00:00Z'); y.setUTCDate(y.getUTCDate() - 1);
    const yesterday = y.toISOString().slice(0, 10);
    const streak = last === yesterday ? user.streak + 1 : 1;
    await query('UPDATE users SET streak = $1, last_active = $2 WHERE id = $3', [streak, t, user.id]);
  }
  return NextResponse.json({ ok: true });
}
