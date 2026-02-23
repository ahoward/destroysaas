"use client";

import { useState } from "react";
import { deleteInvitation } from "./actions";

type Invitation = {
  id: string;
  token: string;
  recipient_name: string | null;
  recipient_email: string | null;
  group_names: string[];
  redirect_path: string;
  view_count: number;
  viewed_at: string | null;
  accepted_at: string | null;
  accepted_by: string | null;
  expires_at: string | null;
  created_at: string;
};

function statusBadge(inv: Invitation) {
  if (inv.accepted_at) {
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-green-600/20 text-green-500">
        accepted
      </span>
    );
  }
  if (inv.viewed_at) {
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-yellow-600/20 text-yellow-500">
        viewed
      </span>
    );
  }
  if (inv.expires_at && new Date(inv.expires_at) < new Date()) {
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">
        expired
      </span>
    );
  }
  return (
    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">
      pending
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InvitationList({
  invitations,
  acceptedEmails,
}: {
  invitations: Invitation[];
  acceptedEmails: Record<string, string>;
}) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  function copyUrl(token: string) {
    const url = `${window.location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  }

  async function handleDelete(id: string) {
    await deleteInvitation(id);
  }

  if (invitations.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        no invitations yet. create one above.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {invitations.map((inv) => (
        <div
          key={inv.id}
          className="border border-[var(--border-primary)] rounded-lg p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium truncate">
                  {inv.recipient_name || inv.recipient_email || "generic link"}
                </p>
                {statusBadge(inv)}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                {inv.recipient_email && (
                  <span>{inv.recipient_email}</span>
                )}
                <span>
                  groups: {inv.group_names.join(", ")}
                </span>
                <span>&rarr; {inv.redirect_path}</span>
                <span>
                  views: {inv.view_count}
                </span>
                <span>created {formatDate(inv.created_at)}</span>
                {inv.expires_at && (
                  <span>
                    expires {formatDate(inv.expires_at)}
                  </span>
                )}
                {inv.accepted_at && (
                  <span>
                    accepted {formatDate(inv.accepted_at)}
                    {inv.accepted_by && acceptedEmails[inv.accepted_by]
                      ? ` by ${acceptedEmails[inv.accepted_by]}`
                      : ""}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => copyUrl(inv.token)}
                className="rounded bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                {copiedToken === inv.token ? "copied" : "copy url"}
              </button>
              <button
                onClick={() => handleDelete(inv.id)}
                className="rounded bg-[var(--bg-secondary)] px-3 py-1 text-xs text-red-500 hover:bg-red-600/20 transition-colors"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
