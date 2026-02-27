"use client";

import { useState, useTransition } from "react";
import { pledgeIdea, unpledgeIdea } from "./actions";

type PledgePanelProps = {
  idea_id: string;
  user_id: string | null;
  existing_amount: number | null;
  is_creator: boolean;
  is_inner: boolean;
};

export default function PledgePanel({
  idea_id,
  user_id,
  existing_amount,
  is_creator,
  is_inner,
}: PledgePanelProps) {
  const [amount, setAmount] = useState(existing_amount ?? 50);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // not signed in
  if (!user_id) {
    return (
      <div className="border border-[var(--border-primary)] rounded-lg p-6">
        <a
          href={`/auth?next=/ideas/${idea_id}`}
          className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
        >
          sign in to pledge &rarr;
        </a>
        <p className="text-xs text-[var(--text-faint)] mt-3 text-center">
          no charges yet &mdash; this is a commitment, not a payment.
        </p>
      </div>
    );
  }

  // not in inner circle
  if (!is_inner) {
    return (
      <div className="border border-[var(--border-primary)] rounded-lg p-6 text-center">
        <p className="text-sm text-[var(--text-secondary)] mb-3">
          pledging is currently limited to inner circle members.
        </p>
        <a
          href="/lobby/apply"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
        >
          apply to join &rarr;
        </a>
      </div>
    );
  }

  // creator cannot pledge to own idea
  if (is_creator) {
    return (
      <div className="border border-[var(--border-primary)] rounded-lg p-6">
        <p className="text-sm text-[var(--text-muted)] text-center">
          this is your idea &mdash; you can&apos;t pledge to your own.
        </p>
      </div>
    );
  }

  // already pledged
  if (existing_amount !== null) {
    return (
      <div className="border border-[var(--border-primary)] rounded-lg p-6 space-y-4">
        <div className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">you&apos;re pledged at</p>
          <p className="text-3xl font-bold text-red-600">${existing_amount}/mo</p>
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button
          disabled={pending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const result = await unpledgeIdea(idea_id);
              if (result?.error) setError(result.error);
            });
          }}
          className="w-full text-sm text-[var(--text-muted)] border border-[var(--border-secondary)] px-4 py-2 rounded hover:border-red-800 hover:text-red-400 transition-colors disabled:opacity-50"
        >
          {pending ? "withdrawing..." : "withdraw pledge"}
        </button>
        <p className="text-xs text-[var(--text-faint)] text-center">
          withdrawing removes your commitment.
        </p>
      </div>
    );
  }

  // new pledge
  return (
    <div className="border border-[var(--border-primary)] rounded-lg p-6 space-y-4">
      <div>
        <label htmlFor="pledge-amount" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          pledge amount
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-secondary)]">$</span>
          <input
            id="pledge-amount"
            type="number"
            min={25}
            max={500}
            step={25}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-24 rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
          <span className="text-[var(--text-muted)] text-sm">/mo</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const result = await pledgeIdea(idea_id, amount);
            if (result?.error) setError(result.error);
          });
        }}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
      >
        {pending ? "pledging..." : "pledge \u2192"}
      </button>

      <p className="text-xs text-[var(--text-faint)] text-center">
        no charges yet &mdash; this is a commitment, not a payment.
      </p>
    </div>
  );
}
