"use client";

import { api } from "../../convex/_generated/api";
import type { Collection, JournalPost, Product } from "@catalog";
import {
  bySlug,
  postBySlug,
  PRODUCTS,
  JOURNAL,
  COLLECTIONS,
} from "@catalog";
import { useLiveQuery } from "./backend";

/** All products — live from Convex when connected, bundled catalog otherwise. */
export function useProducts(): Product[] {
  return useLiveQuery(api.products.list, {}, PRODUCTS);
}

export function useProduct(slug: string): Product | undefined {
  return useLiveQuery(api.products.bySlug, { slug }, bySlug(slug));
}

export function useProductsByCategory(category: string): Product[] {
  return useLiveQuery(
    api.products.byCategory,
    { category },
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category)
  );
}

/** Collections are static editorial content — served from the bundled catalog. */
export function useCollections(): Collection[] {
  return COLLECTIONS;
}

export function useCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function usePosts(): JournalPost[] {
  return useLiveQuery(api.journal.list, {}, JOURNAL);
}

export function usePost(slug: string): JournalPost | undefined {
  return useLiveQuery(api.journal.bySlug, { slug }, postBySlug(slug));
}
