export default function FoundingBanner() {
  return (
    <div className="bg-red-600 text-white text-center text-xs py-1.5 px-4 font-medium">
      founding phase — the cooperative is forming as a Colorado LCA. pledges are non-binding expressions of interest.{" "}
      <a href="/rfc" className="underline hover:text-red-100 transition-colors">
        read RFC 042
      </a>{" · "}
      <a href="/about/governance" className="underline hover:text-red-100 transition-colors">
        learn more
      </a>{" · "}
      <a href="mailto:ara@destroysaas.coop" className="underline hover:text-red-100 transition-colors">
        send feedback
      </a>
    </div>
  );
}
