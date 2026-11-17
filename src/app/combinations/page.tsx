import { COMBINATIONS } from "@catalog";
import { CombinationCard } from "@/components/combinations/combination-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Combinations",
  description:
    "Styled combinations from the Gumberi studio — complete looks in three pieces, photographed together and priced together.",
};

export default function CombinationsPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <Reveal className="mb-14 max-w-2xl md:mb-20">
        <p className="label-micro text-accent">Styled by the studio</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          Combinations
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.85] text-ink-soft">
          Outfits are decisions, and decisions are easier photographed. Each
          combination is three pieces the studio wears together — shown as one
          composition, priced as one tap. Choose the look, not the parts.
        </p>
      </Reveal>

      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {COMBINATIONS.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.06}>
            <CombinationCard combination={c} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
