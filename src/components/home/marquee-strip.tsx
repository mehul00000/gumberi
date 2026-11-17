import { Asterisk } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const PHRASES = [
  "Hand-finished in Mumbai",
  "Dyed in Kutch",
  "Small batches only",
  "Natural indigo",
  "23 finishers",
  "Est. 2019",
];

export function MarqueeStrip() {
  return (
    <div className="border-y border-line bg-bg py-5" aria-hidden="true">
      <Marquee speed={36}>
        {PHRASES.map((p) => (
          <span
            key={p}
            className="label-micro flex items-center gap-6 pr-6 text-ink-soft"
          >
            {p}
            <Asterisk className="h-4 w-4 text-accent" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
