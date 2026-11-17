"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCollections } from "@/lib/data";
import { SmartImage } from "@/components/ui/smart-image";
import { Reveal } from "@/components/ui/reveal";

/** Chapter 01 — collections as an editorial index; hovering a row
 *  develops its cover like a print in a darkroom. */
export function CollectionsChapter() {
  const collections = useCollections();
  const [active, setActive] = useState(0);
  const current = collections[active];

  return (
    <section className="container-x py-24 md:py-36" aria-label="Collections">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div>
          <p className="label-micro text-accent">Chapter One — Collections</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-6xl">
            Six chapters,
            <br />
            one wardrobe.
          </h2>
        </div>
        <Link
          href="/collections"
          className="group label-micro inline-flex items-center gap-2 text-ink hover:text-accent"
        >
          All collections
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Index list */}
        <div>
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline justify-between gap-6 border-b border-line py-5 text-left transition-colors first:border-t ${
                  active === i ? "text-accent" : "text-ink"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="label-micro w-8 text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                    {c.name}
                  </span>
                </span>
                <span className="label-micro text-ink-soft">{c.season}</span>
              </button>
              {/* Mobile cover */}
              <div className="mt-4 aspect-[16/9] overflow-hidden lg:hidden">
                <SmartImage
                  src={c.cover}
                  alt={c.name}
                  className="h-full w-full"
                  sizes="100vw"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Developing cover */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-surface">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current?.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <SmartImage
                  src={current?.cover}
                  alt={current?.name ?? ""}
                  className="h-full w-full"
                  sizes="40vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-8 pt-20">
                  <p className="label-micro text-bg/80">{current?.season}</p>
                  <p className="mt-2 font-display text-2xl text-bg">
                    {current?.story}
                  </p>
                  <Link
                    href={`/collections/${current?.slug}`}
                    className="label-micro mt-4 inline-flex items-center gap-2 border-b border-bg/60 pb-1 text-bg transition-colors hover:border-bg"
                  >
                    Enter {current?.name}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
