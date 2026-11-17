import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Returns & exchanges",
  description:
    "14 days, free pickup, no questions. How Gumberi returns, exchanges and refunds work.",
};

const STEPS = [
  {
    n: "Request",
    copy: "Open your account's Orders page (or write to hello@gumberi.in with the order number) and choose Return or Exchange within 14 days of delivery.",
  },
  {
    n: "Pickup",
    copy: "A courier arrives within 48 hours with the paperwork done. Keep the pieces unworn with tags on — the reusable garment bag goes back too.",
  },
  {
    n: "Resolution",
    copy: "Exchanges ship the day your pickup is scanned — you never wait twice. Refunds initiate within 24 hours of the pickup scan.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="container-x max-w-3xl">
      <PageHero
        eyebrow="Easy exits"
        title="14 days. Free pickup. No questions."
        copy="If a piece is not right, it comes back — the dye lot will forgive you. Sale pieces are the one exception: limited vats make them one-off runs."
      />

      <div className="pb-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="grid gap-3 border-t border-line py-8 last:border-b md:grid-cols-[8rem_1fr] md:gap-10">
              <p className="font-display text-3xl text-accent">{s.n}</p>
              <p className="max-w-xl text-sm leading-[1.85] text-ink-soft">{s.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="prose-gumberi py-14">
        <h2>The details, in plain words</h2>
        <ul>
          <li>
            <strong>Condition:</strong> unworn, unwashed, tags on. Try shoes on
            carpet, not pavement.
          </li>
          <li>
            <strong>Refund speed:</strong> initiated within 24 hours of pickup;
            banks take 3–5 working days to land it.
          </li>
          <li>
            <strong>Final sale:</strong> marked pieces from limited dye lots.
            The product page says so before you buy, never after.
          </li>
          <li>
            <strong>Repairs are not returns:</strong> a loose thread at month
            eight is a repair, and repairs are free for two years. Write to us.
          </li>
        </ul>
      </Reveal>
    </div>
  );
}
