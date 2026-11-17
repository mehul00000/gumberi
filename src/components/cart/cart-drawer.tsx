"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useCart, type CartLine } from "@/components/providers/cart-provider";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SmartImage } from "@/components/ui/smart-image";
import { useProducts } from "@/lib/data";
import { formatINR } from "@/lib/format";
import type { Product } from "@catalog";
import { FREE_SHIP_THRESHOLD, shippingFor } from "@/lib/format";

const EASE = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Suggestion source, Magento-cart-popup style: pieces related to the
 * last-added product (same collection) first, then fresh arrivals —
 * always excluding whatever is already in the bag.
 */
function useSuggestions(lines: CartLine[], lastAddedKey: string | null): Product[] {
  const products = useProducts();

  return useMemo(() => {
    const inBag = new Set(lines.map((l) => l.productId));
    const pool = products.filter((p) => !inBag.has(p.slug));
    const lastAdded = lines.find((l) => l.key === lastAddedKey);
    const lastProduct = lastAdded
      ? products.find((p) => p.slug === lastAdded.productId)
      : undefined;

    const related = pool.filter((p) => p.collection === lastProduct?.collection);
    const fresh = pool.filter((p) => p.badges?.includes("New"));
    const picked = new Set(related);
    for (const p of fresh) picked.add(p);
    for (const p of pool) picked.add(p);
    return [...picked].slice(0, 3);
  }, [lines, lastAddedKey, products]);
}

/**
 * The cart popup — a quiet-luxury take on the add-to-cart popup:
 * glass backdrop, a "just added" confirmation hero, suggested pieces
 * with one-tap add, a shipping "thread" meter, and one confident CTA
 * into the cart.
 */
