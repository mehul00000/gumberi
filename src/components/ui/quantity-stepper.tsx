"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  qty,
  onChange,
  className,
}: {
  qty: number;
  onChange: (qty: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-line text-ink",
        className
      )}
    >
      <button
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center transition-colors hover:text-accent"
        onClick={() => onChange(qty - 1)}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
      <button
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center transition-colors hover:text-accent"
        onClick={() => onChange(qty + 1)}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
