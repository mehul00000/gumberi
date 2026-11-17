import Link from "next/link";
import { COMBINATIONS } from "@catalog";
import { CombinationCard } from "@/components/combinations/combination-card";
import { Reveal } from "@/components/ui/reveal";

/** Home teaser — three styled combinations as photo compositions. */
export function CombinationsPeek() {
  const combos = COMBINATIONS.slice(0, 3);

  return (
    <section className="bg-surface py-24 md:py-32" aria-label="Combinations">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="label-micro text-accent">Combinations</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-5xl">
              Three pieces,
              <br /> one decision.
            </h2>
          </div>
          <Link
            href="/combinations"
            className="group label-micro inline-flex items-center gap-2 text-ink hover:text-accent"
          >
            All combinations
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {combos.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.07}>
              <CombinationCard combination={c} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
