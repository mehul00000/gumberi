"use client";

import { Heart, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PRODUCTS, type Product } from "@catalog";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { formatINR } from "@/lib/format";

/* ────────────────────────────────────────────────────────────
   The Runway — ported from the maison runway engine
   (Ayushcodesaver/screenshot-match · src/maison/runway.js),
   re-themed for Gumberi.

   Six looks stand in a depth queue: the centre look is sharp,
   the rest recede smaller, blurred and fading into the haze.
   Wheel, drag, arrow keys or a tap on a side look moves the
   rail; a looping product rail scrolls at double speed beside
   it; the look counter rolls vertically.
   ──────────────────────────────────────────────────────────── */

const LOOK_SLUGS = [
  "aurelia-slip-dress",
  "sahara-trench",
  "meridian-wool-blazer",
  "loom-linen-coord",
  "kaveri-overshirt",
  "sable-silk-blouse",
];
const LOOKS = LOOK_SLUGS.map(
  (s) => PRODUCTS.find((p) => p.slug === s) as Product
);
const RAIL = PRODUCTS;
const N = LOOKS.length;
const FIRST = 15;

// Depth stops, k = d + 1 (0..6): x-centre, frame fit, height,
// blur amount, opacity.
const KX = [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085];
const KF = [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59];
const KH = [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19];
const KB = [0, 0, 1.5, 4, 8, 12, 17];
const KO = [1, 1, 1, 1, 0.86, 0.5, 0];

const wrap = (x: number, n: number) => ((x % n) + n) % n;
const clamp = (x: number, a: number, b: number) =>
  Math.min(b, Math.max(a, x));

