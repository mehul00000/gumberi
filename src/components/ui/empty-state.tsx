import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./button";

export function EmptyState({
  icon: Icon,
  title,
  copy,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-line bg-surface px-8 py-20 text-center",
        className
      )}
    >
      <Icon className="mb-5 h-8 w-8 text-accent" strokeWidth={1.5} />
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{copy}</p>
      {action ? (
        <ButtonLink href={action.href} className="mt-8" size="sm">
          {action.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
