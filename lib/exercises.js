// Builds the sequence of steps (cards + exercises) for a lesson, adapted to the child's track.
// young (6-8): audio and pictures first, no typing, short lessons.
// older (9-12): adds reading, choosing written words, typing and sentence building.

export function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
const sample = (a, n) => shuffle(a).slice(0, n);
const chunk = (a, n) => { const out = []; for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n)); return out; };

let uid = 0;
const step = (kind, data) => ({ id: `${kind}-${uid++}`, kind, ...data });

// 4 options: target + 3 distinct distractors (by es + emoji), from the lesson first, then the unit pool.
function optionsFor(target, items, pool, n = 4) {
  const seenEs = new Set([target.es]);
  const seenE = new Set([target.e]);
  const seenHe = new Set([target.he]);
  const out = [target];
  for (const c of [...shuffle(items), ...shuffle(pool || [])]) {
    if (out.length >= n) break;
    if (seenEs.has(c.es) || (c.e && seenE.has(c.e)) || seenHe.has(c.he)) continue;
    seenEs.add(c.es); seenE.add(c.e); seenHe.add(c.he);
    out.push(c);
  }
  return shuffle(out);
}

function vocabSteps(lesson, track, pool) {
  const young = track === 'young';
  const phrases = lesson.type === 'phrases';
  const items = lesson.items;
  const steps = [];
  for (const group of chunk(items, 4)) {
    group.forEach((it) => steps.push(step('intro', { item: it })));
    const ex = [];
    for (const it of group) {
      ex.push(step('listenPick', { target: it, options: optionsFor(it, items, pool), show: phrases && !young ? 'he' : 'emoji' }));
      if (!young) {
        if (phrases) ex.push(step('build', { target: it, extra: extraWords(it, items) }));
        else ex.push(step('pickWord', { target: it, options: optionsFor(it, items, pool) }));
      }
    }
    steps.push(...shuffle(ex));
  }
  if (items.length >= 3) steps.push(step('match', { pairs: sample(items, Math.min(4, items.length)), right: phrases && !young ? 'he' : 'emoji' }));
  const spoken = sample(items.filter((i) => i.es.split(' ').length <= 6), young ? 3 : 2);
  spoken.forEach((it) => steps.push(step('speak', { target: it })));
  if (!young && !phrases) sample(items, 2).forEach((it) => steps.push(step('type', { target: it })));
  return steps;
}

function extraWords(target, items) {
  const own = new Set(target.es.split(' '));
  const words = items.flatMap((i) => i.es.split(' ')).filter((w) => !own.has(w));
  return sample([...new Set(words)], 2);
}

function letterSteps(lesson, track, pool) {
  const items = lesson.items;
  const steps = [];
  for (const group of chunk(items, 3)) {
    group.forEach((it) => steps.push(step('introLetter', { item: it })));
    const ex = group.map((it) => step('listenLetter', { target: it, options: optionsFor(it, items, []) }));
    steps.push(...shuffle(ex));
  }
  // Which word starts with this letter?
  const words = items.map((it) => ({ es: it.ex, he: it.he, e: it.e, letter: it.es }));
  sample(words, track === 'young' ? 3 : 4).forEach((w) =>
    steps.push(step('startsWith', { target: w, options: optionsFor(w, words, []) })));
  sample(words, 2).forEach((w) => steps.push(step('speak', { target: w })));
  return steps;
}

function grammarSteps(lesson, track) {
  const steps = [step('explain', { paragraphs: lesson.explain, title: lesson.title })];
  if (lesson.table) steps.push(step('table', { table: lesson.table }));
  shuffle(lesson.quiz).forEach((qz) => steps.push(step('fill', { quiz: qz, options: shuffle(qz.opts) })));
  if (track === 'older') {
    sample(lesson.quiz, 2).forEach((qz) => {
      const es = qz.es.replace('___', qz.a);
      steps.push(step('build', { target: { es, he: qz.he, e: '' }, extra: [] }));
    });
  }
  return steps;
}

function songSteps(lesson, track) {
  const steps = [step('karaoke', { lines: lesson.lines, title: lesson.title, origin: lesson.origin })];
  if (track === 'young') return steps; // little ones: listen and sing along
  const allWords = [...new Set(lesson.lines.flatMap((l) => l.es.split(/\s+/)).map(cleanWord).filter((w) => w.length >= 3))];
  const candidates = lesson.lines.filter((l) => l.es.split(/\s+/).some((w) => cleanWord(w).length >= 4));
  sample(candidates, Math.min(3, candidates.length)).forEach((line) => {
    const words = line.es.split(/\s+/).map(cleanWord).filter((w) => w.length >= 4 && !/^cuc[uú]$/i.test(w));
    if (!words.length) return;
    const answer = words[Math.floor(Math.random() * words.length)];
    const others = sample(allWords.filter((w) => w.toLowerCase() !== answer.toLowerCase()), 2);
    steps.push(step('fill', {
      quiz: { es: line.es.replace(answer, '___'), a: answer, he: line.he },
      options: shuffle([answer, ...others]),
      song: true,
    }));
  });
  return steps;
}
const cleanWord = (w) => w.replace(/[¿?¡!.,;:«»…]/g, '');

function storySteps(lesson) {
  return [
    step('reader', { pages: lesson.pages, title: lesson.title, origin: lesson.origin }),
    ...lesson.questions.map((qq) => step('question', { q: qq, options: shuffle(qq.options.map((o, i) => ({ ...o, correct: i === qq.a }))) })),
  ];
}

function explainSteps(lesson, track, pool) {
  const steps = [step('explain', { paragraphs: lesson.explain, title: lesson.title })];
  lesson.items.forEach((it) => steps.push(step('intro', { item: it })));
  lesson.items.forEach((it) => steps.push(step('listenPick', { target: it, options: optionsFor(it, lesson.items, pool), show: 'emoji' })));
  sample(lesson.items, 3).forEach((it) => steps.push(step('speak', { target: it })));
  return steps;
}

export function buildSteps(lesson, track, pool = []) {
  switch (lesson.type) {
    case 'vocab':
    case 'phrases': return vocabSteps(lesson, track, pool);
    case 'letters': return letterSteps(lesson, track, pool);
    case 'grammar': return grammarSteps(lesson, track);
    case 'song': return songSteps(lesson, track);
    case 'story': return storySteps(lesson);
    case 'explain': return explainSteps(lesson, track, pool);
    default: return [];
  }
}

export const isExercise = (s) => !['intro', 'introLetter', 'explain', 'table', 'karaoke', 'reader', 'speak'].includes(s.kind);

export function starsFor(mistakes, exercises) {
  if (mistakes === 0) return 3;
  if (mistakes <= Math.max(2, Math.round(exercises * 0.15))) return 2;
  return 1;
}
