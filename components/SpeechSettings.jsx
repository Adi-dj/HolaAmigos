'use client';
import { useEffect, useState } from 'react';
import { speechMode, rememberSpeechMode } from '@/lib/speech';

const LABEL = { recognize: 'זיהוי דיבור אוטומטי', record: 'הקלטה והשוואה ללולה', none: 'בלי מיקרופון' };

// Per-device choice for the speaking exercises (stored in this browser only).
export default function SpeechSettings() {
  const [mode, setMode] = useState(null);
  const [choice, setChoice] = useState('auto');
  useEffect(() => {
    let s = null; try { s = localStorage.getItem('ham_speech_mode'); } catch {}
    setChoice(s === 'record' || s === 'none' ? s : 'auto');
    setMode(speechMode());
  }, []);
  if (!mode) return null;
  const change = (v) => {
    if (v === 'auto') { try { localStorage.removeItem('ham_speech_mode'); } catch {} }
    else rememberSpeechMode(v);
    setChoice(v); setMode(speechMode());
  };
  return (
    <details className="card settings">
      <summary>🎤 הגדרות דיבור במכשיר הזה</summary>
      <label>תרגילי דיבור
        <select value={choice} onChange={(e) => change(e.target.value)}>
          <option value="auto">אוטומטי (מומלץ)</option>
          <option value="record">הקלטה והשוואה ללולה</option>
          <option value="none">בלי מיקרופון, רק לומר בקול</option>
        </select>
      </label>
      <p className="muted small">כרגע פעיל: {LABEL[mode]}. באפליקציה שמותקנת ממסך הבית של אייפד או אייפון, זיהוי הדיבור של אפל לא יציב, ולכן משתמשים שם בהקלטה.</p>
    </details>
  );
}
