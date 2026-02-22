export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8">this page doesn&apos;t exist.</p>
      <div className="flex gap-4 text-sm">
        <a
          href="/"
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline"
        >
          back to home
        </a>
        <a
          href="/ideas"
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline"
        >
          browse ideas
        </a>
      </div>
    </div>
  );
}
