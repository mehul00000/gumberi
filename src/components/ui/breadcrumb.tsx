import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs text-ink-soft",
        className
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
          {i < items.length - 1 ? (
            <ChevronRight className="h-3 w-3 text-line" />
          ) : null}
        </span>
      ))}
    </nav>
  );
}
