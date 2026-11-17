"use client";

import { Heart, Minus, Plus, Ruler, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useProduct, useProducts } from "@/lib/data";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { FREE_SHIP_THRESHOLD, formatINR } from "@/lib/format";

export function ProductView({ slug }: { slug: string }) {
  const product = useProduct(slug);
  const products = useProducts();
  const cart = useCart();
  const wishlist = useWishlist();

  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-4xl text-ink">
          This piece has left the studio
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          It may have sold out of its dye lot — or the link is mistyped.
        </p>
        <Link
          href="/shop"
          className="label-micro mt-8 inline-block border border-line px-6 py-3 text-ink hover:border-accent hover:text-accent"
        >
          Back to the shop
        </Link>
      </div>
    );
  }

  const activeColor = color ?? product.colors[0]?.name ?? "Default";
  const wished = wishlist.hydrated && wishlist.has(product.slug);
  const related = products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 4);

  function onAdd() {
    if (!size) {
      setSizeError(true);
      return;
    }
    cart.add({
      productId: product!.slug,
      slug: product!.slug,
      name: product!.name,
      image: product!.images[0],
      price: product!.price,
      size,
      color: activeColor,
    });
  }

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-x grid gap-12 py-8 lg:grid-cols-2 lg:gap-20">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <SmartImage
              key={imageIdx}
              src={product.images[imageIdx]}
              alt={product.name}
              category={product.category}
              priority
              className="absolute inset-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badges?.length ? (
              <div className="absolute left-4 top-4 flex gap-2">
                {product.badges.map((b) => (
                  <Badge key={b} tone={b === "New" ? "ink" : "accent"}>
                    {b}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setImageIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative h-24 w-20 overflow-hidden border-2 transition-colors",
                    i === imageIdx ? "border-accent" : "border-transparent hover:border-line"
                  )}
                >
                  <SmartImage src={img} alt="" category={product.category} className="h-full w-full" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-micro text-ink-soft">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-5">
            <Price price={product.price} compareAt={product.compareAt} size="lg" />
          </div>
          <div className="mt-3">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>

          <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

          {/* Colors */}
          <div className="mt-8">
            <p className="label-micro mb-3 text-ink">
              Colour — <span className="text-ink-soft">{activeColor}</span>
            </p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 p-[3px] transition-colors",
                    activeColor === c.name ? "border-accent" : "border-transparent hover:border-line"
                  )}
                >
                  <span
                    className="block h-full w-full rounded-full border border-line"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="label-micro text-ink">
                Size{" "}
                {sizeError ? (
                  <span className="ml-2 normal-case tracking-normal text-accent">
                    — pick one to continue
                  </span>
                ) : null}
              </p>
              <Link
                href="/size-guide"
                className="label-micro inline-flex items-center gap-1.5 text-ink-soft hover:text-accent"
              >
                <Ruler className="h-3.5 w-3.5" /> Size guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={cn(
                    "label-micro min-w-12 border px-3 py-2.5 text-center transition-colors",
                    size === s
                      ? "border-accent bg-accent text-accent-ink"
                      : sizeError
                        ? "border-accent/50 text-ink hover:border-accent"
                        : "border-line text-ink hover:border-accent hover:text-accent"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center border border-line text-ink">
              <button
                aria-label="Decrease quantity"
                className="flex h-[3.25rem] w-11 items-center justify-center hover:text-accent"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="flex h-[3.25rem] w-11 items-center justify-center hover:text-accent"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button size="lg" className="flex-1" onClick={onAdd}>
              Add to bag — {formatINR(product.price * qty)}
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-label="Toggle wishlist"
              className="px-4"
              onClick={() =>
                wishlist.toggle({
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  images: product.images,
                })
              }
            >
              <Heart className={cn("h-4 w-4", wished && "fill-accent text-accent")} />
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
            <Truck className="h-3.5 w-3.5 text-sage" />
            Complimentary shipping over {formatINR(FREE_SHIP_THRESHOLD)} · 14-day
            returns
          </p>

          {/* Accordions */}
          <div className="mt-10">
            <Accordion
              items={[
                {
                  title: "Details",
                  content: (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Materials & care",
                  content: (
                    <div className="space-y-3">
                      <p>
                        <strong className="text-ink">Materials:</strong>{" "}
                        {product.materials}
                      </p>
                      <ul className="list-disc space-y-1.5 pl-5">
                        {product.care.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ),
                },
                {
                  title: "Shipping & returns",
                  content:
                    "Ships in 2–4 working days across metros. 14-day free returns with doorstep pickup. Sale pieces from limited dye lots are final sale.",
                },
                {
                  title: "The story",
                  content: product.story,
                },
              ]}
              defaultOpen={0}
            />
          </div>
        </div>
      </div>

      {/* Story strip */}
      <section className="bg-surface">
        <div className="container-x py-16">
          <Reveal>
            <p className="label-micro text-accent">Why it exists</p>
            <p className="mt-4 max-w-3xl font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
              {product.story}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Complete the look */}
      {related.length > 0 ? (
        <section className="container-x py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              Complete the look
            </h2>
            <Link
              href={`/collections/${product.collection}`}
              className="label-micro text-ink-soft hover:text-accent"
            >
              From the collection →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
