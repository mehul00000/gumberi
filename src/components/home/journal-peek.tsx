"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";

/** Staggered journal peek — three posts, three offsets. */
export function JournalPeek() {
  const posts = usePosts().slice(0, 3);

  return (
    <section className="container-x py-24 md:py-36" aria-label="Journal">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div>
          <p className="label-micro text-accent">From the Journal</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-5xl">
            Notes from the floor
          </h2>
        </div>
        <Link
          href="/journal"
          className="group label-micro inline-flex items-center gap-2 text-ink hover:text-accent"
        >
          All entries
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
        {posts.map((post, i) => (
          <Reveal
            key={post.slug}
            delay={i * 0.08}
            className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-28" : ""}
          >
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-surface">
                <SmartImage
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-ink-soft">
                <span className="label-micro text-accent">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime} min</span>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
