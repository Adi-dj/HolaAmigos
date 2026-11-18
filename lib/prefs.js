'use client';
// Per-device display/voice preferences (stored in this browser only).
export const TEXT_SIZES = { m: { label: 'רגיל', scale: 1.2 }, l: { label: 'גדול', scale: 1.35 }, xl: { label: 'גדול מאוד', scale: 1.5 } };
export const SPEEDS = { slow: { label: 'איטי מאוד', factor: 0.8 }, normal: { label: 'רגיל (מומלץ)', factor: 1 }, fast: { label: 'מהיר יותר', factor: 1.2 } };

const get = (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

export const getTextSize = () => (TEXT_SIZES[get('ham_text', 'm')] ? get('ham_text', 'm') : 'm');
export function setTextSize(k) {
  set('ham_text', k);
  document.documentElement.style.setProperty('--scale', TEXT_SIZES[k].scale);
}
export const getSpeed = () => (SPEEDS[get('ham_rate', 'normal')] ? get('ham_rate', 'normal') : 'normal');
export const setSpeed = (k) => set('ham_rate', k);
export const speedFactor = () => SPEEDS[getSpeed()].factor;
