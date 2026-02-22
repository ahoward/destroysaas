"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  function share_twitter() {
    const params = new URLSearchParams({ text: title, url });
    window.open(
      `https://twitter.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function share_linkedin() {
    const params = new URLSearchParams({ url });
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function copy_link() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select from a temporary input
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const btn =
    "text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-secondary)] rounded px-2.5 py-1 transition-colors";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--text-faint)] mr-1">share:</span>
      <button onClick={share_twitter} className={btn}>
        X
      </button>
      <button onClick={share_linkedin} className={btn}>
        LinkedIn
      </button>
      <button onClick={copy_link} className={btn}>
        {copied ? "copied!" : "copy link"}
      </button>
    </div>
  );
}
