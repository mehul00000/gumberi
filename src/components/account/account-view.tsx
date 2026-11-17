"use client";

import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { UserCircle2, Package, Heart, Settings } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CLERK_ENABLED, useAuthUser } from "@/components/providers/auth-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { useConvexEnabled, useLiveQuery } from "@/lib/backend";
import { localOrders } from "@/lib/orders";
import { ButtonLink } from "@/components/ui/button";
import type { OrderDoc } from "@/components/providers/types";

export function AccountView() {
  const { user, mode, isLoaded } = useAuthUser();
  const wishlist = useWishlist();
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

  if (!isLoaded) {
    return <div className="container-x py-24" />;
  }

  // Clerk mode, signed out → gate.
  if (mode === "clerk" && !user) {
    return (
      <div className="container-x max-w-lg py-24 text-center">
        <UserCircle2 className="mx-auto h-10 w-10 text-accent" strokeWidth={1.4} />
        <h1 className="mt-6 font-display text-4xl text-ink">
          This page is members-only
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sign in to see your orders, saved sizes and the Ivory Hour letter
          archive.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/sign-in">Sign in</ButtonLink>
          <ButtonLink href="/sign-up" variant="outline">
            Create account
          </ButtonLink>
        </div>
      </div>
    );
  }

  const displayName = user?.name ?? "Guest";

  return (
    <div className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {CLERK_ENABLED ? (
            <UserButton />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-xl text-accent-ink">
              {user?.initials ?? "G"}
            </span>
          )}
          <div>
            <p className="label-micro text-accent">
              {mode === "demo" ? "Demo session" : "Signed in"}
            </p>
            <h1 className="mt-1 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Hello, {displayName}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">{user?.email}</p>
          </div>
        </div>
        <ButtonLink href="/account/profile" variant="outline">
          <Settings className="h-4 w-4" /> Profile
        </ButtonLink>
      </div>

      {/* Stats */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Link
          href="/account/orders"
          className="group border border-line bg-surface p-7 transition-colors hover:border-accent"
        >
          <Package className="h-5 w-5 text-accent" strokeWidth={1.6} />
          <p className="mt-4 font-display text-4xl text-ink">{orders.length}</p>
          <p className="label-micro mt-1 text-ink-soft group-hover:text-accent">
            Orders placed
          </p>
        </Link>
        <Link
          href="/wishlist"
          className="group border border-line bg-surface p-7 transition-colors hover:border-accent"
        >
          <Heart className="h-5 w-5 text-accent" strokeWidth={1.6} />
          <p className="mt-4 font-display text-4xl text-ink">{wishlist.count}</p>
          <p className="label-micro mt-1 text-ink-soft group-hover:text-accent">
            Saved pieces
          </p>
        </Link>
        <Link
          href="/match"
          className="group border border-line bg-surface p-7 transition-colors hover:border-accent"
        >
          <span className="font-display text-2xl text-accent">G</span>
          <p className="mt-3 font-display text-4xl text-ink">Match</p>
          <p className="label-micro mt-1 text-ink-soft group-hover:text-accent">
            Your game rank
          </p>
        </Link>
      </div>

      {/* Recent orders */}
      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl text-ink">Recent orders</h2>
          <Link href="/account/orders" className="label-micro text-ink-soft hover:text-accent">
            All orders →
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-ink-soft">
            No orders yet — the first one is the hardest.
            <Link href="/shop" className="ml-2 text-accent underline-offset-2 hover:underline">
              Start here
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {orders.slice(0, 3).map((o) => (
              <li key={o.number} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-medium text-ink">{o.number}</p>
                  <p className="text-xs text-ink-soft">
                    {new Date(o.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {o.items.length} items
                  </p>
                </div>
                <span className="label-micro bg-sage/15 px-2.5 py-1 text-sage">
                  {o.status}
                </span>
                <p className="text-sm text-ink">{`₹${o.total.toLocaleString("en-IN")}`}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
