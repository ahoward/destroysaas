"use client";

import { useState, useTransition } from "react";
import { submitApplication } from "./actions";

export default function ApplicationForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await submitApplication(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
      }
    });
  }

  if (success) {
    return (
      <div className="border border-green-800 rounded-lg p-6 text-center">
        <p className="text-sm text-green-500 font-medium mb-2">{success}</p>
        <a
          href="/lobby"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          back to lobby &rarr;
        </a>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
        >
          what should we call you?
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          className="w-full bg-[var(--bg-input)] border border-[var(--border-secondary)] rounded px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
      </div>

      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
        >
          why do you want in?
        </label>
        <textarea
          id="reason"
          name="reason"
          required
          minLength={20}
          maxLength={2000}
          rows={4}
          placeholder="what drew you here? what problem are you trying to solve?"
          className="w-full bg-[var(--bg-input)] border border-[var(--border-secondary)] rounded px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="contribution"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
        >
          what can you bring to the table?
        </label>
        <textarea
          id="contribution"
          name="contribution"
          required
          minLength={20}
          maxLength={2000}
          rows={4}
          placeholder="skills, connections, domain expertise, capital, ideas..."
          className="w-full bg-[var(--bg-input)] border border-[var(--border-secondary)] rounded px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
      >
        {isPending ? "submitting..." : "submit application"}
      </button>
    </form>
  );
}
