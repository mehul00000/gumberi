import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviews,
  className,
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i <= Math.round(value)
                ? "fill-gold text-gold"
                : "text-line"
            )}
          />
        ))}
      </span>
      <span className="text-xs text-ink-soft">
        {value.toFixed(1)}
        {reviews !== undefined ? ` (${reviews})` : ""}
      </span>
    </span>
  );
}
