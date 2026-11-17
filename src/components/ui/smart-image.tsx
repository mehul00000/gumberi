"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PATTERNS: Record<string, string> = {
  women: "/brand/pattern-clay.svg",
  men: "/brand/pattern-ink.svg",
  accessories: "/brand/pattern-gold.svg",
  footwear: "/brand/pattern-ivory.svg",
  jewellery: "/brand/pattern-rose.svg",
  default: "/brand/pattern-ivory.svg",
};

/**
 * next/image with a graceful, on-brand fallback:
 * if a remote photo fails to load we swap in a generated
 * fabric pattern instead of a broken image icon.
 */
export function SmartImage({
  src,
  alt,
  category,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  fill = true,
  width,
  height,
}: {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const [errored, setErrored] = useState(false);
  const pattern = PATTERNS[category ?? "default"] ?? PATTERNS.default;

  if (errored || !src) {
    return (
      <div
        className={cn("relative overflow-hidden bg-surface", className)}
        aria-label={alt}
        role="img"
      >
        <img
          src={pattern}
          alt=""
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
    );
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setErrored(true)}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
      className={cn("object-cover", className, imgClassName)}
    />
  );
}
