"use client";

import { useEffect } from "react";

export default function ViewTracker({ token }: { token: string }) {
  useEffect(() => {
    fetch(`/invite/${token}/track`, { method: "POST" }).catch(() => {});
  }, [token]);
  return null;
}
