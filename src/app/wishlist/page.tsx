"use client";

import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { SmartImage } from "@/components/ui/smart-image";
import { useProducts } from "@/lib/data";
import type { Product } from "@catalog";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const cart = useCart();
  const products = useProducts();

  if (!wishlist.hydrated) {
    return <div className="container-x py-24" />;
  }

  const detailed = wishlist.items
    .map((w) => products.find((p) => p.slug === w.slug))
    .filter((p): p is Product => Boolean(p));

  function moveToBag(product: Product) {
    cart.add({
      productId: product.slug,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0]?.name ?? "Default",
    });
  }

  return (
    <div className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl tracking-tight text-ink md:text-6xl">
          Wishlist
        </h1>
        <p className="text-sm text-ink-soft">
          {wishlist.count} saved {wishlist.count === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {detailed.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={Heart}
            title="No saves yet"
            copy="Tap the heart on any piece to pin it here for the next dye drop."
            action={{ href: "/shop", label: "Browse the shop" }}
          />
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {detailed.map((p) => (
            <li key={p.slug} className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center">
              <Link href={`/product/${p.slug}`} className="shrink-0">
                <SmartImage src={p.images[0]} alt={p.name} className="h-40 w-32" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-micro text-ink-soft">{p.category}</p>
                    <Link
                      href={`/product/${p.slug}`}
                      className="font-display text-2xl text-ink hover:text-accent"
                    >
                      {p.name}
                    </Link>
                    <div className="mt-2">
                      <Rating value={p.rating} reviews={p.reviews} />
                    </div>
                  </div>
                  <Price price={p.price} compareAt={p.compareAt} />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <ButtonLink
                    href={`/product/${p.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    Choose size
                  </ButtonLink>
                  <button
                    onClick={() => moveToBag(p)}
                    className="label-micro bg-ink px-4 py-2.5 text-bg transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    Quick add · {p.sizes[0]}
                  </button>
                  <button
                    onClick={() => wishlist.remove(p.slug)}
                    className="ml-auto flex items-center gap-1.5 text-xs text-ink-soft hover:text-accent"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
