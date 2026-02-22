"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";

export default function ProfileForm({
  initial_display_name,
  initial_bio,
  initial_website,
}: {
  initial_display_name: string;
  initial_bio: string;
  initial_website: string;
}) {
  const [state, action, pending] = useActionState(updateProfile, null);

  return (
    <form action={action} className="space-y-6">
      <div>
        <label
          htmlFor="display_name"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
        >
          display name
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          maxLength={50}
          defaultValue={initial_display_name}
          placeholder="how you want to be known"
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-red-800 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
        >
          bio
        </label>
        <textarea
          id="bio"
          name="bio"
          maxLength={500}
          rows={3}
          defaultValue={initial_bio}
          placeholder="a few words about you or your business"
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-red-800 transition-colors resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
        >
          website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          defaultValue={initial_website}
          placeholder="https://yoursite.com"
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-red-800 transition-colors"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-500">{state.success}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {pending ? "saving..." : "save profile"}
      </button>
    </form>
  );
}
