"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SmartImage } from "@/components/ui/smart-image";
import { FREE_SHIP_THRESHOLD, formatINR, shippingFor } from "@/lib/format";

export default function CartPage() {
  const cart = useCart();
  const shipping = shippingFor(cart.subtotal);

  if (!cart.hydrated) {
    return <div className="container-x py-24" />;
  }

  return (
    <div className="container-x py-14 md:py-20">
      <h1 className="font-display text-4xl tracking-tight text-ink md:text-6xl">
        Your bag
      </h1>

      {cart.lines.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={ShoppingBag}
            title="Nothing in the bag yet"
            copy="The Terracotta Summer chapter is open — the trench is waiting."
            action={{ href: "/shop", label: "Start shopping" }}
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          {/* Lines */}
          <ul className="divide-y divide-line border-y border-line">
            {cart.lines.map((line) => (
              <li key={line.key} className="flex gap-5 py-6">
                <Link href={`/product/${line.slug}`} className="shrink-0">
                  <SmartImage
                    src={line.image}
                    alt={line.name}
                    className="h-32 w-24"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-display text-xl text-ink hover:text-accent"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-soft">
                        {line.color} · Size {line.size}
                      </p>
                    </div>
                    <Price price={line.price * line.qty} />
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper
                      qty={line.qty}
                      onChange={(q) => cart.setQty(line.key, q)}
                    />
                    <button
                      onClick={() => cart.remove(line.key)}
                      className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-accent"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line bg-surface p-7">
              <h2 className="label-micro text-ink">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="text-ink">{formatINR(cart.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="text-ink">
                    {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                  <dt className="font-medium text-ink">Total</dt>
                  <dd className="font-medium text-ink">
                    {formatINR(cart.subtotal + shipping)}
                  </dd>
                </div>
              </dl>
              {cart.subtotal < FREE_SHIP_THRESHOLD ? (
                <p className="mt-4 text-xs text-ink-soft">
                  Add {formatINR(FREE_SHIP_THRESHOLD - cart.subtotal)} more for
                  complimentary shipping.
                </p>
              ) : null}
              <ButtonLink href="/checkout" className="mt-6 w-full" size="lg">
                Proceed to checkout
              </ButtonLink>
              <Link
                href="/shop"
                className="mt-4 block text-center text-xs text-ink-soft hover:text-accent"
              >
                or keep browsing →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
