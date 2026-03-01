import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";
import { getEffectiveUser } from "@/lib/ghost";
import Nav from "@/app/components/nav";
import Replies from "./replies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("cabal_posts")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: post ? `${post.title} — cabal — destroysaas` : "post not found",
  };
}

export default async function CabalPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("cabal_posts")
    .select("id, title, body, created_by, created_at, updated_at, profiles(display_name)")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  const { user, effectiveUserId } = await getEffectiveUser();
  const canReply = user ? await is_inner(supabase, user) : false;

  // fetch replies
  const { data: replies } = await supabase
    .from("cabal_replies")
    .select("id, user_id, display_name, body, created_at")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const profile = post.profiles as unknown as { display_name: string } | null;
  const author = profile?.display_name || "anonymous";
  const date = new Date(post.created_at).toLocaleDateString();
  const edited =
    post.updated_at !== post.created_at
      ? new Date(post.updated_at).toLocaleDateString()
      : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal/posts" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* back link */}
        <a
          href="/cabal/posts"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; all posts
        </a>

        {/* post header */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight lowercase mt-4 mb-2">
          {post.title}
        </h1>
        <div className="flex gap-3 text-xs text-[var(--text-muted)] mb-8">
          <span>{author}</span>
          <span>{date}</span>
          {edited && <span>(edited {edited})</span>}
        </div>

        {/* post body */}
        <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap mb-8">
          {post.body}
        </div>

        {/* replies */}
        <Replies
          post_id={post.id}
          user_id={effectiveUserId ?? null}
          replies={replies ?? []}
          can_reply={canReply}
        />
      </main>
    </div>
  );
}
