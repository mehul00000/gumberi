"use client";

import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { useProducts } from "@/lib/data";

/**
 * Adds every piece of a styled combination to the bag
 * (default size + first colour) in one tap.
 */
export function AddLookButton({
  slugs,
  className,
  size,
  disabled = false,
}: {
  slugs: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  const products = useProducts();
  const { add } = useCart();

  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const total = items.reduce((n, p) => n + p.price, 0);

  return (
    <Button
      className={className}
      size={size}
      disabled={disabled || items.length === 0}
      onClick={() => {
        for (const p of items) {
          add({
            productId: p.slug,
            slug: p.slug,
            name: p.name,
            image: p.images[0],
            price: p.price,
            size: p.sizes[0],
            color: p.colors[0]?.name ?? "Default",
          });
        }
      }}
    >
      Add the look — {formatINR(total)}
    </Button>
  );
}
