"use client";

import { useRef, useState } from "react";
import { useProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/ui/reveal";

/** Horizontal rail with a scroll-progress thread underneath. */
export function NewArrivals() {
  const products = useProducts();
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const featured = [
    ...products.filter((p) => p.badges?.includes("New")),
    ...products.filter((p) => !p.badges?.includes("New")),
  ].slice(0, 8);

  function onScroll() {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <section className="bg-surface py-24 md:py-32" aria-label="New arrivals">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="label-micro text-accent">Just off the finishing table</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-5xl">
              New arrivals
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Drag, swipe or scroll sideways — the rail moves like our cutting
            table.
          </p>
        </Reveal>
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:px-10"
      >
        {featured.map((p, i) => (
          <div
            key={p.slug}
            className="w-[74vw] shrink-0 snap-start sm:w-[22rem]"
          >
            <ProductCard product={p} priority={i < 2} />
          </div>
        ))}
        <div className="w-2 shrink-0" />
      </div>

      <div className="container-x mt-10">
        <div className="h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
