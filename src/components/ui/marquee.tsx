import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal ticker, pure CSS. */
export function Marquee({
  children,
  className,
  speed = 32,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
