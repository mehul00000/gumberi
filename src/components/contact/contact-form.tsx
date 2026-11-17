"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useConvexClient } from "@/lib/backend";
import { sendContactMessage } from "@/lib/orders";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const convex = useConvexClient();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  const field =
    "h-12 w-full border border-line bg-card px-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    await sendContactMessage(form, convex);
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="border border-line bg-surface p-10 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-sage" strokeWidth={1.4} />
        <h2 className="mt-5 font-display text-3xl text-ink">Received, thank you</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          The studio replies within one working day — usually with too much
          detail about fabric.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={field}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={field}
        />
      </div>
      <select
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className={cn(field, "appearance-none")}
      >
        <option value="" disabled>
          What is this about?
        </option>
        <option>Order help</option>
        <option>Sizing & fit advice</option>
        <option>Repairs & care</option>
        <option>Press & collaborations</option>
        <option>Something else</option>
      </select>
      <textarea
        required
        rows={6}
        placeholder="Tell us everything — dye lots, delivery dates, dilemma between two sizes…"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="label-micro flex h-12 w-full items-center justify-center gap-2 bg-accent text-accent-ink transition-colors hover:bg-ink hover:text-bg disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {state === "busy" ? "Sending…" : "Send to the studio"}
      </button>
    </form>
  );
}
