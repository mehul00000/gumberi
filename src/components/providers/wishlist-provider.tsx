"use client";

import { api } from "../../../convex/_generated/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { WishlistItemDoc } from "./types";
import { useAuthUser } from "./auth-provider";
import { useConvexClient, useConvexEnabled, useWatchQuery } from "@/lib/backend";
import { getVisitorId } from "@/lib/visitor";
import type { Product } from "@catalog";

export type WishItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type WishlistApi = {
  items: WishItem[];
  count: number;
  hydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (product: Pick<Product, "slug" | "name" | "price" | "images"> & { slug: string }) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistApi | null>(null);

export function useWishlist(): WishlistApi {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}

const LOCAL_KEY = "gumberi_wishlist";

function toItem(product: { slug: string; name: string; price: number; images: string[] }): WishItem {
  return {
    productId: product.slug,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0],
  };
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { mode, user } = useAuthUser();
  const convexEnabled = useConvexEnabled();
  const convex = useConvexClient();

  const [items, setItems] = useState<WishItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const itemsRef = useRef<WishItem[]>([]);
  const adoptedRef = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisitorId(getVisitorId());
    try {
       
      setItems(JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "[]"));
    } catch {
       
      setItems([]);
    }
     
    setHydrated(true);
  }, []);

  const ownerKey =
    mode === "clerk" && user
      ? `user:${user.id}`
      : visitorId
        ? `anon:${visitorId}`
        : null;

  const serverItems = useWatchQuery<WishlistItemDoc[]>(
    api.wishlist.list,
    convexEnabled && ownerKey ? { ownerKey } : null
  );

  useEffect(() => {
    if (!convexEnabled || serverItems === undefined) return;
    if (adoptedRef.current) return;
    adoptedRef.current = true;
    setItems(
      (serverItems as WishlistItemDoc[]).map((w) => ({
        productId: w.productId,
        slug: w.slug,
        name: w.name,
        price: w.price,
        image: w.image,
      }))
    );
  }, [convexEnabled, serverItems, ownerKey]);

  useEffect(() => {
    adoptedRef.current = false;
  }, [ownerKey]);

  const persist = useCallback((next: WishItem[]) => {
    try {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const has = useCallback(
    (productId: string) => itemsRef.current.some((w) => w.productId === productId),
    []
  );

  const toggle = useCallback(
    (product: Parameters<typeof toItem>[0]) => {
      const item = toItem(product);
      const exists = itemsRef.current.some((w) => w.productId === item.productId);
      const next = exists
        ? itemsRef.current.filter((w) => w.productId !== item.productId)
        : [item, ...itemsRef.current];
      setItems(next);
      persist(next);
      if (convexEnabled && convex && ownerKey) {
        void convex.mutation(api.wishlist.toggle as never, {
          ownerKey,
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          price: item.price,
          image: item.image,
        } as never);
      }
      return !exists;
    },
    [convex, convexEnabled, ownerKey, persist]
  );

  const remove = useCallback(
    (productId: string) => {
      const next = itemsRef.current.filter((w) => w.productId !== productId);
      setItems(next);
      persist(next);
      const serverId = (serverItems as WishlistItemDoc[] | undefined)?.find(
        (w) => w.productId === productId
      )?._id;
      if (convexEnabled && convex && serverId) {
        void convex.mutation(api.wishlist.remove as never, { id: serverId } as never);
      }
    },
    [convex, convexEnabled, persist, serverItems]
  );

  const clear = useCallback(() => {
    setItems([]);
    persist([]);
    // Simplest correct path: remove every server item one by one.
    if (convexEnabled && convex) {
      for (const w of (serverItems as WishlistItemDoc[] | undefined) ?? []) {
        void convex.mutation(api.wishlist.remove as never, { id: w._id } as never);
      }
    }
  }, [convex, convexEnabled, persist, serverItems]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        hydrated,
        has,
        toggle,
        remove,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
