import { level1 } from './level1.js';
import { level2 } from './level2.js';
import { level3 } from './level3.js';
import { level4 } from './level4.js';

export const TRACKS = {
  young: { label: 'קטנים (6-8)', short: 'קטנים' },
  older: { label: 'גדולים (9-12)', short: 'גדולים' },
};

export const LEVELS = [level1, level2, level3, level4];

const word = (s) => { const [es, he, e] = s.split('|'); return { es, he, e: e || '' }; };
const letter = (s) => { const [L, name, ex, he, e] = s.split('|'); return { es: L, name, ex, he, e }; };
const line = (s) => { const [es, he] = s.split('|'); return { es, he }; };
const quiz = (s) => { const [es, a, d, he] = s.split('|'); return { es, a, opts: [a, ...d.split(',')], he }; };
const row = (s) => s.split('|');
const option = (s) => { const [e, es, he] = s.split('|'); return { e, es, he }; };

function normalizeLesson(l, unit, level) {
  const out = { ...l, unitId: unit.id, unitTitle: unit.title, unitEmoji: unit.emoji, color: unit.color, levelId: level.id,
    tracks: l.tracks || unit.tracks || ['young', 'older'] };
  if (l.type === 'letters') out.items = l.items.map(letter);
  else if (l.items) out.items = l.items.map(word);
  if (l.lines) out.lines = l.lines.map(line);
  if (l.pages) out.pages = l.pages.map(word);
  if (l.quiz) out.quiz = l.quiz.map(quiz);
  if (l.table) out.table = { ...l.table, rows: l.table.rows.map(row) };
  if (l.questions) out.questions = l.questions.map((qq) => ({ ...qq, options: qq.options.map(option) }));
  return out;
}

const ALL = [];
const BY_ID = new Map();
for (const level of LEVELS) {
  for (const unit of level.units) {
    unit.tracks = unit.tracks || ['young', 'older'];
    for (const l of unit.lessons) {
      const n = normalizeLesson(l, unit, level);
      ALL.push(n);
      BY_ID.set(n.id, n);
    }
  }
}

export const allLessons = ALL;
export const lessonById = (id) => BY_ID.get(id);
export const lessonsForTrack = (track) => ALL.filter((l) => l.tracks.includes(track));

// Structure for the home map, filtered to a track.
export function mapForTrack(track) {
  return LEVELS.map((lv) => ({
    id: lv.id, title: lv.title, subtitle: lv.subtitle,
    units: lv.units
      .map((u) => ({
        id: u.id, title: u.title, emoji: u.emoji, color: u.color,
        lessons: u.lessons.map((l) => BY_ID.get(l.id)).filter((l) => l.tracks.includes(track))
          .map((l) => ({ id: l.id, title: l.title, type: l.type })),
      }))
      .filter((u) => u.lessons.length),
  })).filter((lv) => lv.units.length);
}

// Extra words from the same unit to use as wrong answers.
export function distractorPool(lesson) {
  const pool = ALL.filter((l) => l.unitId === lesson.unitId && l.items && l.type !== 'letters')
    .flatMap((l) => l.items);
  return pool;
}
