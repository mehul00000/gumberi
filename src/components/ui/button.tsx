import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] text-[0.72rem] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-ink hover:text-bg",
  ink: "bg-ink text-bg hover:bg-accent hover:text-accent-ink",
  outline:
    "border border-ink/30 text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-14 px-9",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
