import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  tone = "ink",
  className,
  children,
}: {
  tone?: "ink" | "accent" | "gold" | "sage" | "soft";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    ink: "bg-ink text-bg",
    accent: "bg-accent text-accent-ink",
    gold: "bg-gold text-white",
    sage: "bg-sage text-white",
    soft: "bg-accent-soft text-accent",
  };
  return (
    <span
      className={cn(
        "label-micro inline-flex items-center px-2.5 py-1",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
