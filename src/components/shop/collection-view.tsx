"use client";

import { useProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Shirt } from "lucide-react";

export function CollectionView({ slugs }: { slugs: string[] }) {
  const products = useProducts();
  const list = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="container-x py-14 md:py-20">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
          In this chapter
        </h2>
        <p className="text-sm text-ink-soft">{list.length} pieces</p>
      </div>
      {list.length === 0 ? (
        <EmptyState
          icon={Shirt}
          title="Still at the dyers"
          copy="This chapter's pieces are being finished right now."
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </div>
      )}
    </section>
  );
}
