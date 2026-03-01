"use client";

import { useState, useTransition, useRef } from "react";
import { postReply, deleteReply } from "../actions";

type Reply = {
  id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

type Props = {
  post_id: string;
  user_id: string | null;
  replies: Reply[];
  can_reply: boolean;
};

function relative_time(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.max(0, now - then);
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function Replies({ post_id, user_id, replies, can_reply }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form).get("body") as string;
    if (!body?.trim()) return;

    setError(null);
    startTransition(async () => {
      const result = await postReply(post_id, body);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  function handleDelete(reply_id: string) {
    startTransition(async () => {
      const result = await deleteReply(reply_id, post_id);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4">
        feedback
        {replies.length > 0 && (
          <span className="text-[var(--text-faint)] font-normal text-sm ml-2">
            ({replies.length})
          </span>
        )}
      </h2>

      {/* reply form */}
      {can_reply ? (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
          <textarea
            name="body"
            required
            maxLength={2000}
            rows={3}
            placeholder="share your feedback..."
            className="w-full bg-[var(--bg-input)] border border-[var(--border-primary)] rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none resize-none mb-2"
          />
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors disabled:opacity-50"
          >
            {isPending ? "posting..." : "reply"}
          </button>
        </form>
      ) : user_id ? (
        <div className="border border-[var(--border-primary)] rounded p-4 mb-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            replies are limited to cabal members.
          </p>
        </div>
      ) : (
        <div className="border border-[var(--border-primary)] rounded p-4 mb-6 text-center">
          <a
            href="/auth"
            className="text-red-500 hover:text-red-400 text-sm transition-colors"
          >
            sign in to join the discussion &rarr;
          </a>
        </div>
      )}

      {/* reply list */}
      {replies.length === 0 ? (
        <p className="text-[var(--text-faint)] text-sm italic">
          no replies yet. be the first.
        </p>
      ) : (
        <div className="space-y-4">
          {replies.map((r) => (
            <div
              key={r.id}
              className="border-l-2 border-[var(--border-primary)] pl-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {r.display_name}
                </span>
                <span className="text-xs text-[var(--text-faint)]">
                  {relative_time(r.created_at)}
                </span>
                {user_id === r.user_id && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={isPending}
                    className="text-xs text-[var(--text-separator)] hover:text-red-500 transition-colors ml-auto disabled:opacity-50"
                    title="delete reply"
                  >
                    &times;
                  </button>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
