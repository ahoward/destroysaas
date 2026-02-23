import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { acceptInvitation } from "@/app/admin/invitations/actions";

type Props = { params: Promise<{ token: string }> };

export default async function AcceptInvitePage({ params }: Props) {
  const { token } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(`/invite/${token}/accept`)}`);
  }

  const result = await acceptInvitation(token);

  if (result?.error) {
    // if already accepted, still redirect them to where they should go
    if (result.redirect_path) {
      redirect(result.redirect_path);
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
        <div className="text-center max-w-sm px-4">
          <p className="text-red-500 mb-4">{result.error}</p>
          <a
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors underline"
          >
            back to home
          </a>
        </div>
      </div>
    );
  }

  redirect(result?.redirect_path || "/");
}
