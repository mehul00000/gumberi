"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@catalog";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { SmartImage } from "@/components/ui/smart-image";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const [hovered, setHovered] = useState(false);
  const wished = wishlist.has(product.slug);
  const inWishlist = wishlist.hydrated && wished;

  return (
    <article
      className={cn("group relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            priority={priority}
            className="absolute inset-0"
            imgClassName={cn(
              "transition-all duration-700 ease-out",
              hovered && product.images[1]
                ? "scale-105 opacity-0"
                : "scale-100 opacity-100"
            )}
          />
          {product.images[1] ? (
            <SmartImage
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              category={product.category}
              className="absolute inset-0"
              imgClassName={cn(
                "transition-all duration-700 ease-out",
                hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
              )}
            />
          ) : null}

          {product.badges?.length ? (
            <div className="absolute left-3 top-3 flex gap-2">
              {product.badges.map((b) => (
                <Badge key={b} tone={b === "New" ? "ink" : "accent"}>
                  {b}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() =>
          wishlist.toggle({
            slug: product.slug,
            name: product.name,
            price: product.price,
            images: product.images,
          })
        }
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-card/90 text-ink backdrop-blur transition-colors hover:text-accent"
      >
        <Heart
          className={cn("h-4 w-4", inWishlist && "fill-accent text-accent")}
        />
      </button>

      {/* Quick add sizes */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-[4.7rem] hidden justify-center gap-1.5 px-3 transition-all duration-300 md:flex",
          hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {product.sizes.slice(0, 5).map((size) => (
          <button
            key={size}
            onClick={() =>
              add({
                productId: product.slug,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                size,
                color: product.colors[0]?.name ?? "Default",
              })
            }
            className="label-micro bg-card/95 px-2.5 py-2 text-ink shadow-sm backdrop-blur transition-colors hover:bg-accent hover:text-accent-ink"
          >
            {size}
          </button>
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-micro text-ink-soft">{product.category}</p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-1 font-display text-lg leading-snug text-ink transition-colors group-hover:text-accent">
                {product.name}
              </h3>
            </Link>
          </div>
          <Price price={product.price} compareAt={product.compareAt} size="sm" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Rating value={product.rating} reviews={product.reviews} />
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full border border-line"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
