'use client';
import { speedFactor } from './prefs';
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
    // ~15% slower than the requested rate (clearer for kids), times the device's speed setting
    const base = lang.startsWith('es') ? 0.85 : 0.9;
    u.rate = Math.max(0.35, Math.min(1.3, rate * base * speedFactor()));
    u.pitch = lang.startsWith('es') ? 1.05 : 1;
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    u.onend = finish;
    u.onerror = finish;
    // Safety net: some iOS versions never fire onend
    setTimeout(finish, (1500 + text.length * 150) / u.rate);
    synth.speak(u);
  });
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// ---------- Speaking practice: which mode is safe on this device? ----------
// iOS home-screen web apps (standalone) freeze when webkitSpeechRecognition starts,
// so there we use "record & compare" instead. Elsewhere we try recognition with a
// watchdog, and remember on this device if it ever fails to start.
const MODE_KEY = 'ham_speech_mode';

export function isStandalone() {
  if (typeof window === 'undefined') return false;
  return window.navigator.standalone === true || window.matchMedia?.('(display-mode: standalone)').matches;
}
const isIOS = () => typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

function stored() { try { return localStorage.getItem(MODE_KEY); } catch { return null; } }
export function rememberSpeechMode(mode) { try { localStorage.setItem(MODE_KEY, mode); } catch {} }

export function canRecognize() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
export function canRecord() {
  return typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== 'undefined';
}

// 'recognize' | 'record' | 'none'
export function speechMode() {
  if (typeof window === 'undefined') return 'none';
  const s = stored();
  if (s === 'none' || (s === 'record' && canRecord())) return s;
  if (canRecognize() && !(isIOS() && isStandalone()) && s !== 'broken') return 'recognize';
  return canRecord() ? 'record' : 'none';
}

let activeRec = null;
export function cancelListening() {
  if (activeRec) { try { activeRec.abort(); } catch {} activeRec = null; }
}

// Resolves with candidate transcripts (may be empty). Rejects on errors; a recognizer that
// doesn't start within 2.5s is aborted and the device is switched to record mode.
export function listen({ lang = 'es-ES', timeoutMs = 6000 } = {}) {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error('unsupported'));
    stopSpeaking();
    let rec;
    try { rec = new SR(); } catch (e) { return reject(e); }
    activeRec = rec;
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    const results = [];
    let settled = false, started = false;
    const end = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(t); clearTimeout(watchdog);
      if (activeRec === rec) activeRec = null;
      try { rec.abort(); } catch {}
      if (err && !results.length) reject(err); else resolve(results);
    };
    rec.onstart = () => { started = true; };
    rec.onaudiostart = () => { started = true; };
    rec.onresult = (e) => {
      for (const r of e.results) for (const alt of r) results.push(alt.transcript);
      end();
    };
    rec.onerror = (e) => end(new Error(e.error || 'error'));
    rec.onend = () => end();
    const watchdog = setTimeout(() => {
      if (!started) { rememberSpeechMode('broken'); end(new Error('nostart')); }
    }, 2500);
    const t = setTimeout(() => end(), timeoutMs);
    // Start outside the click handler's call stack so a slow native start can't block the tap.
    setTimeout(() => { try { rec.start(); } catch (e) { end(e); } }, 0);
  });
}

// Record a short clip from the microphone. Returns { url, stop } immediately-ish;
// `done` resolves with an object URL for playback (or null).
export async function startRecording({ maxMs = 4000 } = {}) {
  stopSpeaking();
  const stream = await Promise.race([
    navigator.mediaDevices.getUserMedia({ audio: true }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('mic-timeout')), 8000)),
  ]);
  const type = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', ''].find((t) => !t || MediaRecorder.isTypeSupported?.(t));
  const mr = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream);
  const chunks = [];
  mr.ondataavailable = (e) => { if (e.data?.size) chunks.push(e.data); };
  const done = new Promise((resolve) => {
    mr.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      resolve(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || type || 'audio/mp4' })) : null);
    };
  });
  mr.start();
  const timer = setTimeout(() => { if (mr.state !== 'inactive') mr.stop(); }, maxMs);
  const stop = () => { clearTimeout(timer); if (mr.state !== 'inactive') mr.stop(); };
  return { done, stop };
}

export function playUrl(url) {
  return new Promise((resolve) => {
    if (!url) return resolve();
    const a = new Audio(url);
    a.onended = resolve; a.onerror = resolve;
    a.play().catch(resolve);
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
