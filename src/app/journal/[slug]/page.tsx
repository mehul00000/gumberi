import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL } from "@catalog";
import { formatDate } from "@/lib/format";
import { SmartImage } from "@/components/ui/smart-image";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL.find((p) => p.slug === slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.cover }] },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = JOURNAL.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article>
      {/* Header */}
      <header className="container-x pb-10 pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-ink-soft">
            <span className="label-micro text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 leading-[1.85] text-ink-soft md:text-lg">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Cover */}
      <div className="container-x">
        <div className="relative aspect-[16/8] overflow-hidden bg-surface">
          <SmartImage
            src={post.cover}
            alt={post.title}
            priority
            className="h-full w-full"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Body */}
      <div className="container-x">
        <div className="prose-gumberi mx-auto max-w-2xl py-14">
          {post.blocks.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-2 border-accent pl-6 font-display text-2xl leading-snug text-ink"
                >
                  {block.text}
                </blockquote>
              );
            return <p key={i}>{block.text}</p>;
          })}

          <div className="mt-14 border-t border-line pt-8">
            <p className="label-micro text-ink-soft">Filed under</p>
            <p className="mt-2 font-display text-xl text-ink">
              {post.category} — Gumberi Journal
            </p>
          </div>
        </div>
      </div>

      {/* More entries */}
      <section className="border-t border-line bg-surface">
        <div className="container-x py-14">
          <h2 className="font-display text-3xl tracking-tight text-ink">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {more.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-card">
                    <SmartImage
                      src={p.cover}
                      alt={p.title}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="label-micro mt-4 text-accent">{p.category}</p>
                  <h3 className="mt-1.5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
