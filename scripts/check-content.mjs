// Sanity checks for curriculum content: duplicates, broken quiz items, missing fields.
import { allLessons } from '../lib/curriculum/index.js';
let problems = 0;
const ids = new Set();
const bad = (l, m) => { problems++; console.log(`✗ ${l.id}: ${m}`); };
for (const l of allLessons) {
  if (ids.has(l.id)) bad(l, 'duplicate id'); ids.add(l.id);
  if (l.items) {
    const es = new Set(), em = new Set();
    for (const it of l.items) {
      if (!it.es || !it.he) bad(l, `missing field in ${JSON.stringify(it)}`);
      if (es.has(it.es)) bad(l, `duplicate es "${it.es}"`); es.add(it.es);
      if (it.e && em.has(it.e)) bad(l, `duplicate emoji ${it.e}`); em.add(it.e);
    }
  }
  for (const qz of l.quiz || []) {
    if (!qz.es.includes('___')) bad(l, `quiz without blank: ${qz.es}`);
    if (new Set(qz.opts).size !== qz.opts.length) bad(l, `quiz dup options: ${qz.es}`);
    if (!qz.he) bad(l, `quiz missing he: ${qz.es}`);
  }
  for (const qq of l.questions || []) if (qq.options.some((o) => !o.he || !o.es)) bad(l, `question options: ${qq.he}`);
  for (const p of l.pages || []) if (!p.he || !p.e) bad(l, `page: ${p.es}`);
  for (const ln of l.lines || []) if (!ln.he) bad(l, `line: ${ln.es}`);
  if (['grammar'].includes(l.type) && !(l.quiz?.length >= 4)) bad(l, 'grammar needs quiz');
}
const young = allLessons.filter((l) => l.tracks.includes('young')).length;
const older = allLessons.filter((l) => l.tracks.includes('older')).length;
console.log(`${allLessons.length} lessons (young ${young}, older ${older}); ${problems} problems`);
process.exit(problems ? 1 : 0);
