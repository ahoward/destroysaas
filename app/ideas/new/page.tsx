import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import IdeaForm from "./form";

export default async function NewIdeaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/ideas/new");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysass
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            dashboard
          </a>
          <span className="text-sm text-[var(--text-muted)]">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-[var(--text-secondary)] border border-[var(--border-secondary)] px-3 py-1.5 rounded hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              sign out
            </button>
          </form>
        </div>
      </nav>

      {/* form */}
      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            propose an idea
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            describe the software your business needs. what would you pay per
            month for a hosted, maintained solution you actually own?
          </p>
        </div>

        <IdeaForm />
      </main>
    </div>
  );
}
