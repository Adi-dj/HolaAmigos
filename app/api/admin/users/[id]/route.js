import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(_req, { params }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const id = Number((await params).id);
  if (id === admin.id) return NextResponse.json({ error: 'אי אפשר למחוק את המשתמש שמחובר עכשיו' }, { status: 400 });
  await query('DELETE FROM users WHERE id = $1', [id]);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const id = Number((await params).id);
  const b = await req.json().catch(() => ({}));
  if (b.password !== undefined) {
    if (String(b.password).length < 4) return NextResponse.json({ error: 'הסיסמה צריכה להכיל לפחות 4 תווים' }, { status: 400 });
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [await bcrypt.hash(String(b.password), 10), id]);
  }
  if (b.track === 'young' || b.track === 'older') await query('UPDATE users SET track = $1 WHERE id = $2', [b.track, id]);
  if (b.resetProgress) await query('DELETE FROM progress WHERE user_id = $1', [id]);
  return NextResponse.json({ ok: true });
}
