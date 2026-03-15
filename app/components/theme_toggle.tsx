"use client";

import { useState, useEffect, useRef } from "react";

type Theme = "light" | "dark" | "system";

function isDarkNow(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  if (isDarkNow(theme)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getStored(): Theme {
  const v = localStorage.getItem("theme");
  if (v === "dark" || v === "light") return v;
  return "system";
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const OPTIONS: { value: Theme; Icon: () => React.ReactElement; label: string }[] = [
  { value: "light", Icon: SunIcon, label: "light" },
  { value: "system", Icon: MonitorIcon, label: "system" },
  { value: "dark", Icon: MoonIcon, label: "dark" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(getStored());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      if (getStored() === "system") applyTheme("system");
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted]);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function select(next: Theme) {
    setTheme(next);
    setOpen(false);
    if (next === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", next);
    }
    applyTheme(next);
  }

  if (!mounted) return <div className="w-8 h-8" />;

  const active = OPTIONS.find((o) => o.value === theme)!;

  return (
    <div ref={ref} className="relative">
      {/* active icon */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={`theme: ${active.label}`}
        title={`theme: ${active.label}`}
        className="w-8 h-8 flex items-center justify-center rounded text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <active.Icon />
      </button>

      {/* popover trio */}
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 flex items-center gap-0.5 rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] p-1 shadow-sm">
          {OPTIONS.map(({ value, Icon, label }) => (
            <button
              key={value}
              onClick={() => select(value)}
              aria-label={label}
              title={label}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                value === theme
                  ? "text-[var(--text-primary)] bg-[var(--bg-tertiary)]"
                  : "text-[var(--text-faint)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <Icon />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
