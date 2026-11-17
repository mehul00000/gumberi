import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@catalog";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";

export const metadata = {
  title: "Collections",
  description:
    "Six Gumberi collections — Ivory Hour, Terracotta Summer, Monsoon Linen, Midnight Silk, Everyday Uniform and the Wedding Atelier.",
};

export default function CollectionsPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <Reveal className="mb-14 max-w-2xl md:mb-20">
        <p className="label-micro text-accent">The index</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          Collections
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.85] text-ink-soft">
          We do not do seasons the industry way. We do chapters — each one a
          self-contained argument about a colour, a fabric, or an hour of the
          day. Collect the whole book, or read one story closely.
        </p>
      </Reveal>

      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-16" : ""}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <SmartImage
                  src={c.cover}
                  alt={c.name}
                  priority={i < 2}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="label-micro absolute bottom-4 right-4 flex items-center gap-1.5 border border-bg/40 bg-bg/10 px-3 py-2 text-bg opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                  Enter <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-accent">
                  {c.name}
                </h2>
                <span className="label-micro text-ink-soft">{c.season}</span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                {c.story}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
