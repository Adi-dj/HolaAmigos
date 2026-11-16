import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { lessonsForTrack } from '@/lib/curriculum/index.js';
import AdminPanel from '@/components/AdminPanel';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/');
  const totals = { young: lessonsForTrack('young').length, older: lessonsForTrack('older').length };
  return (
    <main className="admin">
      <header className="home-top">
        <h1>⚙️ ניהול משתמשים</h1>
        <Link href="/" className="btn ghost small">→ חזרה לאפליקציה</Link>
      </header>
      <AdminPanel meId={admin.id} totals={totals} />
    </main>
  );
}
