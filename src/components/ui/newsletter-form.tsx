"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/orders";
import { useConvexClient } from "@/components/providers/convex-gate";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const convex = useConvexClient();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("busy");
    await subscribeNewsletter(email, convex);
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-sage">
        <Check className="h-4 w-4" />
        You are on the list. The Ivory Hour letter arrives monthly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex max-w-sm" : "flex"}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.in"
        className="h-12 w-full min-w-0 border border-line bg-card px-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="label-micro flex h-12 shrink-0 items-center gap-2 bg-accent px-5 text-accent-ink transition-colors hover:bg-ink hover:text-bg disabled:opacity-50"
      >
        Join
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
