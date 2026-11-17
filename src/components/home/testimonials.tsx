"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "The Sahara Trench is the first coat I have owned that looks better in person than on the model. The dye drift is real and I love mine for it.",
    author: "Ritika S.",
    detail: "Bengaluru · wears the Sahara in Terracotta",
  },
  {
    text: "I bought the linen co-ord for a Goa wedding and ended up living in it for a month. It creases like it is telling you a story.",
    author: "Dev A.",
    detail: "Mumbai · Loom Linen Co-ord",
  },
  {
    text: "Someone at the airport asked if my slip dress was vintage. It is two weeks old. That is Gumberi in one sentence.",
    author: "Meher K.",
    detail: "Delhi · Aurelia Slip Dress",
  },
];

/** One quote at a time — no wall of identical cards. */
export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const quote = QUOTES[index];

  return (
    <section className="border-y border-line bg-card" aria-label="Wearers">
      <div className="container-x flex min-h-[24rem] flex-col items-center justify-center py-20 text-center">
        <p className="label-micro text-gold">Worn & said</p>
        <div className="relative mt-8 flex min-h-[12rem] w-full max-w-3xl items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="text-sm font-medium text-ink">{quote.author}</span>
                <span className="mt-1 block text-xs text-ink-soft">{quote.detail}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            aria-label="Previous quote"
            onClick={() => setIndex((index - 1 + QUOTES.length) % QUOTES.length)}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                aria-label={`Quote ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-accent" : "bg-line"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next quote"
            onClick={() => setIndex((index + 1) % QUOTES.length)}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
