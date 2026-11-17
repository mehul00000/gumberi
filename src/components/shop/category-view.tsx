"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@catalog";
import { useProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SmartImage } from "@/components/ui/smart-image";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

/** Category landing — editorial banner + sortable grid. */
export function CategoryView({ category }: { category: string }) {
  const meta = CATEGORIES.find((c) => c.slug === category);
  const products = useProducts();
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let l = products.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        l = [...l].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        l = [...l].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        l = [...l].sort((a, b) => b.rating - a.rating);
        break;
    }
    return l;
  }, [products, category, sort]);

  if (!meta) {
    return (
      <div className="container-x py-24">
        <EmptyState
          icon={ChevronRight}
          title="Unknown aisle"
          copy="That category does not exist in the atelier."
          action={{ href: "/shop", label: "Back to the shop" }}
        />
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="relative flex min-h-[46svh] items-end overflow-hidden">
        <SmartImage
          src={meta.image}
          alt={meta.name}
          priority
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />
        <div className="container-x relative pb-12 pt-32">
          <p className="label-micro text-bg/75">{meta.tagline}</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-bg md:text-7xl">
            {meta.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-bg/85">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="container-x flex items-center justify-between border-b border-line py-4">
        <p className="text-sm text-ink-soft">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="label-micro border border-line bg-card px-3 py-2 text-ink focus:outline-none"
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price · low to high</option>
          <option value="price-desc">Price · high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      {/* Grid or rail */}
      <div className="container-x py-12">
        {list.length === 0 ? (
          <EmptyState
            icon={ChevronRight}
            title="Quiet in this aisle"
            copy="This category is between dye lots right now."
            action={{ href: "/shop", label: "Browse everything" }}
          />
        ) : (
          <>
            {/* Mobile rail */}
            <div className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 lg:hidden">
              {list.map((p) => (
                <div key={p.slug} className="w-[72vw] shrink-0 snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            {/* Desktop grid */}
            <div className="hidden grid-cols-3 gap-x-6 gap-y-14 lg:grid">
              {list.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Other categories */}
      <section className="border-t border-line bg-surface">
        <div className="container-x flex items-center justify-between py-10">
          <p className="label-micro text-ink-soft">Keep walking</p>
          <div className="flex items-center gap-2">
            {CATEGORIES.filter((c) => c.slug !== category)
              .slice(0, 4)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  className="label-micro border border-line px-3 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
