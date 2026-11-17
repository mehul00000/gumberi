import { PRODUCTS } from "@catalog";
import { LookbookClosing, ParallaxFrame, type Frame } from "@/components/editorial/parallax-frame";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Lookbook — The Ivory Hour",
  description:
    "Eleven looks, ninety minutes, one borrowed bungalow in Kochi. The Gumberi Summer '26 lookbook.",
};

const byslug = (slug: string) => PRODUCTS.find((p) => p.slug === slug)!;

export default function LookbookPage() {
  const frames: Frame[] = [
    {
      image: byslug("aurelia-slip-dress").images[0],
      chapter: "Look 01 · Midnight Silk",
      look: "Aurelia Slip Dress",
      caption: "Bias-cut, so it moves a half-second after you do.",
    },
    {
      image: byslug("sahara-trench").images[0],
      chapter: "Look 02 · Terracotta Summer",
      look: "Sahara Trench",
      caption: "The orange of a Kutch wall at noon.",
    },
    {
      image: byslug("loom-linen-coord").images[0],
      chapter: "Look 03 · Monsoon Linen",
      look: "Loom Linen Co-ord",
      caption: "Washed twice at the mill. Creases allowed.",
    },
    {
      image: byslug("kaveri-overshirt").images[1],
      chapter: "Look 04 · Everyday Uniform",
      look: "Kaveri Overshirt",
      caption: "Pit-loom slub no machine will copy.",
    },
    {
      image: byslug("meridian-wool-blazer").images[0],
      chapter: "Look 05 · Wedding Atelier",
      look: "Meridian Wool Blazer",
      caption: "Tailoring you can fold into a weekend bag.",
    },
    {
      image: byslug("sunbridge-hoops").images[0],
      chapter: "Look 06 · Wedding Atelier",
      look: "Sunbridge Hoops",
      caption: "Carved by candlelight. The asymmetry stayed.",
    },
    {
      image: byslug("atelier-low-sneaker").images[0],
      chapter: "Look 07 · The Ivory Hour",
      look: "Atelier Low Sneaker",
      caption: "Nine stitches to the inch, by hand.",
    },
    {
      image: byslug("loom-linen-coord").images[2],
      chapter: "Look 08 · Monsoon Linen",
      look: "Loom Linen Co-ord",
      caption: "Softened twice at the mill, creases welcome.",
    },
    {
      image: byslug("kaveri-overshirt").images[2],
      chapter: "Look 09 · Everyday Uniform",
      look: "Kaveri Overshirt",
      caption: "Pit-loom slub, boxy and unbothered.",
    },
  ];

  return (
    <>
      {/* Opening */}
      <section className="container-x pb-10 pt-16 md:pb-16 md:pt-24">
        <Reveal className="max-w-3xl">
          <p className="label-micro text-accent">Summer &apos;26 · The Film, Framed</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.0] tracking-tight text-ink md:text-8xl">
            The Ivory
            <br />
            <span className="italic text-accent">Hour.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-ink-soft">
            We rented a defunct accounting office in Fort Kochi for one evening.
            The desks stayed. The looks moved through the rooms as the sun
            crossed the courtyard — first frame at 4:31 p.m., last at 6:02.
            Scroll the reel.
          </p>
        </Reveal>
      </section>

      <div className="container-x space-y-4 md:space-y-8">
        {frames.map((f, i) => (
          <ParallaxFrame key={f.look} frame={f} index={i} />
        ))}
      </div>

      <LookbookClosing />
    </>
  );
}
