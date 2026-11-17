"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { BrandMark } from "@/components/ui/brand-mark";
import { CONVEX_ENABLED } from "@/lib/backend";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop/women", label: "Women" },
      { href: "/shop/men", label: "Men" },
      { href: "/shop/accessories", label: "Accessories" },
      { href: "/shop/footwear", label: "Footwear" },
      { href: "/shop/jewellery", label: "Jewellery" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/about", label: "The Atelier" },
      { href: "/combinations", label: "Combinations" },
      { href: "/sustainability", label: "Sustainability" },
      { href: "/stores", label: "Stores" },
      { href: "/careers", label: "Careers" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/size-guide", label: "Size Guide" },
    ],
  },
  {
    title: "Play",
    links: [
      { href: "/runway", label: "The Runway" },
      { href: "/match", label: "Match the Look" },
      { href: "/match#leaderboard", label: "Leaderboard" },
      { href: "/collections", label: "Collections" },
      { href: "/lookbook", label: "Lookbook" },
    ],
  },
];

const SOCIALS = ["Instagram", "X", "YouTube"];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      {/* Newsletter band */}
      <div className="border-b border-line">
        <div className="container-x flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label-micro text-accent">The Ivory Hour letter</p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              One letter a month.
              <br />
              Dye lots, lookbooks, no noise.
            </h2>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Link columns */}
      <div className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2">
          <span className="flex items-center gap-3">
            <BrandMark className="h-11 w-11" />
            <span>
              <span className="block font-display text-3xl font-semibold tracking-tight text-ink">
                Gumberi
              </span>
              <span className="label-micro text-[0.55rem] text-gold">
                Atelier · Est. 2019
              </span>
            </span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            A small-batch atelier making clothes for the golden hour — hand
            finished in Mumbai, dyed in Kutch, worn everywhere.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="label-micro flex h-9 items-center justify-center border border-line px-3 text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="label-micro text-ink">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-soft md:flex-row">
          <p>© 2026 Gumberi Atelier Pvt. Ltd. All hues reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <span
              className="label-micro flex items-center gap-1.5"
              title={CONVEX_ENABLED ? "Connected to Convex" : "Bundled demo data — connect Convex & Clerk keys to go live"}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${CONVEX_ENABLED ? "bg-sage" : "bg-gold"}`}
              />
              {CONVEX_ENABLED ? "Live · Convex" : "Demo data"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
