import Link from "next/link";
import { bySlug, type Combination } from "@catalog";
import { AddLookButton } from "./add-look-button";
import { SmartImage } from "@/components/ui/smart-image";
import { formatINR } from "@/lib/format";

/**
 * A styled combination: the pieces shown as one photo composition —
 * a wide hero frame flanked by the supporting pieces.
 */
export function CombinationCard({
  combination,
  priority = false,
}: {
  combination: Combination;
  priority?: boolean;
}) {
  const pieces = combination.pieces
    .map((s) => bySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const total = pieces.reduce((n, p) => n + p.price, 0);

  return (
    <article className="group">
      <Link
        href={`/combinations/${combination.slug}`}
        className="grid grid-cols-4 gap-2"
        aria-label={`Open ${combination.name}`}
      >
        {pieces.map((p, i) => (
          <div
            key={p.slug}
            className={`relative overflow-hidden bg-surface ${
              i === 0 ? "col-span-2" : ""
            }`}
          >
            <SmartImage
              src={p.images[0]}
              alt={`${p.name} — ${combination.name}`}
              category={p.category}
              priority={priority}
              className={`w-full ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5]"}`}
              sizes="(max-width: 768px) 50vw, 25vw"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </Link>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link href={`/combinations/${combination.slug}`}>
            <h3 className="font-display text-2xl leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
              {combination.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-ink-soft">
            {pieces.map((p) => p.name).join(" · ")}
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium text-ink">
          {formatINR(total)}
        </p>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {combination.story}
      </p>

      <div className="mt-5">
        <AddLookButton
          slugs={combination.pieces}
          className="w-full sm:w-auto"
        />
      </div>
    </article>
  );
}
