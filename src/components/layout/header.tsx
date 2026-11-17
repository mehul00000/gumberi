"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONVEX_ENABLED } from "@/lib/backend";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/match", label: "Match" },
  { href: "/about", label: "Atelier" },
];

export function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-bg">
        <div className="container-x flex h-9 items-center justify-center gap-3 text-center">
          <p className="label-micro truncate">
            Complimentary shipping over ₹4,999 · The Terracotta Summer lookbook is live
          </p>
          {!CONVEX_ENABLED ? (
            <span
              title="Running on bundled demo data — add Convex + Clerk keys in .env.local to go live"
              className="label-micro hidden items-center gap-1 border border-bg/30 px-2 py-0.5 sm:inline-flex"
            >
              <Sparkles className="h-3 w-3" /> Demo mode
            </span>
          ) : null}
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-bg/85 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-line shadow-[0_1px_24px_rgba(0,0,0,0.06)]" : "border-transparent"
        )}
      >
        <div className="container-x relative flex h-16 items-center justify-between md:h-[4.5rem]">
          {/* Left — mobile menu + desktop nav */}
          <div className="flex flex-1 items-center gap-1">
            <button
              className="flex h-9 w-9 items-center justify-center lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "label-micro link-underline pb-0.5 transition-colors",
                    item.href === "/match" && "max-xl:hidden",
                    item.href === "/about" && "max-xl:hidden",
                    isActive(item.href) ? "text-accent" : "text-ink hover:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center — wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 text-center"
            aria-label="Gumberi home"
          >
            <BrandMark className="h-8 w-8 shrink-0 xl:h-9 xl:w-9" />
            <span className="text-left">
              <span className="block font-display text-[1.3rem] font-semibold leading-none tracking-tight text-ink xl:text-[1.5rem]">
                Gumberi
              </span>
              <span className="label-micro block pt-1 text-[0.55rem] text-gold">
                Atelier · Est. 2019
              </span>
            </span>
          </Link>

          {/* Right — actions */}
          <div className="flex flex-1 items-center justify-end gap-0.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
            </button>
            <ThemeToggle />
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent"
            >
              <Heart className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
              {wishlist.count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-semibold text-accent-ink">
                  {wishlist.count}
                </span>
              ) : null}
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent sm:flex"
            >
              <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
            </Link>
            <button
              onClick={cart.openDrawer}
              aria-label="Open bag"
              className="relative flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
              {cart.count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[0.6rem] font-semibold text-bg">
                  {cart.count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg"
            initial={{ opacity: 0, x: "-4%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-4%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="flex items-center gap-2.5">
                <BrandMark className="h-9 w-9" />
                <span className="font-display text-xl font-semibold text-ink">
                  Gumberi
                </span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
            <nav className="container-x mt-6 flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b border-line py-4 font-display text-3xl tracking-tight",
                      isActive(item.href) ? "text-accent" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex gap-3">
                <Link href="/account" className="label-micro border border-line px-4 py-3">
                  Account
                </Link>
                <Link href="/wishlist" className="label-micro border border-line px-4 py-3">
                  Wishlist ({wishlist.count})
                </Link>
                <Link href="/cart" className="label-micro border border-line px-4 py-3">
                  Bag ({cart.count})
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
