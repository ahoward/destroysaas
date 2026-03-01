"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getActionContext } from "@/lib/ghost";
import { createClient } from "@/lib/supabase/server";
import { is_admin, is_inner } from "@/lib/groups";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ActionResult = {
  error?: string;
} | null;

type CreatePostState = {
  error?: string;
  success?: string;
} | null;

// --- posts (sudo/admin only) ---

export async function createPost(
  _prev: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const supabase = await createClient();
  if (!(await is_admin(supabase, ctx.user))) {
    return { error: "only admins can create posts." };
  }

  const title = (formData.get("title") as string)?.trim() ?? "";
  const body = (formData.get("body") as string)?.trim() ?? "";

  if (!title || title.length > 200) {
    return { error: "title is required (max 200 chars)." };
  }
  if (!body || body.length > 20000) {
    return { error: "body is required (max 20,000 chars)." };
  }

  const { data: post, error } = await ctx.client
    .from("cabal_discussions")
    .insert({
      title,
      body,
      created_by: ctx.effectiveUserId,
    })
    .select("id")
    .single();

  if (error || !post) {
    return { error: "failed to create post. please try again." };
  }

  revalidatePath("/cabal/discussions");
  redirect(`/cabal/discussions/${post.id}`);
}

export async function updatePost(
  post_id: string,
  body: string
): Promise<ActionResult> {
  if (!UUID_RE.test(post_id)) {
    return { error: "invalid post." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const supabase = await createClient();
  if (!(await is_admin(supabase, ctx.user))) {
    return { error: "only admins can edit posts." };
  }

  const trimmed = body.trim();
  if (!trimmed || trimmed.length > 20000) {
    return { error: "body is required (max 20,000 chars)." };
  }

  const { error } = await ctx.client
    .from("cabal_discussions")
    .update({ body: trimmed, updated_at: new Date().toISOString() })
    .eq("id", post_id);

  if (error) {
    return { error: "failed to update post." };
  }

  revalidatePath(`/cabal/discussions/${post_id}`);
  revalidatePath("/cabal/discussions");
  return null;
}

export async function deletePost(post_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(post_id)) {
    return { error: "invalid post." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const supabase = await createClient();
  if (!(await is_admin(supabase, ctx.user))) {
    return { error: "only admins can delete posts." };
  }

  const { error } = await ctx.client
    .from("cabal_discussions")
    .delete()
    .eq("id", post_id);

  if (error) {
    return { error: "failed to delete post." };
  }

  revalidatePath("/cabal/discussions");
  redirect("/cabal/discussions");
}

// --- replies (cabal/admin/sudo) ---

export async function postReply(
  post_id: string,
  body: string
): Promise<ActionResult> {
  if (!UUID_RE.test(post_id)) {
    return { error: "invalid post." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in to reply." };
  }

  const supabase = await createClient();
  if (!(await is_inner(supabase, ctx.user))) {
    return { error: "replies are limited to cabal members." };
  }

  const trimmed = body.trim();
  if (!trimmed || trimmed.length > 2000) {
    return { error: "reply must be 1–2,000 characters." };
  }

  // verify post exists
  const { data: post } = await ctx.client
    .from("cabal_discussions")
    .select("id")
    .eq("id", post_id)
    .single();

  if (!post) {
    return { error: "post not found." };
  }

  const display_name =
    (ctx.user.email ?? "").split("@")[0] || "anonymous";

  const { error } = await ctx.client.from("cabal_responses").insert({
    post_id,
    user_id: ctx.effectiveUserId,
    display_name,
    body: trimmed,
  });

  if (error) {
    return { error: "failed to post reply. please try again." };
  }

  revalidatePath(`/cabal/discussions/${post_id}`);
  return null;
}

export async function deleteReply(
  reply_id: string,
  post_id: string
): Promise<ActionResult> {
  if (!UUID_RE.test(reply_id) || !UUID_RE.test(post_id)) {
    return { error: "invalid id." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const { error } = await ctx.client
    .from("cabal_responses")
    .delete()
    .eq("id", reply_id)
    .eq("user_id", ctx.effectiveUserId);

  if (error) {
    return { error: "failed to delete reply." };
  }

  revalidatePath(`/cabal/discussions/${post_id}`);
  return null;
}
