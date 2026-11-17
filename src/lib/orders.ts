"use client";

import { api } from "../../convex/_generated/api";
import type { ConvexReactClient } from "convex/react";
import { CONVEX_ENABLED } from "./backend";

/* ── Orders: local fallback + Convex ───────────────────────── */

export type OrderItem = {
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  price: number;
};

export type OrderRecord = {
  number: string;
  ownerKey: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: number;
};

const ORDERS_KEY = "gumberi_orders";

function readLocalOrders(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(ORDERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function makeOrderNumber() {
  return `GUM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function placeOrder(
  payload: Omit<OrderRecord, "number" | "status" | "createdAt">,
  convex: ConvexReactClient | null
): Promise<OrderRecord> {
  if (CONVEX_ENABLED && convex) {
    const res = (await convex.mutation(api.orders.create, payload)) as {
      number: string;
    };
    return { ...payload, number: res.number, status: "confirmed", createdAt: Date.now() };
  }
  const order: OrderRecord = {
    ...payload,
    number: makeOrderNumber(),
    status: "confirmed",
    createdAt: Date.now(),
  };
  const list = readLocalOrders();
  list.unshift(order);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  return order;
}

/** Demo-mode orders for the signed-in/anonymous owner. */
export function localOrders(): OrderRecord[] {
  return readLocalOrders();
}

export function localOrderByNumber(number: string): OrderRecord | undefined {
  return readLocalOrders().find((o) => o.number === number);
}

/* ── Match-the-Look scores ─────────────────────────────────── */

export type ScoreRecord = { name: string; moves: number; seconds: number; createdAt: number };

const SCORES_KEY = "gumberi_scores";

export function localScores(): ScoreRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const list: ScoreRecord[] = JSON.parse(
      window.localStorage.getItem(SCORES_KEY) ?? "[]"
    );
    return list
      .sort((a, b) => a.moves - b.moves || a.seconds - b.seconds)
      .slice(0, 10);
  } catch {
    return [];
  }
}

export async function submitScore(
  name: string,
  moves: number,
  seconds: number,
  convex: ConvexReactClient | null
) {
  if (CONVEX_ENABLED && convex) {
    await convex.mutation(api.scores.submit, { name, moves, seconds });
    return;
  }
  const list = JSON.parse(
    window.localStorage.getItem(SCORES_KEY) ?? "[]"
  ) as ScoreRecord[];
  list.push({ name, moves, seconds, createdAt: Date.now() });
  window.localStorage.setItem(SCORES_KEY, JSON.stringify(list));
}

/* ── Newsletter / contact (demo mode just acknowledges) ────── */

export async function subscribeNewsletter(
  email: string,
  convex: ConvexReactClient | null
): Promise<{ ok: boolean; already?: boolean }> {
  if (CONVEX_ENABLED && convex) {
    return (await convex.mutation(api.misc.newsletterSubscribe, {
      email,
    })) as { ok: boolean; already?: boolean };
  }
  return { ok: true };
}

export async function sendContactMessage(
  msg: { name: string; email: string; subject: string; message: string },
  convex: ConvexReactClient | null
): Promise<{ ok: boolean }> {
  if (CONVEX_ENABLED && convex) {
    return (await convex.mutation(api.misc.contactSubmit, msg)) as { ok: boolean };
  }
  return { ok: true };
}
