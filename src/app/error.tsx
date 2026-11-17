"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-x flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="label-micro text-accent">Snagged thread</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-6xl">
        Something pulled loose
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
        An unexpected error interrupted this page. Try again — if it persists,
        the finishing room has been notified.
      </p>
      <button
        onClick={reset}
        className="label-micro mt-10 border border-line px-6 py-3 text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Try again
      </button>
    </div>
  );
}