export function CartDrawer() {
  const cart = useCart();
  const pathname = usePathname();
  const suggestions = useSuggestions(cart.lines, cart.lastAddedKey);
  const lastAddedLine = cart.lines.find((l) => l.key === cart.lastAddedKey);

  // Close the drawer on navigation.
  useEffect(() => {
    cart.closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Esc to close + body scroll lock while open.
  useEffect(() => {
    if (!cart.drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.drawerOpen]);

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - cart.subtotal);
  const progress = Math.min(100, (cart.subtotal / FREE_SHIP_THRESHOLD) * 100);
  const unlocked = remaining === 0;

  return (
    <AnimatePresence>
      {cart.drawerOpen ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Glass backdrop */}
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            onClick={cart.closeDrawer}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[30rem] flex-col bg-card shadow-2xl"
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* Signature thread */}
            <motion.div
              className="h-[3px] w-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-7 pb-5 pt-6">
              <div>
                <p className="label-micro text-ink-soft">
                  Gumberi · Atelier No. 3
                </p>
                <h2 className="mt-1.5 font-display text-3xl tracking-tight text-ink">
                  Your{" "}
                  <span className="italic text-accent">selection</span>
                  <span className="ml-2 align-middle text-sm text-ink-soft">
                    ({cart.count})
                  </span>
                </h2>
              </div>
              <button
                onClick={cart.closeDrawer}
                aria-label="Close bag"
                className="group flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {cart.lines.length === 0 ? (
              /* ── Empty state ── */
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
                <BrandMark className="h-14 w-14 animate-float" />
                <div>
                  <p className="font-display text-3xl tracking-tight text-ink">
                    Nothing chosen{" "}
                    <span className="italic text-accent">yet</span>
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    The golden hour is best experienced dressed. The
                    Terracotta chapter is open.
                  </p>
                </div>
                <ButtonLink
                  href="/shop"
                  onClick={cart.closeDrawer}
                  size="lg"
                  className="w-full"
                >
                  Start shopping
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            ) : (
              <>
                {/* Shipping thread meter */}
                <div className="border-b border-line px-7 py-5">
                  <div className="flex items-center justify-between">
                    {unlocked ? (
                      <p className="flex items-center gap-2 text-xs text-gold">
                        <Check className="h-3.5 w-3.5" />
                        <span className="label-micro">
                          Complimentary shipping unlocked
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-ink-soft">
                        <span className="font-medium text-ink">
                          {formatINR(remaining)}
                        </span>{" "}
                        from complimentary shipping
                      </p>
                    )}
                    <span className="label-micro text-[0.55rem] text-ink-soft">
                      {formatINR(FREE_SHIP_THRESHOLD)}
                    </span>
                  </div>
                  <div className="relative mt-3 h-px w-full bg-line">
                    <motion.div
                      className={`absolute inset-y-0 left-0 ${unlocked ? "bg-gold" : "bg-accent"}`}
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                    <motion.span
                      className={`absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full ${unlocked ? "bg-gold" : "bg-accent"}`}
                      initial={false}
                      animate={{ left: `calc(${progress}% - 3px)` }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Just-added confirmation hero */}
                  <AnimatePresence>
                    {lastAddedLine ? (
                      <motion.div
                        key={lastAddedLine.key}
                        className="mx-7 mt-5 flex items-center gap-4 border border-gold/40 bg-gold/10 p-3.5"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20">
                          <Check className="h-4 w-4 text-gold" />
                        </span>
                        <SmartImage
                          src={lastAddedLine.image}
                          alt={lastAddedLine.name}
                          className="h-14 w-11 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="label-micro text-[0.55rem] text-gold">
                            Added to your selection
                          </p>
                          <p className="truncate font-display text-base leading-snug text-ink">
                            {lastAddedLine.name}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm text-ink-soft">
                          {formatINR(lastAddedLine.price * lastAddedLine.qty)}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Pieces */}
                  <motion.ul
                    className="divide-y divide-line px-7"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <AnimatePresence initial={false}>
                      {cart.lines.map((line) => (
                        <motion.li
                          key={line.key}
                          layout
                          variants={itemVariants}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="flex gap-5 py-6"
                        >
                          <Link
                            href={`/product/${line.slug}`}
                            onClick={cart.closeDrawer}
                            className="group relative shrink-0 overflow-hidden"
                          >
                            <SmartImage
                              src={line.image}
                              alt={line.name}
                              className="h-28 w-[5.5rem]"
                              imgClassName="transition-transform duration-700 group-hover:scale-110"
                            />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  href={`/product/${line.slug}`}
                                  onClick={cart.closeDrawer}
                                  className="block font-display text-lg leading-snug tracking-tight text-ink transition-colors hover:text-accent"
                                >
                                  {line.name}
                                </Link>
                                <p className="label-micro mt-1 text-[0.55rem] text-ink-soft">
                                  {line.color} · {line.size}
                                </p>
                              </div>
                              <p className="shrink-0 text-sm text-ink">
                                {formatINR(line.price * line.qty)}
                              </p>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <QuantityStepper
                                qty={line.qty}
                                onChange={(q) => cart.setQty(line.key, q)}
                                className="border-line/70"
                              />
                              <button
                                onClick={() => cart.remove(line.key)}
                                className="text-xs text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>

                  {/* You may also like — the add-to-cart suggestion strip */}
                  {suggestions.length > 0 ? (
                    <div className="px-7 pb-8 pt-2">
                      <p className="font-display text-lg italic tracking-tight text-ink">
                        You may also <span className="text-accent">like</span>
                      </p>
                      <div className="no-scrollbar mt-4 flex snap-x gap-4 overflow-x-auto">
                        {suggestions.map((p) => (
                          <div key={p.slug} className="w-36 shrink-0 snap-start">
                            <div className="group relative overflow-hidden bg-surface">
                              <Link
                                href={`/product/${p.slug}`}
                                onClick={cart.closeDrawer}
                              >
                                <SmartImage
                                  src={p.images[0]}
                                  alt={p.name}
                                  category={p.category}
                                  className="aspect-[4/5] w-full"
                                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                                  sizes="144px"
                                />
                              </Link>
                              <button
                                aria-label={`Add ${p.name} to bag`}
                                title={`Add ${p.name} — ${formatINR(p.price)}`}
                                onClick={() =>
                                  cart.add({
                                    productId: p.slug,
                                    slug: p.slug,
                                    name: p.name,
                                    image: p.images[0],
                                    price: p.price,
                                    size: p.sizes[0],
                                    color: p.colors[0]?.name ?? "Default",
                                  })
                                }
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-card/90 text-ink backdrop-blur transition-colors hover:bg-accent hover:text-accent-ink"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="mt-2 truncate text-xs text-ink">
                              {p.name}
                            </p>
                            <p className="text-xs text-ink-soft">
                              {formatINR(p.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Footer */}
                <div className="border-t border-line bg-surface px-7 pb-7 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="label-micro text-ink-soft">Subtotal</span>
                    <span className="font-display text-2xl tracking-tight text-ink">
                      {formatINR(cart.subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    Shipping{" "}
                    {shippingFor(cart.subtotal) === 0 ? (
                      <span className="text-gold">complimentary</span>
                    ) : (
                      formatINR(shippingFor(cart.subtotal))
                    )}{" "}
                    · duties included
                  </p>

                  <ButtonLink
                    href="/cart"
                    onClick={cart.closeDrawer}
                    size="lg"
                    className="mt-5 w-full"
                  >
                    Go to cart
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </ButtonLink>
                  <ButtonLink
                    href="/checkout"
                    onClick={cart.closeDrawer}
                    variant="outline"
                    className="mt-3 w-full"
                  >
                    Straight to checkout
                  </ButtonLink>
                  <button
                    onClick={cart.closeDrawer}
                    className="mx-auto mt-4 block text-xs text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    Continue browsing
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
