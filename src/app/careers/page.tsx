import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export const metadata = {
  title: "Careers",
  description:
    "Work at Gumberi — pattern masters, dyers, finishers and the studio team. Open roles across Mumbai and Kutch.",
};

const ROLES = [
  {
    title: "Pattern Master — Womenswear",
    place: "Mumbai · Full time",
    type: "Studio",
    copy: "Eleven drafts for a sleeve is normal here. You will own block development across the Midnight Silk and Ivory Hour chapters.",
  },
  {
    title: "Dye Master — Natural Vats",
    place: "Bhuj, Kutch · Full time",
    type: "Craft",
    copy: "You will run madder and iron afterbaths at our partner family's workshop, and teach two apprentices a year.",
  },
  {
    title: "Finisher — Hand-rolled Hems",
    place: "Mumbai · Full time",
    type: "Loft",
    copy: "Nine stitches to the inch. Training provided, patience not — you either already have it or the loft will grow it.",
  },
  {
    title: "Store Lead — Fort Kochi",
    place: "Kochi · Full time",
    type: "Retail",
    copy: "Run our smallest, westernmost room. You will style, mend, steam and remember every regular's size and dye lot.",
  },
  {
    title: "Content Lead — Journal",
    place: "Remote (IST overlap) · Contract",
    type: "Studio",
    copy: "Write the Journal the way it is written now: first-person, number-heavy, allergic to the word 'elevate'.",
  },
];

export default function CareersPage() {
  return (
    <div className="container-x">
      <PageHero
        eyebrow="Join the house"
        title="Slow work, done properly."
        copy="We are twenty-nine people who make a small number of things extremely well. If you would rather master one skill than sample ten, you will fit."
      />

      <div className="pb-8">
        {ROLES.map((role, i) => (
          <Reveal key={role.title} delay={i * 0.04}>
            <article className="group grid gap-4 border-t border-line py-8 transition-colors last:border-b hover:bg-surface/60 md:grid-cols-[1fr_2fr] md:gap-12 md:px-4">
              <div>
                <p className="label-micro text-accent">{role.type}</p>
                <h2 className="mt-2 font-display text-2xl leading-snug tracking-tight text-ink">
                  {role.title}
                </h2>
                <p className="mt-1 text-xs text-ink-soft">{role.place}</p>
              </div>
              <div className="flex items-start justify-between gap-6">
                <p className="max-w-xl text-sm leading-[1.85] text-ink-soft">
                  {role.copy}
                </p>
                <a
                  href={`mailto:careers@gumberi.in?subject=${encodeURIComponent(
                    role.title
                  )}`}
                  className="label-micro flex shrink-0 items-center gap-1.5 border border-line px-4 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Apply <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="my-16 border border-dashed border-line bg-surface p-10 text-center">
        <h2 className="font-display text-3xl tracking-tight text-ink">
          Nothing fits, but you belong here?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Send a note with the thing you have made that you are proudest of.
          We read everything and reply to anything that shows a hand.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm compact />
        </div>
      </section>
    </div>
  );
}
