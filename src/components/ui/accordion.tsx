"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { title: string; content: ReactNode | string };

export function Accordion({
  items,
  defaultOpen = -1,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium tracking-wide text-ink">
                {item.title}
              </span>
              <Plus
                className={cn(
                  "h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300",
                  isOpen && "rotate-45 text-accent"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm leading-relaxed text-ink-soft">
                    {typeof item.content === "string" ? (
                      <p>{item.content}</p>
                    ) : (
                      item.content
                    )}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
