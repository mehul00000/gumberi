"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@catalog";
import { CATEGORIES } from "@catalog";
import { useProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "rating", label: "Top rated" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];
const MAX_PRICE = 12000;

export function ShopView({
  initialQuery = "",
  lockedCategory,
}: {
  initialQuery?: string;
  lockedCategory?: string;
}) {
  const products = useProducts();
  const [categories, setCategories] = useState<string[]>(
    lockedCategory ? [lockedCategory] : []
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = initialQuery.trim().toLowerCase();
    let list: Product[] = products;
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.collection.includes(q)
      );
    }
    if (categories.length > 0) {
      list = list.filter((p) => categories.includes(p.category));
    }
    if (sizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    }
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [products, initialQuery, categories, sizes, maxPrice, sort]);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const filterPanel = (
    <div className="space-y-8">
      {!lockedCategory ? (
        <div>
          <p className="label-micro mb-3 text-ink">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategories((a) => toggle(a, c.slug))}
                className={cn(
                  "label-micro border px-3 py-1.5 transition-colors",
                  categories.includes(c.slug)
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line text-ink-soft hover:border-accent hover:text-accent"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="label-micro mb-3 text-ink">Size</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((a) => toggle(a, s))}
              className={cn(
                "label-micro min-w-9 border px-2.5 py-1.5 text-center transition-colors",
                sizes.includes(s)
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line text-ink-soft hover:border-accent hover:text-accent"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-micro mb-3 text-ink">Up to</p>
        <input
          type="range"
          min={1500}
          max={MAX_PRICE}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-ink-soft">
          ₹{maxPrice.toLocaleString("en-IN")}
          {maxPrice === MAX_PRICE ? " + everything" : ""}
        </p>
      </div>

      <button
        onClick={() => {
          setCategories([]);
          setSizes([]);
          setMaxPrice(MAX_PRICE);
        }}
        className="text-xs text-ink-soft underline-offset-2 hover:text-accent hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">{filterPanel}</div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-ink-soft">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="label-micro inline-flex items-center gap-2 border border-line px-3 py-2 text-ink lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="label-micro border border-line bg-card px-3 py-2 text-ink focus:outline-none"
              aria-label="Sort products"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters — mobile */}
        {filtersOpen ? (
          <div className="mb-8 border border-line bg-surface p-6 lg:hidden">{filterPanel}</div>
        ) : null}

        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nothing on this rail"
            copy="No pieces match this combination. Loosen a filter — the golden hour forgives."
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
