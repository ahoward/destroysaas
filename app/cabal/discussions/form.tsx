"use client";

import { useActionState } from "react";
import { createPost } from "./actions";

export default function NewDiscussionForm() {
  const [state, action, pending] = useActionState(createPost, null);

  return (
    <form action={action} className="border border-[var(--border-primary)] rounded-lg p-6 mb-10">
      <h2 className="text-sm font-semibold mb-4">new discussion</h2>

      <input
        name="title"
        type="text"
        required
        maxLength={200}
        placeholder="title"
        className="w-full bg-[var(--bg-input)] border border-[var(--border-primary)] rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none mb-3"
      />

      <textarea
        name="body"
        required
        maxLength={20000}
        rows={8}
        placeholder="what are we discussing?"
        className="w-full bg-[var(--bg-input)] border border-[var(--border-primary)] rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none resize-none mb-3"
      />

      {state?.error && (
        <p className="text-red-400 text-xs mb-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors disabled:opacity-50"
      >
        {pending ? "starting..." : "start discussion"}
      </button>
    </form>
  );
}
