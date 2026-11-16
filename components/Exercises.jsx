'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Mixed from './Mixed';
import { speak, stopSpeaking, listen, cancelListening, speechMode, rememberSpeechMode, startRecording, playUrl, sfx } from '@/lib/speech';
import { typedMatches, spokenMatches, norm } from '@/lib/text';
import { shuffle } from '@/lib/exercises';

export function Es({ children, className = '' }) {
  return <span lang="es" dir="ltr" className={`es ${className}`}>{children}</span>;
}

export function SoundButton({ text, rate, big, label, lang = 'es-ES' }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`sound-btn ${big ? 'big' : ''} ${playing ? 'playing' : ''}`}
      aria-label={label || 'השמעה'}
      onClick={async (e) => { e.stopPropagation(); setPlaying(true); await speak(text, { rate, lang }); setPlaying(false); }}
    >{rate && rate < 0.7 ? '🐢' : '🔊'}</button>
  );
}

// Speak once on mount (after a short delay so iOS treats it as following the last tap).
function useAutoSpeak(seq, deps) {
  useEffect(() => {
    let alive = true;
    const t = setTimeout(async () => {
      for (const [text, opts] of seq) { if (!alive) return; await speak(text, opts); }
    }, 250);
    return () => { alive = false; clearTimeout(t); stopSpeaking(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function Prompt({ he, young }) {
  return (
    <div className="prompt">
      <span><Mixed text={he} /></span>
      {young && <SoundButton text={he} lang="he-IL" rate={1} label="הקראת ההוראה" />}
    </div>
  );
}

const rate = (young) => (young ? 0.75 : 0.85);

// ---------- Learning cards ----------
export function IntroCard({ item, young, onNext }) {
  useAutoSpeak([[item.es, { rate: rate(young) }]], [item.es]);
  return (
    <div className="card intro-card pop">
      <div className="new-word">מילה חדשה ✨</div>
      <button className="big-emoji" onClick={() => speak(item.es, { rate: rate(young) })}>{item.e}</button>
      <div className="intro-es" onClick={() => speak(item.es, { rate: rate(young) })}><Es>{item.es}</Es></div>
      <div className="intro-he"><Mixed text={item.he} /></div>
      <div className="row center">
        <SoundButton text={item.es} rate={rate(young)} big />
        <SoundButton text={item.es} rate={0.5} big label="השמעה איטית" />
      </div>
      <button className="btn primary wide" onClick={onNext}>הבנתי! ←</button>
    </div>
  );
}

export function IntroLetter({ item, young, onNext }) {
  useAutoSpeak([[item.name, { rate: 0.7 }], [item.ex, { rate: rate(young) }]], [item.es]);
  return (
    <div className="card intro-card pop">
      <div className="new-word">אות חדשה ✨</div>
      <button className="big-letter" onClick={() => speak(item.name, { rate: 0.7 })} dir="ltr">
        {item.es}<small>{item.es.toLowerCase()}</small>
      </button>
      <div className="intro-he">שם האות: <Es className="bold">{item.name}</Es></div>
      <button className="example" onClick={() => speak(item.ex, { rate: rate(young) })}>
        <span className="emoji-md">{item.e}</span>
        <Es><b className="first-letter">{item.ex[0]}</b>{item.ex.slice(1)}</Es>
        <span className="muted">({item.he})</span>
      </button>
      <button className="btn primary wide" onClick={onNext}>הבנתי! ←</button>
    </div>
  );
}

export function Explain({ title, paragraphs, onNext }) {
  return (
    <div className="card explain-card pop">
      <div className="mascot-line"><span className="mascot">🦜</span><b>לולה מסבירה: <Mixed text={title} /></b></div>
      {paragraphs.map((p, i) => <p key={i}><Mixed text={p} /></p>)}
      <button className="btn primary wide" onClick={onNext}>יאללה, מתרגלים! ←</button>
    </div>
  );
}

export function Table({ table, onNext }) {
  return (
    <div className="card pop">
      <h2 className="center-text"><Es>{table.title}</Es></h2>
      <p className="muted center-text">לחצו על שורה כדי לשמוע אותה</p>
      <table className="conj">
        <tbody>
          {table.rows.map((r, i) => {
            const heb = /[\u0590-\u05FF]/.test(r[1]); // e.g. "el perro | הכלב | זכר"
            const say = heb ? r[0] : `${r[0].split(' / ')[0]} ${r[1]}`;
            return (
              <tr key={i} onClick={() => speak(say, { rate: 0.8 })}>
                <td><Es>{r[0]}</Es></td>
                <td className={heb ? '' : 'form'}>{heb ? r[1] : <Es>{r[1]}</Es>}</td>
                <td className="muted">{r[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn primary wide" onClick={onNext}>הבנתי! ←</button>
    </div>
  );
}

// ---------- Choice exercises ----------
function useChoice(onResult) {
  const [picked, setPicked] = useState(null);
  const choose = (opt, correct) => {
    if (picked !== null) return;
    setPicked(opt);
    onResult(correct);
  };
  return [picked, choose];
}

export function ListenPick({ target, options, show, young, onResult }) {
  const [picked, choose] = useChoice(onResult);
  useAutoSpeak([[target.es, { rate: rate(young) }]], [target.es]);
  return (
    <div className="card pop">
      <Prompt he={show === 'he' ? 'מה שמעתם? בחרו את התרגום' : 'מה שמעתם? בחרו את התמונה'} young={young} />
      <div className="row center listen-row">
        <SoundButton text={target.es} rate={rate(young)} big />
        <SoundButton text={target.es} rate={0.5} big label="השמעה איטית" />
      </div>
      <div className={`grid ${show === 'he' ? 'grid-text' : ''}`}>
        {options.map((o) => (
          <button key={o.es}
            className={`tile ${picked && o.es === target.es ? 'right' : ''} ${picked === o && o.es !== target.es ? 'wrong' : ''}`}
            onClick={() => choose(o, o.es === target.es)}>
            {show === 'he' ? <><span className="emoji-sm">{o.e}</span><span>{o.he}</span></> : <span className="emoji-lg">{o.e}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PickWord({ target, options, young, onResult }) {
  const [picked, choose] = useChoice(onResult);
  return (
    <div className="card pop">
      <Prompt he="איך אומרים בספרדית?" young={young} />
      <div className="show-word"><span className="emoji-xl">{target.e}</span><b>{target.he}</b></div>
      <div className="grid grid-text">
        {options.map((o) => (
          <button key={o.es}
            className={`tile ${picked && o.es === target.es ? 'right' : ''} ${picked === o && o.es !== target.es ? 'wrong' : ''}`}
            onClick={() => { speak(o.es, { rate: 0.85 }); choose(o, o.es === target.es); }}>
            <Es>{o.es}</Es>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ListenLetter({ target, options, young, onResult }) {
  const [picked, choose] = useChoice(onResult);
  useAutoSpeak([[target.name, { rate: 0.7 }]], [target.es]);
  return (
    <div className="card pop">
      <Prompt he="איזו אות שמעתם?" young={young} />
      <div className="row center listen-row"><SoundButton text={target.name} rate={0.7} big /></div>
      <div className="grid">
        {options.map((o) => (
          <button key={o.es} dir="ltr"
            className={`tile letter-tile ${picked && o.es === target.es ? 'right' : ''} ${picked === o && o.es !== target.es ? 'wrong' : ''}`}
            onClick={() => choose(o, o.es === target.es)}>{o.es}</button>
        ))}
      </div>
    </div>
  );
}

export function StartsWith({ target, options, young, onResult }) {
  const [picked, choose] = useChoice(onResult);
  return (
    <div className="card pop">
      <Prompt he={`איזו מילה מתחילה באות ${target.letter}?`} young={young} />
      <div className="big-letter small" dir="ltr">{target.letter}</div>
      <div className="grid">
        {options.map((o) => (
          <button key={o.es}
            className={`tile ${picked && o.es === target.es ? 'right' : ''} ${picked === o && o.es !== target.es ? 'wrong' : ''}`}
            onClick={() => { speak(o.es); choose(o, o.es === target.es); }}>
            <span className="emoji-lg">{o.e}</span>
            {!young && <Es className="tiny">{o.es}</Es>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Fill({ quiz, options, song, young, onResult }) {
  const [picked, choose] = useChoice((ok) => {
    speak(quiz.es.replace('___', quiz.a), { rate: 0.85 });
    onResult(ok);
  });
  const [before, after] = quiz.es.split('___');
  return (
    <div className="card pop">
      <Prompt he={song ? 'איזו מילה חסרה בשיר?' : 'השלימו את המשפט'} young={young} />
      <div className="sentence" dir="ltr" lang="es">
        {before}<span className={`blank ${picked ? (picked === quiz.a ? 'right' : 'wrong') : ''}`}>{picked ? quiz.a : '?'}</span>{after}
      </div>
      <div className="translation"><Mixed text={quiz.he} /></div>
      <div className="grid grid-text">
        {options.map((o) => (
          <button key={o}
            className={`tile ${picked && o === quiz.a ? 'right' : ''} ${picked === o && o !== quiz.a ? 'wrong' : ''}`}
            onClick={() => choose(o, o === quiz.a)}><Es>{o}</Es></button>
        ))}
      </div>
    </div>
  );
}

export function Question({ q, options, young, onResult }) {
  const [picked, choose] = useChoice(onResult);
  const [showHe, setShowHe] = useState(young);
  useAutoSpeak([young ? [q.he, { lang: 'he-IL', rate: 1 }] : [q.es, { rate: 0.85 }]], [q.he]);
  return (
    <div className="card pop">
      <div className="mascot-line"><span className="mascot">🦜</span><b>שאלה על הסיפור</b></div>
      {young ? <Prompt he={q.he} young /> : (
        <div className="question">
          <div className="sentence" dir="ltr" lang="es">{q.es} <SoundButton text={q.es} /></div>
          {showHe ? <div className="translation">{q.he}</div>
            : <button className="link" onClick={() => setShowHe(true)}>הצג תרגום</button>}
        </div>
      )}
      <div className="grid grid-text">
        {options.map((o, i) => (
          <button key={i}
            className={`tile ${picked && o.correct ? 'right' : ''} ${picked === o && !o.correct ? 'wrong' : ''}`}
            onClick={() => { if (!young) speak(o.es); choose(o, o.correct); }}>
            <span className="emoji-sm">{o.e}</span>{young ? <span>{o.he}</span> : <Es>{o.es}</Es>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Match pairs ----------
export function Match({ pairs, right, young, onResult, onMistake }) {
  const left = useMemo(() => shuffle(pairs), [pairs]);
  const rightCol = useMemo(() => shuffle(pairs), [pairs]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState([]);
  const [bad, setBad] = useState(null);
  const finished = useRef(false);

  const pickRight = (p) => {
    if (!sel || done.includes(p.es)) return;
    if (sel.es === p.es) {
      sfx.tap();
      const next = [...done, p.es];
      setDone(next); setSel(null);
      if (next.length === pairs.length && !finished.current) { finished.current = true; setTimeout(() => onResult(true), 400); }
    } else {
      sfx.bad(); onMistake(); setBad(p.es);
      setTimeout(() => { setBad(null); setSel(null); }, 600);
    }
  };
  return (
    <div className="card pop">
      <Prompt he="חברו כל מילה לזוג שלה" young={young} />
      <div className="match">
        <div className="col">
          {left.map((p) => (
            <button key={p.es} disabled={done.includes(p.es)}
              className={`tile slim ${sel?.es === p.es ? 'selected' : ''} ${done.includes(p.es) ? 'right faded' : ''}`}
              onClick={() => { setSel(p); speak(p.es, { rate: rate(young) }); }}>
              {young ? <span>🔊</span> : null}<Es>{p.es}</Es>
            </button>
          ))}
        </div>
        <div className="col">
          {rightCol.map((p) => (
            <button key={p.es} disabled={done.includes(p.es)}
              className={`tile slim ${done.includes(p.es) ? 'right faded' : ''} ${bad === p.es ? 'wrong' : ''}`}
              onClick={() => pickRight(p)}>
              {right === 'he' ? <span>{p.he}</span> : <span className="emoji-md">{p.e}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Typing ----------
const SPECIAL = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
export function TypeIt({ target, onResult }) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(false);
  const ref = useRef(null);
  const check = () => {
    if (checked || !val.trim()) return;
    setChecked(true);
    speak(target.es);
    onResult(typedMatches(val, target.es));
  };
  return (
    <div className="card pop">
      <Prompt he="כתבו בספרדית" />
      <div className="show-word"><span className="emoji-xl">{target.e}</span><b>{target.he}</b></div>
      <input ref={ref} className="type-input" dir="ltr" lang="es" autoCapitalize="none" autoCorrect="off" spellCheck={false}
        value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()}
        placeholder="...escribe aquí" disabled={checked} />
      <div className="special-keys" dir="ltr">
        {SPECIAL.map((c) => <button key={c} type="button" onClick={() => { setVal((v) => v + c); ref.current?.focus(); }}>{c}</button>)}
      </div>
      <p className="muted small">לא חייבים לכתוב el/la, וגם אם שכחתם סימן ניקוד (á) התשובה תתקבל.</p>
      <button className="btn primary wide" disabled={!val.trim() || checked} onClick={check}>בדיקה</button>
    </div>
  );
}

// ---------- Build a sentence from tiles ----------
export function Build({ target, extra, onResult }) {
  const tiles = useMemo(() => shuffle([...target.es.split(' '), ...(extra || [])].map((w, i) => ({ w, i }))), [target.es, extra]);
  const [chosen, setChosen] = useState([]);
  const [checked, setChecked] = useState(false);
  const check = () => {
    setChecked(true);
    const ok = norm(chosen.map((t) => t.w).join(' ')) === norm(target.es);
    speak(target.es);
    onResult(ok);
  };
  return (
    <div className="card pop">
      <Prompt he="בנו את המשפט בספרדית" />
      <div className="show-word"><span className="emoji-md">{target.e}</span><b>{target.he}</b></div>
      <div className="build-line" dir="ltr">
        {chosen.map((t) => (
          <button key={t.i} className="chip" disabled={checked} onClick={() => setChosen((c) => c.filter((x) => x !== t))}><Es>{t.w}</Es></button>
        ))}
        {!chosen.length && <span className="muted">לחצו על המילים למטה</span>}
      </div>
      <div className="bank" dir="ltr">
        {tiles.map((t) => (
          <button key={t.i} className="chip" disabled={checked || chosen.includes(t)}
            onClick={() => { speak(t.w, { rate: 0.9 }); setChosen((c) => [...c, t]); }}>
            <Es>{t.w}</Es>
          </button>
        ))}
      </div>
      <button className="btn primary wide" disabled={!chosen.length || checked} onClick={check}>בדיקה</button>
    </div>
  );
}

// ---------- Speaking ----------
// Three modes (see lib/speech.js): live recognition, record & compare, or self-check.
export function Speak({ target, young, onDone }) {
  const [mode, setMode] = useState(null); // decided on the client only
  const [state, setState] = useState('idle'); // idle | listening | ok | retry | silent | recording | recorded
  const [tries, setTries] = useState(0);
  const [heard, setHeard] = useState('');
  const [clip, setClip] = useState(null);
  const recRef = useRef(null);
  const alive = useRef(true);
  useAutoSpeak([[target.es, { rate: rate(young) }]], [target.es]);
  useEffect(() => { setMode(speechMode()); }, []);
  useEffect(() => () => {
    alive.current = false;
    cancelListening();
    try { recRef.current?.stop(); } catch {}
  }, []);
  useEffect(() => () => { if (clip) URL.revokeObjectURL(clip); }, [clip]);

  const toRecordMode = () => { const m = speechMode(); setMode(m === 'recognize' ? 'record' : m); setState('idle'); };

  // --- live recognition ---
  const recognize = async () => {
    setState('listening'); setHeard('');
    try {
      const res = await listen({ lang: 'es-ES', timeoutMs: 6000 });
      if (!alive.current) return;
      if (!res.length) { setTries((t) => t + 1); setState('silent'); return; }
      const m = spokenMatches(res, target.es);
      setHeard(res[0] || '');
      if (m.ok) { sfx.good(); setState('ok'); setTimeout(() => speak('¡Muy bien!'), 300); }
      else { setTries((t) => t + 1); setState('retry'); }
    } catch (e) {
      if (!alive.current) return;
      if (e.message === 'aborted') { setState('idle'); return; }
      if (e.message === 'no-speech') { setTries((t) => t + 1); setState('silent'); return; }
      // Didn't start / no permission / service error: fall back to recording on this device.
      rememberSpeechMode('broken');
      toRecordMode();
    }
  };

  // --- record & compare ---
  const record = async () => {
    try {
      setState('recording');
      const r = await startRecording({ maxMs: 4000 });
      recRef.current = r;
      const url = await r.done;
      recRef.current = null;
      if (!alive.current) return;
      if (!url) { setState('idle'); return; }
      setClip((old) => { if (old) URL.revokeObjectURL(old); return url; });
      setState('recorded');
      setTimeout(() => playUrl(url), 200);
    } catch {
      if (!alive.current) return;
      rememberSpeechMode('none');
      setMode('none'); setState('idle');
    }
  };

  const listening = state === 'listening' || state === 'recording';
  return (
    <div className="card pop">
      <Prompt he="עכשיו תורכם! אמרו בקול" young={young} />
      <div className="show-word"><span className="emoji-xl">{target.e}</span></div>
      <div className="intro-es"><Es>{target.es}</Es></div>
      <div className="intro-he"><Mixed text={target.he} /></div>
      <div className="row center">
        <SoundButton text={target.es} rate={rate(young)} big />
        <SoundButton text={target.es} rate={0.5} big label="השמעה איטית" />
      </div>

      {mode === null ? null : state === 'ok' ? (
        <>
          <div className="speak-ok">🎉 <bdi dir="ltr">¡Muy bien!</bdi> מצוין!</div>
          <button className="btn primary wide" onClick={onDone}>המשך ←</button>
        </>
      ) : mode === 'none' ? (
        <>
          <p className="muted center-text">הקשיבו, ואז אמרו את המילה בקול רם 🗣️</p>
          <button className="btn primary wide" onClick={onDone}>אמרתי! ✔</button>
        </>
      ) : listening ? (
        <>
          <button className="mic on" onClick={() => (state === 'recording' ? recRef.current?.stop() : cancelListening())} aria-label="עצירה">
            {state === 'recording' ? '⏺' : '👂'}
          </button>
          <p className="center-text muted">{state === 'recording' ? 'מקליטים… דברו עכשיו! (לחצו כדי לעצור)' : 'מקשיבה לכם… (לחצו כדי לעצור)'}</p>
        </>
      ) : state === 'recorded' ? (
        <>
          <div className="row center wrap compare">
            <button className="btn ghost" onClick={() => playUrl(clip)}>🧒 ההקלטה שלי</button>
            <button className="btn ghost" onClick={() => speak(target.es, { rate: rate(young) })}>🦜 לולה</button>
          </div>
          <p className="center-text">זה נשמע אותו דבר?</p>
          <div className="row center wrap">
            <button className="btn ghost" onClick={record}>🎤 עוד פעם</button>
            <button className="btn primary" onClick={() => { sfx.good(); onDone(); }}>כן! ✔</button>
          </div>
        </>
      ) : (
        <>
          <button className="mic" onClick={mode === 'record' ? record : recognize} aria-label="הקלטה">🎤</button>
          <p className="center-text muted">{mode === 'record' ? 'לחצו, אמרו את המילה, ואז השוו ללולה' : 'לחצו על המיקרופון ודברו'}</p>
          {state === 'retry' && (
            <p className="center-text">כמעט! הקשיבו שוב ונסו עוד פעם 💪 {heard && <span className="muted">(שמעתי: <Es>{heard}</Es>)</span>}</p>
          )}
          {state === 'silent' && <p className="center-text">לא שמעתי כלום 🙉 דברו קרוב למיקרופון ובקול רם</p>}
          {tries >= 2 && (
            <div className="row center wrap">
              <button className="btn ghost" onClick={onDone}>אמרתי! ✔</button>
              <button className="btn ghost" onClick={onDone}>דלגו בינתיים ←</button>
            </div>
          )}
        </>
      )}
      {mode !== null && state !== 'ok' && !listening && state !== 'recorded' && mode !== 'none' && tries < 2 && (
        <div className="center-text"><button className="link" onClick={onDone}>דלגו ←</button></div>
      )}
    </div>
  );
}

// ---------- Song (karaoke) ----------
export function Karaoke({ lines, title, origin, young, onNext }) {
  const [active, setActive] = useState(-1);
  const [showHe, setShowHe] = useState(true);
  const [slow, setSlow] = useState(young);
  const playing = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => () => { playing.current = false; stopSpeaking(); }, []);

  const playAll = async () => {
    if (playing.current) { playing.current = false; stopSpeaking(); setIsPlaying(false); setActive(-1); return; }
    playing.current = true; setIsPlaying(true);
    for (let i = 0; i < lines.length; i++) {
      if (!playing.current) break;
      setActive(i);
      await speak(lines[i].es, { rate: slow ? 0.65 : 0.85 });
      await new Promise((r) => setTimeout(r, 250));
    }
    playing.current = false; setIsPlaying(false); setActive(-1);
  };
  return (
    <div className="card pop">
      <div className="song-head">🎵 <Es className="bold">{title.replace(/^שיר: /, '')}</Es></div>
      {origin && <p className="origin"><Mixed text={origin} /></p>}
      <div className="row center wrap">
        <button className="btn primary" onClick={playAll}>{isPlaying ? '⏹ עצירה' : '▶ הקראת השיר'}</button>
        <button className={`btn ghost ${slow ? 'on' : ''}`} onClick={() => setSlow((s) => !s)}>🐢 לאט</button>
        <button className={`btn ghost ${showHe ? 'on' : ''}`} onClick={() => setShowHe((s) => !s)}>תרגום</button>
      </div>
      <p className="muted small center-text">לחצו על שורה כדי לשמוע אותה. אפשר לחפש את המנגינה המקורית עם ההורים 🎶</p>
      <ol className="lyrics">
        {lines.map((l, i) => (
          <li key={i} className={i === active ? 'active' : ''} onClick={() => { setActive(i); speak(l.es, { rate: slow ? 0.65 : 0.85 }); }}>
            <Es>{l.es}</Es>
            {showHe && <div className="translation">{l.he}</div>}
          </li>
        ))}
      </ol>
      <button className="btn primary wide" onClick={() => { playing.current = false; stopSpeaking(); onNext(); }}>
        {young ? 'שרתי! ✔' : 'להמשך ←'}
      </button>
    </div>
  );
}

// ---------- Story reader ----------
export function Reader({ pages, title, origin, young, onNext }) {
  const [p, setP] = useState(-1); // -1 = cover
  const [showHe, setShowHe] = useState(young);
  useEffect(() => {
    if (p < 0) return;
    const t = setTimeout(() => speak(pages[p].es, { rate: young ? 0.7 : 0.85 }), 300);
    return () => { clearTimeout(t); stopSpeaking(); };
  }, [p, pages, young]);
  if (p < 0) {
    return (
      <div className="card pop story-cover">
        <div className="emoji-xl">📖</div>
        <h2><Es>{title}</Es></h2>
        {origin && <p className="origin"><Mixed text={origin} /></p>}
        <button className="btn primary wide" onClick={() => setP(0)}>פותחים את הספר ←</button>
      </div>
    );
  }
  const page = pages[p];
  return (
    <div className="card story-page pop" key={p}>
      <div className="page-num">{p + 1} / {pages.length}</div>
      <div className="story-emoji">{page.e}</div>
      <div className="story-text" dir="ltr" lang="es">{page.es}</div>
      {showHe ? <div className="translation big">{page.he}</div>
        : <button className="link" onClick={() => setShowHe(true)}>הצג תרגום</button>}
      <div className="row center">
        <SoundButton text={page.es} rate={young ? 0.7 : 0.85} big />
        <SoundButton text={page.es} rate={0.55} big label="השמעה איטית" />
      </div>
      <div className="row space">
        <button className="btn ghost" disabled={p === 0} onClick={() => setP(p - 1)}>→ אחורה</button>
        {p < pages.length - 1
          ? <button className="btn primary" onClick={() => setP(p + 1)}>הבא ←</button>
          : <button className="btn primary" onClick={onNext}>לשאלות ←</button>}
      </div>
    </div>
  );
}
