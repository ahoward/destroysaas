export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-[#f0f0f0] font-sans px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">this page doesn&apos;t exist.</p>
      <div className="flex gap-4 text-sm">
        <a
          href="/"
          className="text-gray-500 hover:text-white transition-colors underline"
        >
          back to home
        </a>
        <a
          href="/ideas"
          className="text-gray-500 hover:text-white transition-colors underline"
        >
          browse ideas
        </a>
      </div>
    </div>
  );
}
