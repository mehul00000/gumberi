"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";

export type Frame = {
  image: string;
  chapter: string;
  caption: string;
  look: string;
};

/** One full-bleed lookbook frame with internal parallax. */
export function ParallaxFrame({ frame, index }: { frame: Frame; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const flip = index % 2 === 1;

  return (
    <section ref={ref} className="relative py-6 md:py-10">
      <div
        className={`grid items-end gap-6 md:grid-cols-12 md:gap-10 ${
          flip ? "" : ""
        }`}
      >
        <div className={`relative md:col-span-8 ${flip ? "md:order-2" : ""}`}>
          <div className="relative aspect-[16/11] overflow-hidden bg-surface md:aspect-[16/9]">
            <motion.div style={{ y }} className="absolute inset-0 scale-[1.26]">
              <SmartImage
                src={frame.image}
                alt={frame.caption}
                className="h-full w-full"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </motion.div>
            <span className="label-micro absolute left-4 top-4 bg-bg/85 px-3 py-1.5 text-ink backdrop-blur">
              {frame.look}
            </span>
          </div>
        </div>
        <div className={`md:col-span-4 ${flip ? "md:order-1 md:text-right" : ""}`}>
          <p className="label-micro text-accent">{frame.chapter}</p>
          <p className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            {frame.caption}
          </p>
        </div>
      </div>
    </section>
  );
}

export function LookbookClosing() {
  return (
    <section className="container-x py-20 text-center md:py-28">
      <p className="label-micro text-accent">End of reel</p>
      <h2 className="mx-auto mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
        Every frame is a real order you can place.
      </h2>
      <ButtonLink href="/shop" size="lg" className="mt-10">
        Shop the frames
      </ButtonLink>
    </section>
  );
}
