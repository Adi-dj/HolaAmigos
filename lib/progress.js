import { query } from './db';
import { mapForTrack } from './curriculum/index.js';

export async function loadProgress(userId) {
  const { rows } = await query('SELECT lesson_id, stars FROM progress WHERE user_id = $1', [userId]);
  return Object.fromEntries(rows.map((r) => [r.lesson_id, r.stars]));
}

// Levels unlock when 60% of the previous level is done; lessons inside a unit go in order.
export function buildMap(track, progress) {
  const levels = mapForTrack(track);
  let prevRatio = 1;
  let total = 0, done = 0, stars = 0;
  const stickers = [];
  for (const lv of levels) {
    const lessons = lv.units.flatMap((u) => u.lessons);
    const lvDone = lessons.filter((l) => progress[l.id]).length;
    lv.unlocked = prevRatio >= 0.6;
    lv.done = lvDone; lv.total = lessons.length;
    for (const u of lv.units) {
      let prevDone = true;
      for (const l of u.lessons) {
        l.stars = progress[l.id] || 0;
        l.unlocked = lv.unlocked && prevDone;
        prevDone = !!l.stars;
        total++; if (l.stars) { done++; stars += l.stars; }
      }
      u.done = u.lessons.filter((l) => l.stars).length;
      u.complete = u.done === u.lessons.length;
      if (u.complete) stickers.push({ emoji: u.emoji, title: u.title });
    }
    prevRatio = lessons.length ? lvDone / lessons.length : 1;
  }
  // The "current" lesson = first unlocked lesson without stars
  let current = null;
  for (const lv of levels) for (const u of lv.units) for (const l of u.lessons) if (!current && l.unlocked && !l.stars) current = l.id;
  return { levels, total, done, stars, stickers, current };
}
