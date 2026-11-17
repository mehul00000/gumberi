import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Shared editorial page header for content pages. */
export function PageHero({
  eyebrow,
  title,
  copy,
  align = "left",
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "pb-14 pt-16 md:pb-20 md:pt-24",
        align === "center" && "text-center",
        className
      )}
    >
      <div className={cn(align === "center" && "mx-auto max-w-2xl")}>
        <p className="label-micro text-accent">{eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          {title}
        </h1>
        {copy ? (
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
            {copy}
          </p>
        ) : null}
        {children}
      </div>
    </Reveal>
  );
}
