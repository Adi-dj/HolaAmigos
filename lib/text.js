// Text helpers for comparing kids' answers leniently.
export function norm(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // drop accents (ñ → n too)
    .replace(/[¿?¡!.,;:«»"'()…-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
export const stripArticle = (s) => s.replace(/^(el|la|los|las|un|una) /, '');

function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
export function similarity(a, b) {
  a = norm(a); b = norm(b);
  if (!a || !b) return 0;
  return 1 - lev(a, b) / Math.max(a.length, b.length);
}

// Typed answer: accent-insensitive, article optional.
export function typedMatches(input, target) {
  const i = norm(input), t = norm(target);
  return i === t || stripArticle(i) === stripArticle(t);
}

// Spoken answer: forgiving, since kids' pronunciation and recognizers vary.
export function spokenMatches(candidates, target) {
  const t = stripArticle(norm(target));
  let best = 0;
  for (const c of candidates) {
    const n = stripArticle(norm(c));
    if (n === t || n.includes(t) || (t.length > 6 && t.includes(n) && n.length >= t.length * 0.7)) return { ok: true, score: 1 };
    best = Math.max(best, similarity(n, t));
  }
  const need = t.length <= 4 ? 0.5 : 0.65;
  return { ok: best >= need, score: best };
}
