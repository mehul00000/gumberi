"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { HERO } from "@catalog";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";

/** Full-bleed parallax interlude. */
export function LookbookPeek() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative h-[82svh] overflow-hidden"
      aria-label="Lookbook"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.28]">
        <SmartImage
          src={HERO.lookbook}
          alt="Ivory Hour lookbook frame"
          category="women"
          className="h-full w-full"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/35" />
      <div className="container-x absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="label-micro text-bg/80">The Ivory Hour · Lookbook</p>
        <blockquote className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-bg md:text-6xl">
          “Eleven looks, ninety minutes, one borrowed bungalow in Kochi.”
        </blockquote>
        <ButtonLink
          href="/lookbook"
          variant="ink"
          size="lg"
          className="mt-10 border border-bg/40 bg-transparent text-bg hover:bg-bg hover:text-ink"
        >
          Open the lookbook
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
