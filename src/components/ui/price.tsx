import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  price,
  compareAt,
  className,
  size = "md",
}: {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const off = compareAt && compareAt > price
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : null;
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium text-ink",
          size === "sm" && "text-sm",
          size === "md" && "text-[0.95rem]",
          size === "lg" && "font-display text-3xl"
        )}
      >
        {formatINR(price)}
      </span>
      {compareAt && compareAt > price ? (
        <>
          <span className="text-sm text-ink-soft line-through">
            {formatINR(compareAt)}
          </span>
          {off ? (
            <span className="label-micro text-accent">−{off}%</span>
          ) : null}
        </>
      ) : null}
    </span>
  );
}
