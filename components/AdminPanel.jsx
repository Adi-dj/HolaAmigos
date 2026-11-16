'use client';
import { useCallback, useEffect, useState } from 'react';

const AVATARS = ['🦁','🐯','🐼','🐨','🐸','🦊','🐰','🐵','🦄','🐙','🐬','🦉','🐻','🐱','🐶','🦋'];
const TRACK = { young: 'קטנים 6-8', older: 'גדולים 9-12' };

async function api(url, method, body) {
  const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'שגיאה');
  return d;
}

export default function AdminPanel({ meId, totals }) {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', displayName: '', track: 'young', avatar: '🦁', isAdmin: false });

  const load = useCallback(async () => {
    try { setUsers((await api('/api/admin/users', 'GET')).users); } catch (e) { setMsg({ err: e.message }); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(null), 3500); };

  const create = async (e) => {
    e.preventDefault();
    try {
      await api('/api/admin/users', 'POST', form);
      flash({ ok: `המשתמש ${form.username} נוצר ✔` });
      setForm({ ...form, username: '', password: '', displayName: '' });
      load();
    } catch (er) { flash({ err: er.message }); }
  };

  const remove = async (u) => {
    if (!confirm(`למחוק את ${u.display_name} (${u.username})? כל ההתקדמות שלו תימחק, ואי אפשר לבטל את הפעולה.`)) return;
    try { await api(`/api/admin/users/${u.id}`, 'DELETE'); flash({ ok: 'המשתמש נמחק' }); load(); } catch (er) { flash({ err: er.message }); }
  };
  const resetPw = async (u) => {
    const p = prompt(`סיסמה חדשה עבור ${u.display_name}:`);
    if (!p) return;
    try { await api(`/api/admin/users/${u.id}`, 'PATCH', { password: p }); flash({ ok: 'הסיסמה עודכנה' }); } catch (er) { flash({ err: er.message }); }
  };
  const setTrack = async (u, track) => {
    try { await api(`/api/admin/users/${u.id}`, 'PATCH', { track }); load(); } catch (er) { flash({ err: er.message }); }
  };
  const resetProgress = async (u) => {
    if (!confirm(`לאפס את כל ההתקדמות של ${u.display_name}?`)) return;
    try { await api(`/api/admin/users/${u.id}`, 'PATCH', { resetProgress: true }); flash({ ok: 'ההתקדמות אופסה' }); load(); } catch (er) { flash({ err: er.message }); }
  };

  return (
    <>
      {msg && <div className={`toast ${msg.err ? 'error' : 'ok'}`}>{msg.err || msg.ok}</div>}

      <section className="card">
        <h2>➕ משתמש חדש</h2>
        <form className="admin-form" onSubmit={create}>
          <label>שם משתמש (באנגלית)<input dir="ltr" autoCapitalize="none" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label>
          <label>סיסמה<input dir="ltr" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={4} /></label>
          <label>שם תצוגה<input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="למשל: נועה" /></label>
          <label>מסלול
            <select value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
              <option value="young">קטנים (6-8): שמע ותמונות</option>
              <option value="older">גדולים (9-12): כולל קריאה, כתיבה ודקדוק</option>
            </select>
          </label>
          <div className="avatars">
            {AVATARS.map((a) => <button type="button" key={a} className={form.avatar === a ? 'on' : ''} onClick={() => setForm({ ...form, avatar: a })}>{a}</button>)}
          </div>
          <label className="check"><input type="checkbox" checked={form.isAdmin} onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })} /> מנהל (יכול לנהל משתמשים)</label>
          <button className="btn primary">יצירת משתמש</button>
        </form>
      </section>

      <section className="card">
        <h2>👥 משתמשים ({users.length})</h2>
        <div className="user-list">
          {users.map((u) => {
            const total = totals[u.track];
            const pct = Math.min(100, Math.round((u.lessons_done / total) * 100));
            return (
              <div key={u.id} className="user-row">
                <span className="avatar">{u.avatar}</span>
                <div className="user-info">
                  <b>{u.display_name}</b> <span className="muted small" dir="ltr">@{u.username}</span>
                  {u.is_admin && <span className="badge">מנהל</span>}
                  <div className="small muted">
                    ⭐ {u.stars} · 🔥 {u.streak} · {u.lessons_done}/{total} שיעורים
                    {u.last_active && <> · פעילות אחרונה: {new Date(u.last_active).toLocaleDateString('he-IL')}</>}
                  </div>
                  <div className="bar"><div className="fill rainbow" style={{ width: `${pct}%` }} /></div>
                </div>
                <div className="user-actions">
                  <select value={u.track} onChange={(e) => setTrack(u, e.target.value)} aria-label="מסלול">
                    <option value="young">{TRACK.young}</option>
                    <option value="older">{TRACK.older}</option>
                  </select>
                  <button className="btn ghost small" onClick={() => resetPw(u)}>🔑 סיסמה</button>
                  <button className="btn ghost small" onClick={() => resetProgress(u)}>↺ איפוס</button>
                  {u.id !== meId && <button className="btn danger small" onClick={() => remove(u)}>🗑️ מחיקה</button>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
