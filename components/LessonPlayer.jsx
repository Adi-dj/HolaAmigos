'use client';
import { useEffect, useRef, useState } from 'react';
import Mixed from './Mixed';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { buildSteps, isExercise, starsFor } from '@/lib/exercises';
import { speak, sfx, stopSpeaking } from '@/lib/speech';
import * as X from './Exercises';

const PRAISE = [['¡Muy bien!', 'כל הכבוד!'], ['¡Genial!', 'גאוני!'], ['¡Fantástico!', 'פנטסטי!'], ['¡Bravo!', 'בראבו!'], ['¡Perfecto!', 'מושלם!'], ['¡Eres un crack!', 'אתה אלוף!']];
const OOPS = [['¡Casi!', 'כמעט!'], ['¡Ánimo!', 'לא נורא, ננסה שוב בהמשך!']];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

function answerText(s) {
  switch (s.kind) {
    case 'listenPick': return s.show === 'he' ? `${s.target.es} = ${s.target.he}` : `${s.target.e} ${s.target.es}`;
    case 'pickWord': case 'type': case 'build': return s.target.es;
    case 'listenLetter': return `${s.target.es} (${s.target.name})`;
    case 'startsWith': return `${s.target.e} ${s.target.es}`;
    case 'fill': return s.quiz.es.replace('___', s.quiz.a);
    case 'question': { const o = s.options.find((x) => x.correct); return `${o.e} ${o.es} (${o.he})`; }
    default: return '';
  }
}

export default function LessonPlayer({ lesson, track, pool, nextLessonId }) {
  const router = useRouter();
  const young = track === 'young';
  const [steps, setSteps] = useState(null);
  const [idx, setIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(null); // {ok, text}
  const [done, setDone] = useState(null); // {stars}
  const requeued = useRef(new Set());
  const exerciseCount = useRef(0);

  // Random exercises are generated only on the client (avoids hydration mismatch).
  useEffect(() => {
    const s = buildSteps(lesson, track, pool);
    exerciseCount.current = s.filter(isExercise).length;
    setSteps(s);
  }, [lesson, track, pool]);

  useEffect(() => () => stopSpeaking(), []);

  if (!steps) return <div className="loading">🦜 טוען…</div>;

  const step = steps[idx];
  const total = steps.length;

  const next = () => {
    setFeedback(null);
    if (idx + 1 >= steps.length) finish();
    else setIdx(idx + 1);
  };

  const onResult = (ok) => {
    if (ok) {
      sfx.good();
      const [es, he] = pick(PRAISE);
      setTimeout(() => speak(es, { rate: 0.95 }), 250);
      setFeedback({ ok: true, title: `${es} ${he}` });
    } else {
      sfx.bad();
      setMistakes((m) => m + 1);
      // Try the same exercise again at the end of the lesson (once).
      if (!requeued.current.has(step.id)) {
        requeued.current.add(step.id);
        setSteps((s) => [...s, { ...step, id: step.id + '-again' }]);
      }
      const [es, he] = pick(OOPS);
      setFeedback({ ok: false, title: `${es} ${he}`, answer: answerText(step) });
    }
  };

  const finish = async () => {
    const stars = starsFor(mistakes, exerciseCount.current);
    setDone({ stars });
    sfx.win();
    setTimeout(() => speak(stars === 3 ? '¡Perfecto! ¡Tres estrellas!' : '¡Muy bien! ¡Lección terminada!'), 500);
    try {
      await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lessonId: lesson.id, stars }) });
    } catch {}
  };

  if (done) {
    return (
      <div className="lesson-wrap">
        <div className="card done-card pop">
          <Confetti />
          <div className="mascot huge">🦜</div>
          <h1>סיימתם את השיעור!</h1>
          <div className="stars-big">
            {[1, 2, 3].map((n) => <span key={n} className={n <= done.stars ? 'star on' : 'star'} style={{ animationDelay: `${n * 0.25}s` }}>⭐</span>)}
          </div>
          <p className="muted">{done.stars === 3 ? <>בלי אף טעות! <bdi dir="ltr">¡Increíble!</bdi></> : done.stars === 2 ? 'כמעט מושלם! עוד קצת תרגול ותגיעו ל-3 כוכבים' : 'כל הכבוד על ההתמדה! אפשר לחזור על השיעור ולאסוף עוד כוכבים'}</p>
          <div className="col-btns">
            {nextLessonId && <button className="btn primary wide" onClick={() => router.push(`/lesson/${nextLessonId}`)}>לשיעור הבא ←</button>}
            <button className="btn ghost wide" onClick={() => router.push('/')}>🗺️ חזרה למפה</button>
            <button className="btn ghost wide" onClick={() => window.location.reload()}>🔁 עוד פעם</button>
          </div>
        </div>
      </div>
    );
  }

  const C = {
    intro: X.IntroCard, introLetter: X.IntroLetter, explain: X.Explain, table: X.Table,
    listenPick: X.ListenPick, pickWord: X.PickWord, listenLetter: X.ListenLetter, startsWith: X.StartsWith,
    fill: X.Fill, question: X.Question, match: X.Match, type: X.TypeIt, build: X.Build,
    speak: X.Speak, karaoke: X.Karaoke, reader: X.Reader,
  }[step.kind];

  return (
    <div className="lesson-wrap">
      <header className="lesson-top">
        <Link href="/" className="close" aria-label="יציאה מהשיעור" onClick={() => stopSpeaking()}>✕</Link>
        <div className="bar"><div className="fill" style={{ width: `${Math.round((idx / total) * 100)}%`, background: lesson.color }} /></div>
        <span className="lesson-title-mini">{lesson.unitEmoji}</span>
      </header>

      <div className={`stage ${feedback ? 'locked' : ''}`}>
        <C key={step.id} {...step} young={young} onNext={next} onDone={next}
          onResult={onResult} onMistake={() => setMistakes((m) => m + 1)} />
      </div>

      {feedback && (
        <div className={`feedback ${feedback.ok ? 'ok' : 'no'}`}>
          <div className="fb-text">
            <b>{feedback.ok ? '✅' : '💡'} <Mixed text={feedback.title} /></b>
            {feedback.answer && <div>התשובה הנכונה: <X.Es className="bold">{feedback.answer}</X.Es></div>}
          </div>
          <button className="btn white" onClick={next} autoFocus>המשך ←</button>
        </div>
      )}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => i);
  const colors = ['#ff5fa2', '#ffb400', '#2bb673', '#4a90e2', '#7c5cff', '#ff8a5b'];
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((i) => (
        <i key={i} style={{ left: `${(i * 97) % 100}%`, background: colors[i % colors.length], animationDelay: `${(i % 10) * 0.12}s`, animationDuration: `${1.8 + (i % 5) * 0.3}s` }} />
      ))}
    </div>
  );
}
