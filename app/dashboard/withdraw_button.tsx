"use client";

import { useState, useTransition } from "react";
import { unpledgeIdea } from "@/app/ideas/[id]/actions";

type Props = {
  idea_id: string;
  idea_status: string;
};

export default function WithdrawButton({ idea_id, idea_status }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const locked = ["threshold_reached", "cell_forming", "active"];
  if (locked.includes(idea_status)) {
    return (
      <span className="text-xs text-gray-600">locked</span>
    );
  }

  return (
    <div>
      <button
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const result = await unpledgeIdea(idea_id);
            if (result?.error) setError(result.error);
          });
        }}
        className="text-xs text-gray-500 border border-[#333] px-3 py-1.5 rounded hover:border-red-800 hover:text-red-400 transition-colors disabled:opacity-50"
      >
        {pending ? "withdrawing..." : "withdraw"}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1 max-w-[140px]">{error}</p>
      )}
    </div>
  );
}
