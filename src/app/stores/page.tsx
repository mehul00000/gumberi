import { MapPin, Phone, Clock } from "lucide-react";
import { STORES } from "@catalog";
import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";

export const metadata = {
  title: "Stores",
  description:
    "Eight Gumberi stores across India — Mumbai, Delhi, Bengaluru, Hyderabad, Jaipur, Pune, Chennai and Kochi. Every one faces west.",
};

export default function StoresPage() {
  return (
    <div className="container-x">
      <PageHero
        eyebrow="Visit"
        title="Eight doors, all facing west."
        copy="Every Gumberi store is lit by the same rule as the studio — nothing is displayed under light the clothes will never actually be worn in."
      />

      <div className="grid gap-8 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {STORES.map((store, i) => (
          <Reveal key={store.city} delay={(i % 3) * 0.06}>
            <article className="group flex h-full flex-col border border-line bg-surface">
              <div className="aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={store.image}
                  alt={`Gumberi ${store.city}`}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="label-micro text-accent">{store.city}</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-ink">
                  {store.name}
                </h2>
                <div className="mt-4 space-y-2.5 text-sm text-ink-soft">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-soft" />
                    {store.address}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {store.hours}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {store.phone}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    store.name + " " + store.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="label-micro mt-6 inline-flex w-fit items-center gap-2 border-b border-ink/30 pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Get directions
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
