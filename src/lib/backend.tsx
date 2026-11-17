"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ConvexReactClient } from "convex/react";

/* ────────────────────────────────────────────────────────────
   ConvexGate — hands out a ConvexReactClient (browser only) and
   a boolean "enabled" flag. When NEXT_PUBLIC_CONVEX_URL is absent
   the client is never subscribed to anything and the app falls
   back to the bundled catalog (demo mode).

   Subscriptions use watchQuery() in effects instead of useQuery()
   so that prerendering never needs a live connection.
   ──────────────────────────────────────────────────────────── */

export const CONVEX_ENABLED = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

const ConvexEnabledContext = createContext(false);
export const useConvexEnabled = () => useContext(ConvexEnabledContext);

const ConvexClientContext = createContext<ConvexReactClient | null>(null);
export const useConvexClient = () => useContext(ConvexClientContext);

export function ConvexGate({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  const enabled = Boolean(url);
  // Browser-only: ConvexReactClient generates an id with Math.random(),
  // which is unstable during prerender.
  const [client] = useState(() =>
    typeof window === "undefined"
      ? null
      : new ConvexReactClient(url ?? "https://offline-0000000.convex.cloud")
  );

  return (
    <ConvexClientContext.Provider value={enabled ? client : null}>
      <ConvexEnabledContext.Provider value={enabled}>
        {children}
      </ConvexEnabledContext.Provider>
    </ConvexClientContext.Provider>
  );
}

/** Raw watchQuery subscription → state. No-ops on the server and in demo mode. */
export function useWatchQuery<T = unknown>(
  fn: unknown,
  args: Record<string, unknown> | null
): T | undefined {
  const enabled = useConvexEnabled();
  const client = useConvexClient();
  const [result, setResult] = useState<T | undefined>(undefined);
  const argsKey = JSON.stringify(args ?? null);
  const hasArgs = args !== null;

  useEffect(() => {
    if (!enabled || !client || !hasArgs) return;
    const watch = client.watchQuery(fn as never, JSON.parse(argsKey) as never);
    const update = () => {
      try {
        setResult(watch.localQueryResult() as T);
      } catch {
        /* not yet loaded — keep previous */
      }
    };
    update();
    const unsubscribe = watch.onUpdate(update);
    return unsubscribe;
     
  }, [enabled, client, fn, argsKey, hasArgs]);

  return hasArgs ? result : undefined;
}

/**
 * Live query with a graceful fallback.
 * - demo mode → always returns the fallback (bundled catalog)
 * - convex mode → returns the fallback while loading or when the
 *   database has not been seeded yet, then swaps to live data.
 */
export function useLiveQuery<T>(fn: unknown, args: unknown, fallback: T): T {
  const result = useWatchQuery<T>(
    fn,
    (args ?? {}) as Record<string, unknown>
  );
  if (result === undefined || result === null) return fallback;
  if (
    Array.isArray(result) &&
    result.length === 0 &&
    Array.isArray(fallback) &&
    fallback.length > 0
  ) {
    return fallback;
  }
  return result;
}
