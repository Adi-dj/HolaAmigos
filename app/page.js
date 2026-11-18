import Link from 'next/link';
import Mixed from '@/components/Mixed';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { loadProgress, buildMap } from '@/lib/progress';
import { TRACKS } from '@/lib/curriculum/index.js';
import LogoutButton from '@/components/LogoutButton';
import SpeechSettings from '@/components/SpeechSettings';

export const dynamic = 'force-dynamic';

const TYPE_ICON = { vocab: '🧸', phrases: '💬', letters: '🔤', grammar: '🧩', song: '🎵', story: '📖', explain: '💡' };

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const progress = await loadProgress(user.id);
  const map = buildMap(user.track, progress);
  const pct = map.total ? Math.round((map.done / map.total) * 100) : 0;

  return (
    <main className="home">
      <header className="home-top">
        <div className="hello">
          <span className="avatar">{user.avatar}</span>
          <div>
            <div className="hi"><bdi dir="ltr">¡Hola,</bdi> {user.display_name}!</div>
            <div className="muted small">מסלול {TRACKS[user.track].label}</div>
          </div>
        </div>
        <div className="row">
          <a className="btn ghost small" href="#settings">🔠 הגדרות</a>
          {user.is_admin && <Link className="btn ghost small" href="/admin">⚙️ ניהול</Link>}
          <LogoutButton />
        </div>
      </header>

      <section className="stats card">
        <div className="stat"><span className="stat-n">🔥 {user.streak || 0}</span><span className="muted small">ימים ברצף</span></div>
        <div className="stat"><span className="stat-n">⭐ {map.stars}</span><span className="muted small">כוכבים</span></div>
        <div className="stat"><span className="stat-n">🏅 {map.stickers.length}</span><span className="muted small">מדבקות</span></div>
        <div className="overall">
          <div className="row space small"><b>ההתקדמות שלי</b><span>{map.done} / {map.total} שיעורים · {pct}%</span></div>
          <div className="bar big"><div className="fill rainbow" style={{ width: `${Math.max(pct, 2)}%` }} /></div>
        </div>
        {map.current && <Link href={`/lesson/${map.current}`} className="btn primary wide go">🦜 <bdi dir="ltr">¡Vamos!</bdi> להמשיך ללמוד</Link>}
      </section>

      {map.stickers.length > 0 && (
        <section className="card album">
          <b>אלבום המדבקות שלי</b>
          <div className="stickers">{map.stickers.map((s) => <span key={s.title} title={s.title.replace(/^.*· /, '')} className="sticker">{s.emoji}</span>)}</div>
        </section>
      )}

      {map.levels.map((lv) => (
        <section key={lv.id} className={`level ${lv.unlocked ? '' : 'locked'}`}>
          <div className="level-head">
            <h2>{lv.unlocked ? '' : '🔒 '}<Mixed text={lv.title} /></h2>
            <span className="muted small">{lv.subtitle} · {lv.done}/{lv.total}</span>
            {!lv.unlocked && <span className="small lock-note">נפתח אחרי שמסיימים 60% מהשלב הקודם</span>}
          </div>
          <div className="units">
            {lv.units.map((u) => (
              <div key={u.id} className="unit card" style={{ '--c': u.color }}>
                <div className="unit-head">
                  <span className="unit-emoji">{u.emoji}</span>
                  <div className="unit-title"><b><Mixed text={u.title} /></b><span className="muted small">{u.done}/{u.lessons.length}{u.complete ? ' · 🏅 הושלם!' : ''}</span></div>
                </div>
                <div className="bar"><div className="fill" style={{ width: `${(u.done / u.lessons.length) * 100}%`, background: u.color }} /></div>
                <ol className="lessons">
                  {u.lessons.map((l) => {
                    const inner = (
                      <>
                        <span className="l-icon">{l.unlocked ? TYPE_ICON[l.type] : '🔒'}</span>
                        <span className="l-title"><Mixed text={l.title} /></span>
                        <span className="l-stars">{l.stars ? '⭐'.repeat(l.stars) : ''}</span>
                      </>
                    );
                    return (
                      <li key={l.id}>
                        {l.unlocked
                          ? <Link className={`lesson-link ${map.current === l.id ? 'current' : ''} ${l.stars ? 'done' : ''}`} href={`/lesson/${l.id}`}>{inner}</Link>
                          : <span className="lesson-link disabled">{inner}</span>}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>
      ))}
      <SpeechSettings />
      <footer className="foot muted small">¡Hola Amigos! · שירים וסיפורים מנחלת הכלל</footer>
    </main>
  );
}
