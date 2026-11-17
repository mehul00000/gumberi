import { JournalList } from "@/components/journal/journal-list";

export const metadata = {
  title: "Journal",
  description:
    "Notes from the Gumberi floor — craft atlas entries, care school, style arithmetic and behind-the-seams roll calls.",
};

export default function JournalPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="mb-12 max-w-2xl">
        <p className="label-micro text-accent">The Journal</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          Notes from
          <br /> the floor
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.85] text-ink-soft">
          The dye rooms, the cutting table and the finishing loft, written
          down. No trend forecasts — just what we learned this month.
        </p>
      </div>
      <JournalList />
    </div>
  );
}
