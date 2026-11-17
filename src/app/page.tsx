import { CollectionsChapter } from "@/components/home/collections-chapter";
import { CombinationsPeek } from "@/components/home/combinations-peek";
import { CraftPinned } from "@/components/home/craft-pinned";
import { Hero } from "@/components/home/hero";
import { JournalPeek } from "@/components/home/journal-peek";
import { LookbookPeek } from "@/components/home/lookbook-peek";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Testimonials } from "@/components/home/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <CollectionsChapter />
      <NewArrivals />
      <CombinationsPeek />
      <CraftPinned />
      <LookbookPeek />
      <JournalPeek />
      <Testimonials />

      {/* Closing chapter — join the letter */}
      <section className="container-x py-24 text-center md:py-32">
        <p className="label-micro text-accent">Last page</p>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
          The rest arrives by letter.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          Dye-lot drops, lookbook premiers and the occasional pattern-room
          confession. Once a month, never more.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <NewsletterForm />
        </div>
        <ButtonLink href="/shop" variant="outline" size="lg" className="mt-10">
          Meanwhile — shop the atelier
        </ButtonLink>
      </section>
    </>
  );
}
