import Link from "next/link";
import { FAQS } from "@catalog";
import { PageHero } from "@/components/editorial/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "FAQ",
  description:
    "Answers about Gumberi orders, shipping, returns, sizing, and caring for indigo and silk.",
};

export default function FaqPage() {
  return (
    <div className="container-x max-w-3xl pb-24">
      <PageHero
        eyebrow="Questions"
        title="Asked, answered."
        copy="The things people actually write to us about. If yours is not here, the studio is one letter away."
      />

      <div className="space-y-12">
        {FAQS.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.04}>
            <h2 className="label-micro mb-4 text-accent">{group.title}</h2>
            <Accordion
              items={group.items.map((item) => ({
                title: item.q,
                content: item.a,
              }))}
              defaultOpen={gi === 0 ? 0 : -1}
              className="border-t-0 border-b-0"
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border border-dashed border-line bg-surface p-8 text-center">
        <p className="font-display text-2xl text-ink">Still holding a question?</p>
        <Link
          href="/contact"
          className="label-micro mt-4 inline-block border border-line px-5 py-3 text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Write to the studio →
        </Link>
      </div>
    </div>
  );
}
