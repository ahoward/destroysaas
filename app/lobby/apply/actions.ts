"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ApplicationResult = {
  error?: string;
  success?: string;
};

export async function submitApplication(
  formData: FormData
): Promise<ApplicationResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in." };
  }

  const name = (formData.get("name") as string)?.trim() ?? "";
  const reason = (formData.get("reason") as string)?.trim() ?? "";
  const contribution = (formData.get("contribution") as string)?.trim() ?? "";

  if (!name || name.length < 2) {
    return { error: "name is required (at least 2 characters)." };
  }
  if (!reason || reason.length < 20) {
    return { error: "please tell us why you want in (at least 20 characters)." };
  }
  if (!contribution || contribution.length < 20) {
    return { error: "please tell us what you can bring (at least 20 characters)." };
  }

  // check for existing application
  const { data: existing } = await supabase
    .from("cabal_applications")
    .select("id, status")
    .eq("user_id", user.id)
    .single();

  if (existing?.status === "pending") {
    return { error: "you already have a pending application." };
  }

  // if denied, delete old application so they can re-apply
  if (existing?.status === "denied") {
    // need service role to delete (RLS only allows select/insert)
    const { createClient: createServiceClient } = await import(
      "@supabase/supabase-js"
    );
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    if (serviceRoleKey) {
      const adminClient = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        serviceRoleKey
      );
      await adminClient
        .from("cabal_applications")
        .delete()
        .eq("id", existing.id);
    }
  }

  const { error } = await supabase.from("cabal_applications").insert({
    user_id: user.id,
    name,
    reason,
    contribution,
  });

  if (error) {
    if (error.message?.includes("duplicate key")) {
      return { error: "you already have an application on file." };
    }
    return { error: "failed to submit application. please try again." };
  }

  revalidatePath("/lobby");
  return { success: "application submitted. we'll review it shortly." };
}
