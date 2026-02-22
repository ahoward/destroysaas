"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, signUp, resetPassword } from "./actions";

function AuthForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setMessage(null);

    if (isForgot) {
      const result = await resetPassword(formData);
      if (result?.error) setError(result.error);
      else if (result?.success) setMessage(result.success);
      return;
    }

    const result = isSignUp ? await signUp(formData) : await signIn(formData);

    if (result?.error) {
      setError(result.error);
    } else if ("success" in (result ?? {})) {
      setMessage((result as { success: string }).success);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6 px-4">
      <h1 className="text-2xl font-semibold text-center text-[var(--text-primary)]">
        {isForgot ? "reset password" : isSignUp ? "create account" : "sign in"}
      </h1>

      <form action={handleSubmit} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
        </div>

        {!isForgot && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">
              password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {message && (
          <p className="text-sm text-green-500">{message}</p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          {isForgot ? "send reset link" : isSignUp ? "sign up" : "sign in"}
        </button>
      </form>

      {!isForgot && !isSignUp && (
        <p className="text-center text-sm">
          <button
            onClick={() => { setIsForgot(true); setError(null); setMessage(null); }}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            forgot password?
          </button>
        </p>
      )}

      <p className="text-center text-sm text-[var(--text-muted)]">
        {isForgot ? (
          <button
            onClick={() => { setIsForgot(false); setError(null); setMessage(null); }}
            className="font-medium text-[var(--text-primary)] underline"
          >
            back to sign in
          </button>
        ) : (
          <>
            {isSignUp ? "already have an account?" : "don\u2019t have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="font-medium text-[var(--text-primary)] underline"
            >
              {isSignUp ? "sign in" : "sign up"}
            </button>
          </>
        )}
      </p>

      <p className="text-center text-sm text-[var(--text-faint)]">
        <a href="/" className="underline hover:text-[var(--text-secondary)] transition-colors">
          back to home
        </a>
      </p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
}
