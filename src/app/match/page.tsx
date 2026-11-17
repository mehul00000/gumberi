import { MatchGame } from "@/components/match/match-game";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Match the Look",
  description:
    "The Gumberi matching game — pair the garments in the fewest moves and claim your place on the leaderboard.",
};

export default function MatchPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <Reveal className="mb-12 max-w-2xl">
        <p className="label-micro text-accent">A game from the cutting table</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
          Match the Look
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.85] text-ink-soft">
          Twelve tiles, six garments, one board. Match every pair in the
          fewest moves — then put your name on the board. The top three at
          season close get first pick of the next dye lot.
        </p>
      </Reveal>
      <MatchGame />
    </div>
  );
}
