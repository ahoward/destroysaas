import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { is_admin } from "@/lib/groups";
import { getEffectiveUser } from "@/lib/ghost";
import Nav from "@/app/components/nav";
import NewDiscussionForm from "./form";

export const metadata: Metadata = {
  title: "discussions — cabal — destroysaas",
  description: "where the inner cabal shapes direction. public by design.",
};

export default async function CabalDiscussionsPage() {
  const supabase = await createClient();
  const { user } = await getEffectiveUser();

  const canPost = user ? await is_admin(supabase, user) : false;

  // fetch discussions
  const { data: discussions } = await supabase
    .from("cabal_discussions")
    .select("id, title, created_by, created_at")
    .order("created_at", { ascending: false });

  // fetch author display names
  const authorIds = [...new Set((discussions ?? []).map((d) => d.created_by))];
  const { data: profiles } = authorIds.length > 0
    ? await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", authorIds)
    : { data: [] };

  const nameMap: Record<string, string> = {};
  for (const p of profiles ?? []) {
    if (p.display_name) nameMap[p.id] = p.display_name;
  }

  // fetch response counts
  const discIds = (discussions ?? []).map((d) => d.id);
  const { data: responseCounts } = discIds.length > 0
    ? await supabase
        .from("cabal_responses")
        .select("discussion_id")
        .in("discussion_id", discIds)
    : { data: [] };

  const countMap: Record<string, number> = {};
  for (const r of responseCounts ?? []) {
    countMap[r.discussion_id] = (countMap[r.discussion_id] ?? 0) + 1;
  }

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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          discussions
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-2">
          you are the humans in our loop &mdash; thank you.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-10">
          leadership posts proposals, questions, and decisions here.
          cabal members shape the direction with feedback.
          everything is public because trust is the foundation.
        </p>

        {/* create form — admin/sudo only */}
        {canPost && <NewDiscussionForm />}

        {/* discussion list */}
        {(discussions ?? []).length === 0 ? (
          <p className="text-[var(--text-faint)] text-sm italic">
            no discussions yet.
          </p>
        ) : (
          <div className="space-y-4">
            {(discussions ?? []).map((disc) => {
              const author = nameMap[disc.created_by] || "anonymous";
              const responses = countMap[disc.id] ?? 0;
              const date = new Date(disc.created_at).toLocaleDateString();

              return (
                <a
                  key={disc.id}
                  href={`/cabal/discussions/${disc.id}`}
                  className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-red-600 transition-colors"
                >
                  <p className="font-semibold mb-1">{disc.title}</p>
                  <div className="flex gap-3 text-xs text-[var(--text-muted)]">
                    <span>{author}</span>
                    <span>{date}</span>
                    <span>
                      {responses} {responses === 1 ? "response" : "responses"}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
