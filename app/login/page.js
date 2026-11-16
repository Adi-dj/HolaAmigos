'use client';
import { useState } from 'react';

export default function Login() {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) window.location.href = '/';
    else setErr(d.error || 'שגיאה בהתחברות');
  };

  return (
    <main className="login">
      <div className="login-hero">
        <div className="mascot huge bob">🦜</div>
        <h1>¡Hola Amigos!</h1>
        <p>לומדים ספרדית בכיף 🇪🇸</p>
      </div>
      <form className="card login-card" onSubmit={submit}>
        <label>שם משתמש
          <input dir="ltr" autoCapitalize="none" autoCorrect="off" autoComplete="username" value={username} onChange={(e) => setU(e.target.value)} required />
        </label>
        <label>סיסמה
          <div className="pw">
            <input dir="ltr" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setP(e.target.value)} required />
            <button type="button" className="eye" onClick={() => setShow((s) => !s)} aria-label="הצגת הסיסמה">{show ? '🙈' : '👁️'}</button>
          </div>
        </label>
        {err && <div className="error">{err}</div>}
        <button className="btn primary wide" disabled={busy}>{busy ? '...' : '¡Entrar! כניסה'}</button>
      </form>
      <p className="muted small center-text">אין לכם משתמש? בקשו מההורים או מהמנהל ליצור לכם אחד.</p>
    </main>
  );
}
