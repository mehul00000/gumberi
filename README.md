# Gumberi — Clothing cut from the golden hour

A full fashion-atelier website built with **Next.js 16 (App Router) + Convex + Clerk + Tailwind CSS v4**, with ~30 pages, light/dark theming, scroll-driven editorial animations, and a "Match the Look" game with a live leaderboard.

> **Runs immediately with zero keys.** With no environment variables the site uses a bundled catalog and browser storage (demo mode). Add Convex + Clerk keys and the same code goes live — realtime database and real accounts.

---

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000
```

## Going live with Convex + Clerk

1. **Convex** — create the backend and paste the URL:
   ```bash
   npx convex dev
   ```
   This logs you in, creates a project, pushes `convex/schema.ts`, and prints a `NEXT_PUBLIC_CONVEX_URL`. It also regenerates `convex/_generated/` (the repo ships with stubs so it builds before this step).
2. **Seed the catalog** (optional — the client falls back to the bundled catalog if the DB is empty):
   ```bash
   npx convex run seed:seedDatabase
   ```
3. **Clerk** — create an app at [dashboard.clerk.com](https://dashboard.clerk.com), then copy `.env.local.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
4. Restart `npm run dev`. The footer dot turns **Live · Convex**, the demo badge disappears, carts/orders/scores move to the database, and `/sign-in` becomes real Clerk auth.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx convex dev` | Push schema + regenerate Convex codegen |
| `npx convex run seed:seedDatabase` | Seed products + journal into Convex |

## Site map (30 routes)

| Area | Routes |
| --- | --- |
| Commerce | `/` · `/shop` · `/shop/[category]` (women, men, accessories, footwear, jewellery) · `/product/[slug]` (24 products) |
| Editorial | `/collections` · `/collections/[slug]` (6 chapters) · `/lookbook` (9 frames) · `/journal` · `/journal/[slug]` (6 entries) |
| Styling | `/combinations` · `/combinations/[slug]` (6 styled pairs — "add the look") |
| Immersive | `/runway` — depth-haze look carousel: wheel / drag / arrow-key rail with live piece shop |
| Game | `/match` — memory-pair game with a live leaderboard |
| Cart flow | `/cart` · `/wishlist` · `/checkout` · `/checkout/success?order=…` |
| Account | `/sign-in` · `/sign-up` · `/account` · `/account/orders` · `/account/profile` |
| Content | `/about` · `/sustainability` · `/stores` (8) · `/careers` · `/contact` · `/faq` · `/shipping` · `/returns` · `/size-guide` · `/privacy` · `/terms` |

## Architecture

```
convex/               Backend: schema, functions (products, cart, wishlist,
  │                   orders, scores, misc, seed) + catalog.ts (single source
  │                   of truth for demo data, imported by both sides)
  └── _generated/     Stubbed codegen — replaced by `npx convex dev`
src/
  ├── middleware.ts   Clerk auth (route-gated /account) — only when keys exist
  ├── app/            30 routes, App Router (Next 16, cacheComponents on)
  ├── components/     providers/ (theme, convex-gate, auth, cart, wishlist)
  │                   layout/ (header, footer, search, cart drawer, theme toggle)
  │                   home/ shop/ editorial/ journal/ match/ account/ checkout/
  │                   ui/ (button, accordion, product card, reveal, marquee…)
  └── lib/            data hooks with graceful fallback, backend gate,
                      orders/scores helpers, INR formatting
public/brand/         Generated fabric-texture SVGs (image fallbacks)
```

**How the demo/live duality works:** `useLiveQuery(fn, args, fallback)` subscribes to Convex when `NEXT_PUBLIC_CONVEX_URL` exists and returns the bundled catalog while loading or unseeded. Cart, wishlist and orders are optimistic: local state updates instantly and mirrors to localStorage, while Convex mutations fire in parallel when connected. Clerk mounts only when its publishable key exists — otherwise `useAuthUser()` hands back a demo session, so gated pages still render.

## Design system

- **Light “Ivory Atelier”** — warm paper `#f6f1e7`, ink `#211b13`, terracotta accent `#b04a26`, gold + sage support.
- **Dark “Midnight Loom”** — espresso `#131110`, cream `#ece5d8`, amber-clay accent `#e0794b`. Toggle in the header (persisted via `next-themes`, respects system).
- Fraunces display serif + Inter, six-role color tokens mapped into Tailwind v4 via `@theme inline`, scroll-driven pinned chapters, parallax frames, and a drawn “thread” line as the signature scroll interaction.
