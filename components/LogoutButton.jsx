'use client';
export default function LogoutButton({ className = 'btn ghost small' }) {
  return (
    <button className={className} onClick={async () => { await fetch('/api/logout', { method: 'POST' }); window.location.href = '/login'; }}>
      יציאה
    </button>
  );
}
