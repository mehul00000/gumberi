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
import type { CartItemDoc } from "./types";
import { useAuthUser } from "./auth-provider";
import { useConvexClient, useConvexEnabled, useWatchQuery } from "@/lib/backend";
import { getVisitorId } from "@/lib/visitor";

/* ────────────────────────────────────────────────────────────
   CartProvider — optimistic cart that works in both modes:
   demo  → localStorage
   convex→ Convex subscription + mutations (mirrored locally)
   ──────────────────────────────────────────────────────────── */

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

export type CartAddInput = Omit<CartLine, "key" | "qty">;

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  drawerOpen: boolean;
  lastAddedKey: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (item: CartAddInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

const LOCAL_KEY = "gumberi_cart";
const lineKey = (productId: string, size: string, color: string) =>
  `${productId}|${size}|${color}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { mode, user } = useAuthUser();
  const convexEnabled = useConvexEnabled();
  const convex = useConvexClient();

  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const linesRef = useRef<CartLine[]>([]);
  const adoptedRef = useRef(false);

  // Keep a ref mirror for event handlers without re-creating callbacks.
  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  // Hydrate visitor id + local mirror after mount (avoids SSR mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisitorId(getVisitorId());
    try {
       
      setLines(JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "[]"));
    } catch {
       
      setLines([]);
    }
     
    setHydrated(true);
  }, []);

  const ownerKey =
    mode === "clerk" && user
      ? `user:${user.id}`
      : visitorId
        ? `anon:${visitorId}`
        : null;

  // Live subscription (only when Convex is connected).
  const serverLines = useWatchQuery<CartItemDoc[]>(
    api.cart.list,
    convexEnabled && ownerKey ? { ownerKey } : null
  );

  // Adopt server state once per owner change.
  useEffect(() => {
    if (!convexEnabled || serverLines === undefined) return;
    if (adoptedRef.current) return;
    adoptedRef.current = true;
    const mapped = (serverLines as CartItemDoc[]).map((l) => ({
      key: lineKey(l.productId, l.size, l.color),
      productId: l.productId,
      slug: l.slug,
      name: l.name,
      image: l.image,
      price: l.price,
      size: l.size,
      color: l.color,
      qty: l.qty,
    }));
    setLines(mapped);
  }, [convexEnabled, serverLines, ownerKey]);

  useEffect(() => {
    adoptedRef.current = false;
  }, [ownerKey]);

  const persist = useCallback((next: CartLine[]) => {
    try {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {
      /* storage full / private mode — ignore */
    }
  }, []);

  const commit = useCallback(
    (next: CartLine[]) => {
      setLines(next);
      persist(next);
    },
    [persist]
  );

  const add = useCallback(
    (item: CartAddInput) => {
      const key = lineKey(item.productId, item.size, item.color);
      const prev = linesRef.current;
      const existing = prev.find((l) => l.key === key);
      const next = existing
        ? prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { ...item, key, qty: 1 }];
      commit(next);
      if (convexEnabled && convex && ownerKey) {
        void convex.mutation(api.cart.add as never, { ownerKey, ...item } as never);
      }
      setLastAddedKey(key);
      setDrawerOpen(true);
    },
    [commit, convex, convexEnabled, ownerKey]
  );

  const setQty = useCallback(
    (key: string, qty: number) => {
      const prev = linesRef.current;
      const next =
        qty <= 0
          ? prev.filter((l) => l.key !== key)
          : prev.map((l) => (l.key === key ? { ...l, qty } : l));
      commit(next);
      const serverId = (serverLines as CartItemDoc[] | undefined)?.find(
        (l) => lineKey(l.productId, l.size, l.color) === key
      )?._id;
      if (convexEnabled && convex && serverId) {
        void convex.mutation(api.cart.setQty as never, { id: serverId, qty } as never);
      }
    },
    [commit, convex, convexEnabled, serverLines]
  );

  const remove = useCallback(
    (key: string) => {
      commit(linesRef.current.filter((l) => l.key !== key));
      const serverId = (serverLines as CartItemDoc[] | undefined)?.find(
        (l) => lineKey(l.productId, l.size, l.color) === key
      )?._id;
      if (convexEnabled && convex && serverId) {
        void convex.mutation(api.cart.remove as never, { id: serverId } as never);
      }
    },
    [commit, convex, convexEnabled, serverLines]
  );

  const clear = useCallback(() => {
    commit([]);
    if (convexEnabled && convex && ownerKey) {
      void convex.mutation(api.cart.clear as never, { ownerKey } as never);
    }
  }, [commit, convex, convexEnabled, ownerKey]);

  const value: CartApi = {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
    hydrated,
    drawerOpen,
    lastAddedKey,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => {
      setDrawerOpen(false);
      setLastAddedKey(null);
    },
    add,
    setQty,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
