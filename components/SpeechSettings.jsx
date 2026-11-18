'use client';
import { useEffect, useState } from 'react';
import { speechMode, rememberSpeechMode, speak } from '@/lib/speech';
import { TEXT_SIZES, SPEEDS, getTextSize, setTextSize, getSpeed, setSpeed } from '@/lib/prefs';

const MODE_LABEL = { recognize: 'זיהוי דיבור אוטומטי', record: 'הקלטה והשוואה ללולה', none: 'בלי מיקרופון' };

// Per-device settings (stored in this browser only): text size, voice speed, speaking mode.
export default function DeviceSettings() {
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState('m');
  const [speed, setSpd] = useState('normal');
  const [choice, setChoice] = useState('auto');
  const [mode, setMode] = useState('none');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => { if (location.hash === '#settings') setOpen(true); };
    check(); window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  useEffect(() => {
    let s = null; try { s = localStorage.getItem('ham_speech_mode'); } catch {}
    setChoice(s === 'record' || s === 'none' ? s : 'auto');
    setMode(speechMode());
    setSize(getTextSize());
    setSpd(getSpeed());
    setReady(true);
  }, []);
  if (!ready) return null;

  const changeMode = (v) => {
    if (v === 'auto') { try { localStorage.removeItem('ham_speech_mode'); } catch {} }
    else rememberSpeechMode(v);
    setChoice(v); setMode(speechMode());
  };

  return (
    <details className="card settings" id="settings" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>⚙️ הגדרות במכשיר הזה</summary>

      <div className="set-group">
        <b>גודל הכתב</b>
        <div className="seg">
          {Object.entries(TEXT_SIZES).map(([k, v]) => (
            <button key={k} type="button" className={size === k ? 'on' : ''} style={{ fontSize: `${0.85 * v.scale}rem` }}
              onClick={() => { setTextSize(k); setSize(k); }}>א {v.label}</button>
          ))}
        </div>
      </div>

      <div className="set-group">
        <b>מהירות ההקראה</b>
        <div className="seg">
          {Object.entries(SPEEDS).map(([k, v]) => (
            <button key={k} type="button" className={speed === k ? 'on' : ''}
              onClick={() => { setSpeed(k); setSpd(k); speak('Hola, ¿cómo estás? Me llamo Lola.'); }}>{v.label}</button>
          ))}
        </div>
        <button type="button" className="btn ghost small" onClick={() => speak('Hola, ¿cómo estás? Me llamo Lola.')}>🔊 נסו לשמוע</button>
      </div>

      <div className="set-group">
        <label>תרגילי דיבור
          <select value={choice} onChange={(e) => changeMode(e.target.value)}>
            <option value="auto">אוטומטי (מומלץ)</option>
            <option value="record">הקלטה והשוואה ללולה</option>
            <option value="none">בלי מיקרופון, רק לומר בקול</option>
          </select>
        </label>
        <p className="muted small">כרגע פעיל: {MODE_LABEL[mode]}. באפליקציה שמותקנת ממסך הבית באייפד או באייפון משתמשים בהקלטה, כי זיהוי הדיבור של אפל לא יציב שם.</p>
      </div>
      <p className="muted small">💡 לקול ספרדי ברור יותר באייפד: הגדרות ← נגישות ← תוכן מוקרא ← קולות ← ספרדית (ספרד), ומורידים קול "משופר", למשל Mónica.</p>
    </details>
  );
}
