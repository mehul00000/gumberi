/**
 * Re-export of the Convex gate (lives in @/lib/backend so both
 * server-safe helpers and the provider share one module).
 */
export {
  ConvexGate,
  useConvexClient,
  useConvexEnabled,
  CONVEX_ENABLED,
} from "@/lib/backend";
