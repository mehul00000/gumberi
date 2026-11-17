import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Contact",
  description:
    "Write to the Gumberi studio — order help, sizing advice, repairs, press. We reply within one working day.",
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Post",
    lines: ["hello@gumberi.in", "press@gumberi.in for media"],
  },
  {
    icon: Phone,
    title: "Call the studio",
    lines: ["+91 22 4004 1926", "Mon–Sat, 10:00–18:00 IST"],
  },
  {
    icon: MapPin,
    title: "Visit the flagship",
    lines: ["14 Ropewalk Lane, Kala Ghoda", "Fort, Mumbai 400001"],
  },
  {
    icon: Clock,
    title: "Reply time",
    lines: ["One working day", "Repairs: three days"],
  },
];

export default function ContactPage() {
  return (
    <div className="container-x">
      <PageHero
        eyebrow="Write to us"
        title="A real person reads every letter."
        copy="No ticket numbers, no 'your call is important'. Whether it is a dye-lot question or a hem that needs advice, it reaches the studio floor."
      />

      <div className="grid gap-14 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-8">
            {CHANNELS.map((c) => (
              <div key={c.title} className="flex gap-4">
                <c.icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <h2 className="text-sm font-semibold text-ink">{c.title}</h2>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-0.5 text-sm text-ink-soft">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
