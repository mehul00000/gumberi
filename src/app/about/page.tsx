import Link from "next/link";
import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { HERO } from "@catalog";

export const metadata = {
  title: "The Atelier",
  description:
    "Gumberi is a small-batch fashion atelier founded in Mumbai in 2019 — pattern rooms, slow dye vats and a finishing loft of 23 hands.",
};

const STATS = [
  { value: "2019", label: "Founded, Kala Ghoda" },
  { value: "23", label: "Hands in the finishing loft" },
  { value: "9", label: "Drafts per silhouette, average" },
  { value: "18%", label: "Cost of hand finishing, published" },
];

export default function AboutPage() {
  return (
    <>
      <div className="container-x">
        <PageHero
          eyebrow="The house"
          title="Clothing cut from the golden hour."
          copy="Gumberi began in 2019 with one pattern table facing west. The rule was simple then and it is simple now: nothing ships unless it looks better at 5:40 p.m. than it does at noon."
        />
      </div>

      {/* Split story */}
      <section className="container-x grid items-center gap-12 pb-24 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden bg-surface">
            <SmartImage
              src={HERO.images[1]}
              alt="Inside the Gumberi atelier"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label-micro text-accent">How the house works</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink">
            A studio, not a factory
          </h2>
          <div className="prose-gumberi mt-6">
            <p>
              We design everything in one room above a petroleum-street print
              shop in Kala Ghoda. Patterns are drafted on paper. Toiles are sewn
              in cheap cotton, torn apart, and recut — our record is eleven
              drafts for a single sleeve.
            </p>
            <p>
              Fabric comes from four family mills we visit in person every
              season. Dyeing happens in small vats in Kutch, which means our
              colours drift by design. When a piece sells out, it is genuinely
              gone — the next vat will be a sibling, not a twin.
            </p>
            <p>
              Everything is finished by twenty-three people in a bright loft:
              hand-rolled hems, bar-tacked stress points, edges painted in eight
              passes. That room adds 18% to our cost. We publish the number
              because secrecy is how clothes get cheap.
            </p>
          </div>
          <ButtonLink href="/sustainability" variant="outline" className="mt-8">
            Read our sustainability ledger
          </ButtonLink>
        </Reveal>
      </section>

      {/* Stats band */}
      <section className="border-y border-line bg-surface">
        <div className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="font-display text-4xl tracking-tight text-ink md:text-5xl">
                {s.value}
              </p>
              <p className="label-micro mt-2 text-ink-soft">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-24">
        <Reveal>
          <p className="label-micro text-accent">Milestones</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
            Seven years, honestly told
          </h2>
        </Reveal>
        <div className="mt-12 space-y-0">
          {[
            {
              year: "2019",
              title: "One pattern table",
              copy: "Founded with a single west-facing window, two tailors and the Aurelia slip, which sold out in nine days.",
            },
            {
              year: "2021",
              title: "The Kutch pact",
              copy: "We moved all terracotta dyeing to a fourth-generation vat family in Bhuj and have never used a synthetic orange since.",
            },
            {
              year: "2023",
              title: "The finishing loft",
              copy: "Twenty-three finishers, one bright room, and the decision to publish exactly what hand finishing costs.",
            },
            {
              year: "2026",
              title: "Eight stores, one rule",
              copy: "From Fort Kochi to Shahpur Jat — every store faces west. The light is part of the uniform.",
            },
          ].map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div className="grid gap-2 border-t border-line py-8 md:grid-cols-[8rem_1fr_2fr] md:gap-10">
                <p className="font-display text-3xl text-accent">{m.year}</p>
                <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
                <p className="text-sm leading-[1.85] text-ink-soft">{m.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visit */}
      <section className="bg-surface">
        <div className="container-x flex flex-col items-center py-20 text-center">
          <h2 className="max-w-xl font-display text-4xl leading-tight tracking-tight text-ink">
            The best way to know us is to stand in the light of one of our
            stores.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/stores">Find a store</ButtonLink>
            <Link
              href="/contact"
              className="label-micro self-center px-4 text-ink-soft hover:text-accent"
            >
              or write to us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
