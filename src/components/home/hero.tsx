"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { HERO } from "@catalog";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";

const LINES = [
  { text: "Dress like", italic: false },
  { text: "the golden", italic: true },
  { text: "hour.", italic: false },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const threadLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section ref={ref} className="relative h-[94svh] overflow-hidden" aria-label="Gumberi hero">
      {/* Parallax backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <SmartImage
          src={HERO.images[0]}
          alt="Gumberi Summer '26 editorial"
          category="women"
          priority
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/40 dark:via-bg/45 dark:to-bg/55" />
      </motion.div>

      {/* Signature move — the thread that draws itself as you scroll */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M -40 780 C 240 700, 420 840, 720 720 S 1180 560, 1500 640"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: threadLength }}
          opacity={0.85}
        />
        <motion.circle
          r="5"
          fill="var(--accent)"
          style={{
            offsetPath:
              'path("M -40 780 C 240 700, 420 840, 720 720 S 1180 560, 1500 640")',
            offsetDistance: "0%",
          }}
          className="hidden"
        />
      </svg>

      {/* Copy */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container-x absolute inset-x-0 bottom-[9%]"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="label-micro text-accent"
        >
          Summer &apos;26 · The Terracotta Chapter
        </motion.p>
        <h1 className="mt-4 font-display text-[15vw] leading-[0.95] tracking-[-0.02em] text-ink sm:text-[11vw] lg:text-[8.5vw]">
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                className={`block ${line.italic ? "italic text-accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/collections/terracotta-summer" size="lg">
            Explore the collection
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/lookbook" variant="ghost" size="lg" className="text-ink">
            View the lookbook
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-[6%] right-6 hidden flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="label-micro rotate-90 text-ink-soft">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-line">
          <span className="animate-cue absolute inset-x-0 h-1/2 bg-accent" />
        </span>
      </motion.div>
    </section>
  );
}
