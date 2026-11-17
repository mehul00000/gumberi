import Link from "next/link";
import { notFound } from "next/navigation";
import { COMBINATIONS, bySlug, combinationBySlug } from "@catalog";
import { AddLookButton } from "@/components/combinations/add-look-button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Price } from "@/components/ui/price";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { formatINR } from "@/lib/format";

export function generateStaticParams() {
  return COMBINATIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = combinationBySlug(slug);
  if (!c) return { title: "Combination" };
  return { title: c.name, description: c.story };
}

export default async function CombinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combination = combinationBySlug(slug);
  if (!combination) notFound();

  const pieces = combination.pieces
    .map((s) => bySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const total = pieces.reduce((n, p) => n + p.price, 0);
  const others = COMBINATIONS.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Combinations", href: "/combinations" },
            { label: combination.name },
          ]}
        />
      </div>

      {/* The photo composition — one look, three frames */}
      <section className="container-x grid grid-cols-2 gap-3 py-8 md:grid-cols-4 md:gap-4">
        {pieces.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.08}
            className={i === 0 ? "col-span-2 row-span-2" : ""}
          >
            <div className="relative overflow-hidden bg-surface">
              <SmartImage
                src={p.images[0]}
                alt={`${p.name} in ${combination.name}`}
                category={p.category}
                priority={i === 0}
                className={`w-full ${i === 0 ? "aspect-[2/3] md:aspect-auto md:h-full" : "aspect-[3/4]"}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="label-micro absolute bottom-3 left-3 bg-bg/85 px-2.5 py-1.5 text-ink backdrop-blur">
                {p.name}
              </span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Story + action */}
      <section className="container-x grid gap-10 border-b border-line pb-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
        <Reveal>
          <p className="label-micro text-accent">The combination</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            {combination.name}
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.85] text-ink-soft">
            {combination.story}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="md:pt-14">
          <div className="border border-line bg-surface p-7">
            <p className="label-micro text-ink">The whole look</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {pieces.map((p) => (
                <li key={p.slug} className="flex justify-between gap-4">
                  <Link
                    href={`/product/${p.slug}`}
                    className="text-ink transition-colors hover:text-accent"
                  >
                    {p.name}
                  </Link>
                  <span className="text-ink-soft">{formatINR(p.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-medium">
              <span className="text-ink">Together</span>
              <Price price={total} size="md" />
            </div>
            <AddLookButton slugs={combination.pieces} className="mt-6 w-full" size="lg" />
            <p className="mt-3 text-center text-xs text-ink-soft">
              Sizes default to S / UK 7 — adjust in the bag.
            </p>
          </div>
        </Reveal>
      </section>

      {/* More combinations */}
      <section className="container-x py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            More combinations
          </h2>
          <Link
            href="/combinations"
            className="label-micro text-ink-soft hover:text-accent"
          >
            All six →
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {others.map((c) => (
            <Reveal key={c.slug}>
              <Link href={`/combinations/${c.slug}`} className="group block">
                <div className="grid grid-cols-3 gap-1.5">
                  {c.pieces.map((s) => {
                    const p = bySlug(s)!;
                    return (
                      <SmartImage
                        key={s}
                        src={p.images[0]}
                        alt={p.name}
                        category={p.category}
                        className="aspect-[3/4]"
                        imgClassName="transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, 20vw"
                      />
                    );
                  })}
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                  {c.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
