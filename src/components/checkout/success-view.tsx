"use client";

import { CheckCircle2, Package } from "lucide-react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { useConvexEnabled, useLiveQuery } from "@/lib/backend";
import { localOrderByNumber, type OrderRecord } from "@/lib/orders";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { formatINR } from "@/lib/format";
import type { OrderDoc } from "@/components/providers/types";

export function SuccessView({ number }: { number: string }) {
  const convexEnabled = useConvexEnabled();

  const serverOrder = useLiveQuery(
    api.orders.byNumber as never,
    convexEnabled && number ? { number } : "skip",
    undefined as OrderDoc | undefined
  );

  const local = convexEnabled ? undefined : localOrderByNumber(number);
  const order: OrderDoc | OrderRecord | undefined = convexEnabled
    ? serverOrder
    : local;

  return (
    <div className="container-x max-w-3xl py-16 text-center md:py-24">
      <CheckCircle2 className="mx-auto h-12 w-12 text-sage" strokeWidth={1.4} />
      <h1 className="mt-6 font-display text-4xl tracking-tight text-ink md:text-6xl">
        Thank you — it is in the queue.
      </h1>
      {order ? (
        <>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Order <span className="font-semibold text-ink">{order.number}</span> is
            confirmed. A receipt is on its way to{" "}
            <span className="text-ink">{order.email}</span>. Hand-finished pieces
            leave the loft in 2–4 working days.
          </p>

          <div className="mt-10 border border-line bg-surface p-7 text-left">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-accent" />
              <p className="label-micro text-ink">What is coming</p>
            </div>
            <ul className="mt-5 divide-y divide-line">
              {order.items.map((item) => (
                <li
                  key={item.slug + item.size + item.color}
                  className="flex items-center gap-4 py-3"
                >
                  <SmartImage src={item.image} alt={item.name} className="h-16 w-12 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-soft">
                      {item.color} · {item.size} · ×{item.qty}
                    </p>
                  </div>
                  <p className="text-sm text-ink">
                    {formatINR(item.price * item.qty)}
                  </p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping to</dt>
                <dd className="max-w-[60%] text-right text-ink">
                  {order.name}, {order.city} — {order.pincode}
                </dd>
              </div>
              <div className="flex justify-between text-base">
                <dt className="font-medium text-ink">Total paid</dt>
                <dd className="font-medium text-ink">{formatINR(order.total)}</dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-ink-soft">
          We could not find order {number || "—"} in this browser or backend.
          If you just placed it, it may still be syncing.
        </p>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/account/orders">Track in your orders</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Continue shopping
        </ButtonLink>
        <Link
          href="/match"
          className="self-center px-2 text-xs text-ink-soft underline-offset-2 hover:text-accent hover:underline"
        >
          or play Match the Look while you wait →
        </Link>
      </div>
    </div>
  );
}
