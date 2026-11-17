import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  link,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p className="label-micro mb-4 text-accent">{eyebrow}</p>
        <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {copy ? (
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
            {copy}
          </p>
        ) : null}
      </div>
      {link ? (
        <Link
          href={link.href}
          className="group label-micro inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
        >
          {link.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </Reveal>
  );
}
