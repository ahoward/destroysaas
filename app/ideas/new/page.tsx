import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
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
      <Nav currentPath="/ideas" />

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
