import { Leaf, Recycle, HandHeart, Droplets } from "lucide-react";
import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Sustainability",
  description:
    "The Gumberi ledger — natural dyes, deadstock policy, living wages and repair-first design, published with numbers.",
};

const PILLARS = [
  {
    icon: Droplets,
    title: "Dye, honestly",
    copy: "All terracotta comes from madder root and iron afterbaths in Kutch; all indigo is natural. No azo dyes anywhere in the house. Small vats mean colour drift — we call it a feature, not waste.",
    metric: "0 synthetic oranges since 2021",
  },
  {
    icon: Recycle,
    title: "Nothing bigger than a stamp is wasted",
    copy: "Leather offcuts become Ralli totes. Selvedge trims become ribbon. Silk scraps are re-reeled. Last year 94% of cutting-room waste by weight became product.",
    metric: "94% waste-to-product, 2025",
  },
  {
    icon: HandHeart,
    title: "Hands, priced in public",
    copy: "Hand finishing adds 18% to our cost and we publish it. Every finisher earns above the Mumbai living-wage benchmark by 31%, with PF and paid leave.",
    metric: "+31% over living wage",
  },
  {
    icon: Leaf,
    title: "Repair first, forever",
    copy: "Every Gumberi piece is repairable by design — stitched soles, replaceable buttons, hems with allowance. Repairs are free for the first two years.",
    metric: "1,400+ repairs in 2025",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="container-x">
      <PageHero
        eyebrow="The ledger"
        title="Sustainability, with numbers attached."
        copy="Fashion's supply chains hide in adjectives. Ours hides in nothing — here are the policies, the percentages and the people, updated every season."
      />

      <div className="grid gap-6 pb-24 md:grid-cols-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <article className="flex h-full flex-col border border-line bg-surface p-8">
              <p.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h2 className="mt-5 font-display text-2xl tracking-tight text-ink">
                {p.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-[1.85] text-ink-soft">
                {p.copy}
              </p>
              <p className="label-micro mt-6 border-t border-line pt-4 text-sage">
                {p.metric}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* The fine print, in plain sight */}
      <section className="border-t border-line pb-24">
        <Reveal className="py-16">
          <p className="label-micro text-accent">Where we are not there yet</p>
          <div className="prose-gumberi mt-6 max-w-3xl">
            <p>
              Our wool is RWS-certified but our silk supply chain is not yet
              traceable to the reel. Our linen is European flax but shipped on
              conventional freight. We will say this every season until the
              line moves — a ledger you only write wins into is marketing, not
              accountability.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
