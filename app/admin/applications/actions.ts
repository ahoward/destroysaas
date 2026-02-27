"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { is_admin } from "@/lib/groups";

export async function approveApplication(
  applicationId: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized" };
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceRoleKey) {
    return { error: "service role key not configured" };
  }

  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    serviceRoleKey
  );

  // fetch application
  const { data: app } = await adminClient
    .from("cabal_applications")
    .select("id, user_id, status")
    .eq("id", applicationId)
    .single();

  if (!app) {
    return { error: "application not found" };
  }

  if (app.status !== "pending") {
    return { error: "application already reviewed" };
  }

  // update application status
  const { error: updateError } = await adminClient
    .from("cabal_applications")
    .update({
      status: "approved",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (updateError) {
    return { error: "failed to update application" };
  }

  // add user to cabal group
  const { data: cabalGroup } = await adminClient
    .from("groups")
    .select("id")
    .eq("name", "cabal")
    .single();

  if (cabalGroup) {
    await adminClient.from("group_members").upsert(
      { group_id: cabalGroup.id, user_id: app.user_id },
      { onConflict: "group_id,user_id" }
    );
  }

  revalidatePath("/admin/applications");
  return {};
}

export async function denyApplication(
  applicationId: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized" };
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceRoleKey) {
    return { error: "service role key not configured" };
  }

  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    serviceRoleKey
  );

  const { error: updateError } = await adminClient
    .from("cabal_applications")
    .update({
      status: "denied",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (updateError) {
    return { error: "failed to update application" };
  }

  revalidatePath("/admin/applications");
  return {};
}
