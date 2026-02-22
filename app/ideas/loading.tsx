export default function IdeasLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* nav placeholder */}
        <div className="h-6 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse mb-16" />

        {/* search bar placeholder */}
        <div className="h-10 bg-[var(--bg-tertiary)] rounded animate-pulse mb-8" />

        {/* idea card skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-[var(--border-primary)] rounded-lg p-5 mb-4">
            <div className="h-5 w-3/4 bg-[var(--bg-tertiary)] rounded animate-pulse mb-3" />
            <div className="h-3 w-full bg-[var(--bg-tertiary)] rounded animate-pulse mb-2" />
            <div className="h-3 w-2/3 bg-[var(--bg-tertiary)] rounded animate-pulse mb-4" />
            <div className="flex gap-4">
              <div className="h-3 w-20 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              <div className="h-3 w-24 bg-[var(--bg-tertiary)] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
