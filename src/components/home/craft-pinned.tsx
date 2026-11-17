"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HERO } from "@catalog";
import { SmartImage } from "@/components/ui/smart-image";

const STEPS = [
  {
    label: "Cut",
    title: "Drafted, not digitised",
    copy: "Every pattern begins on paper in our Mumbai studio. A block is cut, toiled in cheap cotton, torn apart and recut — some silhouettes go through nine drafts before they earn fabric.",
    image: HERO.craft.cut,
  },
  {
    label: "Dye",
    title: "Slow vats, honest drift",
    copy: "Terracotta from madder root, indigo from natural vats fed for four centuries. Small batches mean every metre is a sibling of the next, never a twin.",
    image: HERO.craft.dye,
  },
  {
    label: "Stitch",
    title: "Finished by twenty-three hands",
    copy: "Hand-rolled hems, bar-tacked stress points, edges painted in eight passes. The finishing room adds 18% to our cost — and everything to how a piece ages.",
    image: HERO.craft.stitch,
  },
];

/** Pinned craft story — the section holds the screen while the
 *  argument advances: cut → dye → stitch. */
export function CraftPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const active = STEPS[step];

  return (
    <section ref={ref} className="relative h-[300svh]" aria-label="The making">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-surface">
        <div className="container-x grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text stack */}
          <div className="relative min-h-[22rem]">
            <p className="label-micro text-accent">Chapter Two — The Making</p>
            <div className="relative mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display text-4xl leading-[1.03] tracking-tight text-ink md:text-6xl">
                    {active.title}
                  </h2>
                  <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-ink-soft">
                    {active.copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step rail */}
            <div className="mt-10 flex items-center gap-6">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <button
                    onClick={() => {
                      // approximate scroll to the step
                      const el = ref.current;
                      if (el) {
                        const top = el.offsetTop + (el.offsetHeight / STEPS.length) * i + 8;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`label-micro transition-colors ${
                      i === step ? "text-accent" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 ? (
                    <span className="relative h-px w-10 bg-line md:w-16">
                      <motion.span
                        className="absolute inset-y-0 left-0 bg-accent"
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Image crossfade */}
          <div className="relative aspect-[4/5] max-h-[70svh] w-full overflow-hidden bg-card lg:aspect-auto lg:h-[70svh]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.label}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <SmartImage
                  src={active.image}
                  alt={active.label}
                  className="h-full w-full"
                  sizes="45vw"
                />
              </motion.div>
            </AnimatePresence>
            <span className="label-micro absolute bottom-4 right-4 bg-bg/80 px-3 py-1.5 text-ink backdrop-blur">
              {active.label} · Atelier No. 3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
