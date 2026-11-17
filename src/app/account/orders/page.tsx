"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useAuthUser } from "@/components/providers/auth-provider";
import { useConvexEnabled, useLiveQuery } from "@/lib/backend";
import { localOrders } from "@/lib/orders";
import { EmptyState } from "@/components/ui/empty-state";
import { SmartImage } from "@/components/ui/smart-image";
import { formatINR } from "@/lib/format";
import type { OrderDoc } from "@/components/providers/types";

export default function OrdersPage() {
  const { user, mode } = useAuthUser();
  const convexEnabled = useConvexEnabled();

  const [visitorId, setVisitorId] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisitorId(localStorage.getItem("gumberi_vid"));
  }, []);

  const ownerKey =
    mode === "clerk" && user
      ? `user:${user.id}`
      : visitorId
        ? `anon:${visitorId}`
        : null;

  const serverOrders = useLiveQuery(
    api.orders.listByOwner as never,
    convexEnabled && ownerKey ? { ownerKey } : "skip",
    [] as OrderDoc[]
  );
  const orders = convexEnabled ? serverOrders : localOrders();

  return (
    <div className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-micro text-accent">Account</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-6xl">
            Orders
          </h1>
        </div>
        <Link href="/account" className="label-micro text-ink-soft hover:text-accent">
          ← Account home
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={Package}
            title="No orders yet"
            copy="When you place one, its whole journey — cutting, dyeing, dispatch — will be tracked here."
            action={{ href: "/shop", label: "Find your first piece" }}
          />
        </div>
      ) : (
        <ul className="mt-12 space-y-6">
          {orders.map((o) => (
            <li key={o.number} className="border border-line bg-surface">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{o.number}</p>
                  <p className="text-xs text-ink-soft">
                    Placed{" "}
                    {new Date(o.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="label-micro bg-sage/15 px-2.5 py-1 text-sage">
                  {o.status}
                </span>
                <p className="text-sm font-medium text-ink">
                  {formatINR(o.total)}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 px-6 py-5">
                {o.items.map((item) => (
                  <Link
                    key={item.slug + item.size}
                    href={`/product/${item.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-12 shrink-0"
                    />
                    <span className="hidden sm:block">
                      <span className="block text-sm font-medium text-ink group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="block text-xs text-ink-soft">
                        {item.color} · {item.size} · ×{item.qty}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-line px-6 py-4 text-xs text-ink-soft">
                Ship to — {o.name}, {o.address}, {o.city} {o.pincode}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
