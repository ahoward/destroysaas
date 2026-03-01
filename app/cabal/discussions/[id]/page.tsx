import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";
import { getEffectiveUser } from "@/lib/ghost";
import Nav from "@/app/components/nav";
import Responses from "./replies";

function DiscussionBody({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // divider lines (───)
        if (/^[─━─-]{5,}$/.test(trimmed)) {
          return (
            <hr
              key={i}
              className="border-[var(--border-primary)] my-6"
            />
          );
        }

        // section header (ALL CAPS line, possibly with quotes)
        if (
          /^[A-Z0-9][A-Z0-9\s"":—–\-\.&]+$/.test(trimmed) &&
          trimmed.length < 120
        ) {
          return (
            <h3
              key={i}
              className="text-lg font-bold tracking-tight text-[var(--text-primary)] mt-6 mb-2 lowercase"
            >
              {trimmed.toLowerCase()}
            </h3>
          );
        }

        // money flow block (lines starting with → or indented with →)
        if (trimmed.includes("\n") && /→/.test(trimmed)) {
          const lines = trimmed.split("\n").map((l) => l.trim());
          const isFlowBlock = lines.filter((l) => l.startsWith("→")).length >= 2;
          if (isFlowBlock) {
            return (
              <div
                key={i}
                className="border border-[var(--border-primary)] rounded-lg p-4 bg-[var(--bg-secondary)] font-mono text-sm space-y-1"
              >
                {lines.map((line, j) => (
                  <p key={j} className="text-[var(--text-secondary)]">
                    {line}
                  </p>
                ))}
              </div>
            );
          }
        }

        // comparison table (lines with multiple spaces or tabs as columns)
        if (
          trimmed.includes("\n") &&
          trimmed.split("\n").every((l) => /\s{2,}/.test(l.trim()))
        ) {
          return (
            <div
              key={i}
              className="overflow-x-auto border border-[var(--border-primary)] rounded-lg p-4 bg-[var(--bg-secondary)]"
            >
              <pre className="text-xs text-[var(--text-secondary)] font-mono whitespace-pre">
                {trimmed}
              </pre>
            </div>
          );
        }

        // bullet list (lines starting with - or + or –)
        const lines = trimmed.split("\n");
        const isList = lines.every((l) => /^[+–\-•]\s/.test(l.trim()));
        if (isList) {
          return (
            <ul key={i} className="space-y-1">
              {lines.map((line, j) => {
                const clean = line.trim().replace(/^[+–\-•]\s*/, "");
                const isPositive = line.trim().startsWith("+");
                return (
                  <li
                    key={j}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-2"
                  >
                    <span
                      className={`shrink-0 ${isPositive ? "text-green-500" : "text-red-500"}`}
                    >
                      {isPositive ? "+" : "–"}
                    </span>
                    <span>{clean}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // labeled line (word: rest of text)
        if (
          lines.length === 1 &&
          /^[a-z][a-z\s]{0,20}:\s/i.test(trimmed) &&
          trimmed.length > 20
        ) {
          const colonIdx = trimmed.indexOf(":");
          const label = trimmed.slice(0, colonIdx);
          const rest = trimmed.slice(colonIdx + 1).trim();
          return (
            <div key={i} className="flex gap-3">
              <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-28 pt-0.5">
                {label}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {rest}
              </p>
            </div>
          );
        }

        // default paragraph
        return (
          <p
            key={i}
            className="text-[var(--text-secondary)] leading-relaxed text-sm"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: disc } = await supabase
    .from("cabal_discussions")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: disc ? `${disc.title} — cabal — destroysaas` : "not found",
  };
}

export default async function CabalDiscussionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: disc } = await supabase
    .from("cabal_discussions")
    .select("id, title, body, created_by, created_at, updated_at")
    .eq("id", id)
    .single();

  if (!disc) {
    notFound();
  }

  const { user, effectiveUserId } = await getEffectiveUser();
  const canReply = user ? await is_inner(supabase, user) : false;

  // fetch author name
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", disc.created_by)
    .single();

  const author = profile?.display_name || "anonymous";

  // fetch responses
  const { data: responses } = await supabase
    .from("cabal_responses")
    .select("id, user_id, display_name, body, created_at")
    .eq("discussion_id", id)
    .order("created_at", { ascending: true });

  const date = new Date(disc.created_at).toLocaleDateString();
  const edited =
    disc.updated_at !== disc.created_at
      ? new Date(disc.updated_at).toLocaleDateString()
      : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal" />
      {/* cabal sub-nav */}
      <div className="max-w-2xl mx-auto px-6 pt-2 flex gap-4 text-sm border-b border-red-600 pb-3">
        <a href="/cabal" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">status</a>
        <a href="/cabal/discussions" className="text-red-600 font-medium">discussions</a>
        <a href="/cabal/bizops" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">bizops</a>
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* back link */}
        <a
          href="/cabal/discussions"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; all discussions
        </a>

        {/* header */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight lowercase mt-4 mb-2">
          {disc.title}
        </h1>
        <div className="flex gap-3 text-xs text-[var(--text-muted)] mb-8">
          <span>{author}</span>
          <span>{date}</span>
          {edited && <span>(edited {edited})</span>}
        </div>

        {/* body */}
        <div className="mb-8">
          <DiscussionBody text={disc.body} />
        </div>

        {/* responses */}
        <Responses
          post_id={disc.id}
          user_id={effectiveUserId ?? null}
          replies={responses ?? []}
          can_reply={canReply}
        />
      </main>
    </div>
  );
}
