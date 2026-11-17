import { RunwayStage } from "@/components/runway/runway-stage";

export const metadata = {
  title: "The Runway",
  description:
    "Walk the Gumberi runway — six looks in a depth haze driven by scroll, drag and arrow keys, with every piece one tap from the bag.",
};

export default function RunwayPage() {
  return (
    <section
      className="h-[calc(100svh-6.75rem)] min-h-[560px]"
      aria-label="The runway"
    >
      <RunwayStage />
    </section>
  );
}
