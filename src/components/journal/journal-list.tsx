"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/ui/empty-state";
import { SmartImage } from "@/components/ui/smart-image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export function JournalList() {
  const posts = usePosts();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [active, setActive] = useState("All");

  const list = useMemo(
    () =>
      active === "All" ? posts : posts.filter((p) => p.category === active),
    [posts, active]
  );

  const [featured, ...rest] = list;

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="The journal is at the binders"
        copy="Entries return after the next dye lot."
      />
    );
  }

  return (
    <>
      {/* Category chips */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "label-micro border px-3.5 py-2 transition-colors",
              active === c
                ? "border-accent bg-accent text-accent-ink"
                : "border-line text-ink-soft hover:border-accent hover:text-accent"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Feature */}
      {featured ? (
        <Reveal>
          <Link href={`/journal/${featured.slug}`} className="group grid gap-8 border-b border-line pb-14 lg:grid-cols-2 lg:gap-14">
            <div className="aspect-[16/10] overflow-hidden bg-surface">
              <SmartImage
                src={featured.cover}
                alt={featured.title}
                priority
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-ink-soft">
                <span className="label-micro text-accent">{featured.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featured.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{featured.readTime} min read</span>
              </div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-accent md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-lg leading-[1.85] text-ink-soft">
                {featured.excerpt}
              </p>
              <span className="label-micro mt-6 text-ink">Read the entry →</span>
            </div>
          </Link>
        </Reveal>
      ) : null}

      {/* Grid */}
      <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.06}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-surface">
                <SmartImage
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-ink-soft">
                <span className="label-micro text-accent">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3 className="mt-2 font-display text-2xl leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
