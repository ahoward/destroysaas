"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ActionResult = {
  error?: string;
} | null;

export async function pledgeIdea(idea_id: string, amount: number): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in to pledge." };
  }

  // validate amount: integer, 25-500, step of 25
  if (!Number.isInteger(amount) || amount < 25 || amount > 500 || amount % 25 !== 0) {
    return { error: "pledge amount must be a whole number between $25 and $500 in $25 increments." };
  }

  // check idea exists and is in a pledgeable status
  const { data: idea, error: idea_error } = await supabase
    .from("ideas")
    .select("id, status, created_by")
    .eq("id", idea_id)
    .single();

  if (idea_error || !idea) {
    return { error: "idea not found." };
  }

  const pledgeable = ["proposed", "gaining_traction"];
  if (!pledgeable.includes(idea.status)) {
    return { error: "this idea is no longer accepting pledges." };
  }

  // creator cannot pledge to own idea
  if (idea.created_by === user.id) {
    return { error: "you cannot pledge to your own idea." };
  }

  try {
    const { error } = await supabase
      .from("pledges")
      .upsert(
        { idea_id, user_id: user.id, amount_monthly: amount },
        { onConflict: "idea_id,user_id" }
      );

    if (error) {
      return { error: "failed to save pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  return null;
}

export async function unpledgeIdea(idea_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in." };
  }

  try {
    const { error } = await supabase
      .from("pledges")
      .delete()
      .eq("idea_id", idea_id)
      .eq("user_id", user.id);

    if (error) {
      return { error: "failed to withdraw pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  return null;
}
