import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

type DevCell = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  skills: string[];
  created_at: string;
};

export default async function DevCellsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cells } = await supabase
    .from("dev_cells")
    .select("id, name, description, website, skills, created_at")
    .order("name");

  const approved: DevCell[] = cells ?? [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a href="/ideas" className="hover:text-[var(--text-primary)] transition-colors">ideas</a>
          <span className="text-[var(--text-primary)] font-medium">dev cells</span>
          <a href="/about" className="hover:text-[var(--text-primary)] transition-colors">about</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">dashboard</a>
              <form action={signOut}>
                <button type="submit" className="hover:text-[var(--text-primary)] transition-colors">sign out</button>
              </form>
            </>
          ) : (
            <a href="/auth" className="hover:text-[var(--text-primary)] transition-colors">sign in</a>
          )}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">dev cells</h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          certified developer cooperatives that build and maintain software for the collective.
        </p>

        {approved.length === 0 ? (
          <div className="border border-[var(--border-primary)] rounded-lg p-8 text-center">
            <p className="text-[var(--text-muted)] mb-4">no certified dev cells yet.</p>
            <a
              href="/dev-cells/apply"
              className="text-red-500 hover:text-red-400 text-sm transition-colors"
            >
              be the first to apply &rarr;
            </a>
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {approved.map((cell) => (
              <div key={cell.id} className="border border-[var(--border-primary)] rounded-lg p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-lg font-semibold">{cell.name}</h2>
                  {cell.website && (
                    <a
                      href={cell.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                    >
                      website &rarr;
                    </a>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{cell.description}</p>
                {cell.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cell.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs border border-[var(--border-secondary)] text-[var(--text-secondary)] rounded px-2 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-[var(--border-primary)] pt-8">
          <p className="text-[var(--text-muted)] text-sm mb-3">
            are you a developer cooperative? join the network.
          </p>
          <a
            href="/dev-cells/apply"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            apply to become a certified dev cell &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
