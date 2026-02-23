"use client";

import { useState } from "react";
import { createInvitation } from "./actions";

export default function InvitationForm() {
  const [error, setError] = useState<string | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setCreatedUrl(null);
    setCopied(false);

    const result = await createInvitation(formData);
    if (result?.error) {
      setError(result.error);
    } else if (result?.token) {
      const url = `${window.location.origin}/invite/${result.token}`;
      setCreatedUrl(url);
    }
  }

  function copyUrl() {
    if (createdUrl) {
      navigator.clipboard.writeText(createdUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="border border-[var(--border-primary)] rounded-lg p-6">
      <h2 className="text-sm font-semibold mb-4">create invitation</h2>

      <form action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              recipient name (optional)
            </label>
            <input
              name="recipient_name"
              type="text"
              placeholder="jane doe"
              className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              recipient email (optional)
            </label>
            <input
              name="recipient_email"
              type="email"
              placeholder="jane@example.com"
              className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              groups (comma-separated)
            </label>
            <input
              name="group_names"
              type="text"
              required
              defaultValue="cabal"
              className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              redirect after accept
            </label>
            <input
              name="redirect_path"
              type="text"
              defaultValue="/cabal"
              className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            personal note (optional, shown on invite page)
          </label>
          <textarea
            name="note"
            rows={3}
            placeholder="hey — wanted to show you what we're building..."
            className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="w-32">
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            expires in (days)
          </label>
          <input
            name="expires_days"
            type="number"
            min="1"
            placeholder="never"
            className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          create invitation
        </button>
      </form>

      {createdUrl && (
        <div className="mt-4 border border-green-600/40 rounded-lg p-4">
          <p className="text-xs text-green-500 mb-2">invitation created</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={createdUrl}
              className="flex-1 rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-xs text-[var(--text-primary)] font-mono"
            />
            <button
              onClick={copyUrl}
              className="shrink-0 rounded bg-[var(--bg-secondary)] px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
