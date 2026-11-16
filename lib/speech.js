'use client';
// Text-to-speech (device voices) + speech recognition with graceful fallbacks.

let voicesCache = null;
function voices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const v = window.speechSynthesis.getVoices();
  if (v.length) voicesCache = v;
  return voicesCache || [];
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => { voicesCache = window.speechSynthesis.getVoices(); };
}

function pickVoice(lang) {
  const all = voices();
  const base = lang.slice(0, 2);
  const exact = all.filter((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase());
  const loose = all.filter((v) => v.lang.toLowerCase().startsWith(base));
  const list = exact.length ? exact : loose;
  // Prefer higher-quality voices when the device has them
  return list.find((v) => /enhanced|premium|neural|google/i.test(v.name)) || list.find((v) => v.localService) || list[0] || null;
}

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, { lang = 'es-ES', rate = 0.85 } = {}) {
  return new Promise((resolve) => {
    if (!canSpeak() || !text) return resolve();
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[«»]/g, ''));
    u.lang = lang;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = lang.startsWith('es') ? 1.05 : 1;
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    u.onend = finish;
    u.onerror = finish;
    // Safety net: some iOS versions never fire onend
    setTimeout(finish, 1500 + text.length * 120);
    synth.speak(u);
  });
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

export function canRecognize() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Resolves with an array of candidate transcripts (may be empty). Rejects on permission/network errors.
export function listen({ lang = 'es-ES', timeoutMs = 7000 } = {}) {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error('unsupported'));
    stopSpeaking();
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    let results = [];
    let settled = false;
    const end = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(t);
      try { rec.stop(); } catch {}
      if (err && !results.length) reject(err); else resolve(results);
    };
    rec.onresult = (e) => {
      for (const r of e.results) for (const alt of r) results.push(alt.transcript);
      end();
    };
    rec.onerror = (e) => end(new Error(e.error || 'error'));
    rec.onend = () => end();
    const t = setTimeout(() => end(), timeoutMs);
    try { rec.start(); } catch (e) { end(e); }
  });
}

// ---- tiny sound effects (Web Audio, no files needed) ----
let ctx;
function tone(freqs, dur = 0.12, type = 'sine', gap = 0.09) {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = type; o.frequency.value = f;
      const t0 = ctx.currentTime + i * gap;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    });
  } catch {}
}
export const sfx = {
  good: () => tone([660, 880, 1175], 0.14, 'triangle'),
  bad: () => tone([300, 220], 0.18, 'sawtooth', 0.12),
  tap: () => tone([520], 0.05, 'triangle'),
  win: () => tone([523, 659, 784, 1047, 1319], 0.2, 'triangle', 0.11),
};