export function RunwayStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const modelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const aspectRef = useRef<number[]>(Array(N).fill(0.7));
  const bumpRef = useRef<(() => void) | null>(null);

  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const stage = stageRef.current;
    const rail = railRef.current;
    const roll = rollRef.current;
    const ring = ringRef.current;
    if (!stage || !rail || !roll || !ring) return;

    const calm = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0,
      H = 0,
      base = 0,
      cardS = 0,
      side = false,
      dirty = true;
    let p = 0,
      target = 0,
      last = 0;
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      down = false,
      sx = 0,
      st = 0,
      moved = 0,
      wheelT = 0;

    function size() {
      W = stage!.clientWidth;
      H = stage!.clientHeight;
      base = H * 1.2;
      side = window.innerWidth <= 820;
      LOOKS.forEach((_, i) => {
        const el = modelRefs.current[i];
        if (!el) return;
        const r = aspectRef.current[i];
        el.style.width = base * r + "px";
        el.style.height = base + "px";
      });
      cardS = side ? 160 : rail!.clientHeight / 3;
      cardRefs.current.forEach((c) => {
        if (c) c.style.height = side ? "100%" : cardS + "px";
      });
      dirty = true;
    }

    function paint() {
      modelRefs.current.forEach((el, i) => {
        if (!el) return;
        let d = wrap(i - p, N);
        if (d > N - 1) d -= N;
        const k = clamp(d + 1, 0, 6);
        const a = Math.floor(k);
        const b = Math.min(6, a + 1);
        const t = k - a;
        const mix = (A: number[]) => A[a] + (A[b] - A[a]) * t;
        const h = mix(KH) * H;
        const s = h / base;
        const w = h * aspectRef.current[i];
        const x = mix(KX) * W - w / 2;
        const y = mix(KF) * H - h;
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;
        const f = mix(KB) / s;
        const fs = f < 0.2 ? "none" : `blur(${f.toFixed(1)}px)`;
        el.style.filter = fs;
        el.style.opacity = mix(KO).toFixed(3);
        el.style.zIndex = String(100 - Math.round(d * 10));
      });
      const all = cardS * RAIL.length;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        let y = wrap(i * cardS - p * 2 * cardS, all);
        if (y > all - cardS) y -= all;
        c.style.transform = side
          ? `translate3d(${y.toFixed(1)}px,0,0)`
          : `translate3d(0,${y.toFixed(1)}px,0)`;
      });
      const first = roll!.firstElementChild as HTMLElement | null;
      if (first) {
        roll!.style.transform = `translate3d(0,${(-wrap(p, N) * first.offsetHeight).toFixed(1)}px,0)`;
      }
    }

    function frame(now: number) {
      const dt = Math.min(50, now - last) || 16;
      last = now;
      const was = p;
      if (calm) p = target;
      else p += (target - p) * (1 - Math.exp(-dt * 0.0072));
      if (Math.abs(target - p) < 0.0004) p = target;
      if (p !== was || dirty) {
        dirty = false;
        paint();
      }
      cx += (mx - cx) * 0.32;
      cy += (my - cy) * 0.32;
      ring!.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    }

    let raf = 0;
    function loop(t: number) {
      frame(t);
      raf = requestAnimationFrame(loop);
    }

    bumpRef.current = () => {
      size();
      paint();
    };

    const onResize = () => size();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += clamp(e.deltaY + e.deltaX, -120, 120) / 420;
      window.clearTimeout(wheelT);
      wheelT = window.setTimeout(() => {
        target = Math.round(target);
      }, 150);
    };
    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") ring.classList.add("show");
    };
    const onPointerLeave = () => ring.classList.remove("show");
    const onPointerMove = (e: PointerEvent) => {
      const r = stage!.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      target = st + dx / Math.max(150, W * 0.2);
    };
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      down = true;
      sx = e.clientX;
      st = target;
      moved = 0;
      stage!.setPointerCapture(e.pointerId);
      ring.classList.add("drag");
    };
    const release = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      ring.classList.remove("drag");
      if (moved < 6) {
        const hit = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find(
            (x) =>
              (x as HTMLElement).classList &&
              (x as HTMLElement).classList.contains("m")
          );
        if (hit) {
          let d = wrap(+(hit as HTMLElement).dataset.i! - target, N);
          d = Math.round(d);
          if (d > 0 && d < N) target = Math.round(target) + d;
        }
      } else {
        target = Math.round(target);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        target = Math.round(target) + 1;
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        target = Math.round(target) - 1;
      }
    };

    window.addEventListener("resize", onResize);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", release);
    stage.addEventListener("pointercancel", release);
    window.addEventListener("keydown", onKey);

    size();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(wheelT);
      bumpRef.current = null;
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", release);
      stage.removeEventListener("pointercancel", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="grid h-full grid-rows-[1fr_190px] lg:grid-cols-[1fr_23rem] lg:grid-rows-1">
      {/* ── Stage ── */}
      <div
        ref={stageRef}
        className="relative min-w-0 select-none overflow-hidden md:cursor-none"
        style={{
          touchAction: "pan-y",
          background:
            "linear-gradient(transparent 60%, var(--bg) 100%), linear-gradient(90deg, var(--surface) 0%, var(--bg) 38%, var(--surface) 62%, var(--bg) 100%)",
        }}
      >
        {/* Looks */}
        <div className="absolute inset-0">
          {LOOKS.map((look, i) => (
            <div
              key={look.slug}
              ref={(el) => {
                modelRefs.current[i] = el;
              }}
              data-i={i}
              className="m absolute left-0 top-0 will-change-transform"
              style={{ transformOrigin: "0 0" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={look.images[0]}
                alt={look.name}
                draggable={false}
                onLoad={(e) => {
                  const el = e.currentTarget;
                  aspectRef.current[i] =
                    el.naturalWidth / Math.max(1, el.naturalHeight);
                  bumpRef.current?.();
                }}
                className="block h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute bottom-[-1.6%] left-[8%] right-[8%] h-[3.6%] rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(20,17,16,.28), transparent)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Intro overlay */}
        <div className="pointer-events-none absolute left-5 top-5 z-[2] max-w-xs md:left-10 md:top-9 md:max-w-sm">
          <p className="label-micro text-accent">The Maison</p>
          <h2 className="mt-2 font-display text-[1.35rem] leading-tight tracking-[0.08em] text-ink md:text-3xl">
            The runway,
            <span className="italic text-accent"> live.</span>
          </h2>
          <p className="mt-3 hidden text-sm leading-[1.7] text-ink-soft md:block">
            Six looks stand in the haze. Scroll, drag, or use your arrow
            keys to walk the rail — tap a look to bring it forward. The
            pieces to the right are ready for the bag.
          </p>
        </div>

        {/* Look counter + shop link */}
        <div className="absolute bottom-8 left-5 z-[2] md:left-10">
          <div className="flex items-end gap-3 font-display text-2xl tracking-[0.1em] text-ink md:text-[1.9rem]">
            <span className="pb-0.5">Look</span>
            <span className="inline-block h-[2.35rem] overflow-hidden md:h-[2.9rem]">
              <span ref={rollRef} className="block will-change-transform">
                {Array.from({ length: N + 1 }).map((_, i) => (
                  <b
                    key={i}
                    className="block h-[2.35rem] font-normal leading-[2.35rem] md:h-[2.9rem] md:leading-[2.9rem]"
                  >
                    {FIRST + (i % N)}
                  </b>
                ))}
              </span>
            </span>
          </div>
          <Link
            href="/shop"
            className="label-micro mt-3 inline-block border-b border-ink/40 pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Shop the looks
          </Link>
        </div>

        {/* Cursor ring */}
        <div
          ref={ringRef}
          className="runway-ring pointer-events-none absolute left-0 top-0 z-[4] hidden md:block"
        />
      </div>

      {/* ── Product rail ── */}
      <aside
        ref={railRef}
        className="relative min-h-0 overflow-hidden"
        style={{ background: "var(--surface)" }}
        aria-label="Pieces on the rail"
      >
        {RAIL.map((p, i) => {
          const wished = wishlist.hydrated && wishlist.has(p.slug);
          return (
            <article
              key={p.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 flex w-full flex-col overflow-hidden will-change-transform"
              style={{
                background: i % 2 ? "var(--card)" : "var(--surface)",
                padding: "1rem 1.4rem",
              }}
            >
              <button
                aria-pressed={wished}
                aria-label={`Save ${p.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  wishlist.toggle({
                    slug: p.slug,
                    name: p.name,
                    price: p.price,
                    images: p.images,
                  });
                }}
                className="absolute left-4 top-4 z-10 text-ink transition-colors hover:text-accent"
              >
                <Heart
                  className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`}
                  strokeWidth={1.5}
                />
              </button>

              <div className="min-h-0 flex-1">
                <SmartImage
                  src={p.images[0]}
                  alt={p.name}
                  category={p.category}
                  className="h-full w-full"
                  sizes="360px"
                />
              </div>

              <div className="mt-2 grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="min-w-0">
                  <p className="label-micro truncate text-[0.55rem] text-ink">
                    {p.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {formatINR(p.price)}
                  </p>
                </div>
                <button
                  aria-label={`Add ${p.name} to cart`}
                  title={`Add ${p.name} to cart`}
                  onClick={(e) => {
                    e.stopPropagation();
                    cart.add({
                      productId: p.slug,
                      slug: p.slug,
                      name: p.name,
                      image: p.images[0],
                      price: p.price,
                      size: p.sizes[0],
                      color: p.colors[0]?.name ?? "Default",
                    });
                  }}
                  className="group flex h-7 w-7 items-center justify-center text-ink transition-colors hover:text-accent"
                >
                  <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>
            </article>
          );
        })}
      </aside>
    </div>
  );
}
