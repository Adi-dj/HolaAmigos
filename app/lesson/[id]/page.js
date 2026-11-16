import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { lessonById, distractorPool } from '@/lib/curriculum/index.js';
import { loadProgress, buildMap } from '@/lib/progress';
import LessonPlayer from '@/components/LessonPlayer';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const lesson = lessonById(id);
  if (!lesson || !lesson.tracks.includes(user.track)) notFound();

  const map = buildMap(user.track, await loadProgress(user.id));
  const flat = map.levels.flatMap((lv) => lv.units.flatMap((u) => u.lessons));
  const i = flat.findIndex((l) => l.id === id);
  if (!flat[i]?.unlocked && !user.is_admin) redirect('/');
  const next = flat[i + 1];

  return (
    <LessonPlayer
      lesson={lesson}
      track={user.track}
      pool={distractorPool(lesson)}
      nextLessonId={next ? next.id : null}
    />
  );
}
