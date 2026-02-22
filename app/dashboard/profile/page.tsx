import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import ProfileForm from "./form";

export const metadata: Metadata = {
  title: "edit profile — destroysass",
};

export default async function EditProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/dashboard/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, website")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysass
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--text-muted)]">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-[var(--text-secondary)] border border-[var(--border-secondary)] px-3 py-1.5 rounded hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <a
            href="/dashboard"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; back to dashboard
          </a>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">
          edit profile
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          this info is shown on your{" "}
          <a
            href={`/profile/${user.id}`}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            public profile
          </a>
        </p>

        <ProfileForm
          initial_display_name={profile?.display_name ?? ""}
          initial_bio={profile?.bio ?? ""}
          initial_website={profile?.website ?? ""}
        />
      </main>
    </div>
  );
}
