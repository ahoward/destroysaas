"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ProfileState = {
  error?: string;
  success?: string;
} | null;

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not signed in." };
  }

  const display_name = (formData.get("display_name") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const website = (formData.get("website") as string)?.trim() || null;

  // validate display_name length
  if (display_name && display_name.length > 50) {
    return { error: "Display name must be 50 characters or less." };
  }

  // validate bio length
  if (bio && bio.length > 500) {
    return { error: "Bio must be 500 characters or less." };
  }

  // validate website format
  if (website && !/^https?:\/\/.+/.test(website)) {
    return { error: "Website must start with http:// or https://" };
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      display_name,
      bio,
      website,
    },
    { onConflict: "id" }
  );

  if (error) {
    return { error: "Failed to save profile. Please try again." };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/profile/${user.id}`);
  return { success: "Profile saved." };
}
