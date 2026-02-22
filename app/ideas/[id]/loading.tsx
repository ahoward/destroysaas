export default function IdeaDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* nav placeholder */}
        <div className="h-6 w-32 bg-[#1a1a1a] rounded animate-pulse mb-16" />

        {/* title */}
        <div className="h-8 w-3/4 bg-[#1a1a1a] rounded animate-pulse mb-4" />
        <div className="h-4 w-1/3 bg-[#1a1a1a] rounded animate-pulse mb-8" />

        {/* description block */}
        <div className="space-y-2 mb-8">
          <div className="h-3 w-full bg-[#1a1a1a] rounded animate-pulse" />
          <div className="h-3 w-full bg-[#1a1a1a] rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-[#1a1a1a] rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-[#1a1a1a] rounded animate-pulse" />
        </div>

        {/* pledge bar */}
        <div className="border border-[#222] rounded-lg p-5 mb-8">
          <div className="h-4 w-1/2 bg-[#1a1a1a] rounded animate-pulse mb-3" />
          <div className="h-3 w-full bg-[#1a1a1a] rounded-full animate-pulse mb-3" />
          <div className="h-3 w-1/3 bg-[#1a1a1a] rounded animate-pulse" />
        </div>

        {/* comments section */}
        <div className="h-5 w-24 bg-[#1a1a1a] rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="border border-[#222] rounded p-4">
              <div className="h-3 w-1/4 bg-[#1a1a1a] rounded animate-pulse mb-2" />
              <div className="h-3 w-full bg-[#1a1a1a] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
