import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLECTIONS } from "@catalog";
import { CollectionView } from "@/components/shop/collection-view";
import { SmartImage } from "@/components/ui/smart-image";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  if (!c) return { title: "Collection" };
  return { title: `${c.name} — ${c.season}`, description: c.story };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const others = COLLECTIONS.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Banner */}
      <section className="relative flex min-h-[52svh] items-end overflow-hidden">
        <SmartImage
          src={collection.cover}
          alt={collection.name}
          priority
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="container-x relative pb-14 pt-36">
          <p className="label-micro text-bg/75">{collection.season}</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-bg md:text-7xl">
            {collection.name}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-line">
        <div className="container-x grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <p className="label-micro text-accent">The argument</p>
          <p className="font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
            {collection.story}
          </p>
        </div>
      </section>

      <CollectionView slugs={collection.products} />

      {/* Other chapters */}
      <section className="border-t border-line bg-surface">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="label-micro text-ink-soft">Read another chapter</p>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="label-micro border border-line px-3 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
