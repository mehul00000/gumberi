"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "@/lib/data";
import { formatINR } from "@/lib/format";
import { SmartImage } from "@/components/ui/smart-image";

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const products = useProducts();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          p.collection.toLowerCase().includes(needle)
      )
      .slice(0, 6);
  }, [q, products]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl border border-line bg-card shadow-2xl"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-line">
              <Search className="ml-4 h-4 w-4 text-ink-soft" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search silk, linen, hoops…"
                className="h-14 w-full bg-transparent px-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="mr-3 flex h-8 w-8 items-center justify-center text-ink-soft hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {q.trim() === "" ? (
                <div className="px-5 py-6">
                  <p className="label-micro text-ink-soft">Trending</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Slip dress", "Linen", "Trench", "Hoops", "Denim"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setQ(t)}
                          className="label-micro border border-line px-3 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-ink-soft">
                  Nothing matches “{q}”. Try “linen” or “silk”.
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-surface"
                      >
                        <SmartImage
                          src={p.images[0]}
                          alt={p.name}
                          category={p.category}
                          className="h-14 w-11 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-ink">
                            {p.name}
                          </p>
                          <p className="label-micro text-ink-soft">{p.category}</p>
                        </div>
                        <span className="text-sm text-ink">
                          {formatINR(p.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
