import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { is_admin } from "@/lib/groups";
import { getEffectiveUser } from "@/lib/ghost";
import Nav from "@/app/components/nav";
import NewPostForm from "./form";

export const metadata: Metadata = {
  title: "cabal posts — destroysaas",
  description: "where the inner cabal shapes direction. public by design.",
};

export default async function CabalPostsPage() {
  const supabase = await createClient();
  const { user } = await getEffectiveUser();

  const canPost = user ? await is_admin(supabase, user) : false;

  // fetch posts with reply counts
  const { data: posts } = await supabase
    .from("cabal_posts")
    .select("id, title, created_by, created_at, profiles(display_name)")
    .order("created_at", { ascending: false });

  // get reply counts
  const postIds = (posts ?? []).map((p) => p.id);
  const { data: replyCounts } = postIds.length > 0
    ? await supabase
        .from("cabal_replies")
        .select("post_id")
        .in("post_id", postIds)
    : { data: [] };

  const countMap: Record<string, number> = {};
  for (const r of replyCounts ?? []) {
    countMap[r.post_id] = (countMap[r.post_id] ?? 0) + 1;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal/posts" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          cabal posts
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
        {canPost && <NewPostForm />}

        {/* post list */}
        {(posts ?? []).length === 0 ? (
          <p className="text-[var(--text-faint)] text-sm italic">
            no posts yet.
          </p>
        ) : (
          <div className="space-y-4">
            {(posts ?? []).map((post) => {
              const profile = post.profiles as unknown as { display_name: string } | null;
              const author = profile?.display_name || "anonymous";
              const replies = countMap[post.id] ?? 0;
              const date = new Date(post.created_at).toLocaleDateString();

              return (
                <a
                  key={post.id}
                  href={`/cabal/posts/${post.id}`}
                  className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-red-600 transition-colors"
                >
                  <p className="font-semibold mb-1">{post.title}</p>
                  <div className="flex gap-3 text-xs text-[var(--text-muted)]">
                    <span>{author}</span>
                    <span>{date}</span>
                    <span>
                      {replies} {replies === 1 ? "reply" : "replies"}
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
