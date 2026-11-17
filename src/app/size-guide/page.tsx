import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Size guide",
  description:
    "Gumberi size charts — tops, bottoms and footwear, measured flat in inches, with honest fit notes.",
};

const TOPS = {
  head: ["Size", "Chest (in)", "Waist (in)", "Shoulder (in)", "Length (in)"],
  rows: [
    ["XS", "34", "27", "14", "26"],
    ["S", "36", "29", "14.5", "26.5"],
    ["M", "38", "31", "15", "27"],
    ["L", "40", "33", "15.5", "27.5"],
    ["XL", "42", "35", "16", "28"],
  ],
};

const BOTTOMS = {
  head: ["Waist (in)", "Hip (in)", "Inseam (in)", "Fits"],
  rows: [
    ["28", "36", "29", "26–28 waist"],
    ["30", "38", "30", "28–30 waist"],
    ["32", "40", "30", "30–32 waist"],
    ["34", "42", "31", "32–34 waist"],
    ["36", "44", "31", "34–36 waist"],
  ],
};

const SHOES = {
  head: ["UK", "EU", "Foot length (cm)"],
  rows: [
    ["6", "39", "24.5"],
    ["7", "40.5", "25.4"],
    ["8", "42", "26.2"],
    ["9", "43", "27"],
    ["10", "44.5", "27.9"],
    ["11", "46", "28.8"],
  ],
};

function Chart({ title, note, data }: { title: string; note: string; data: { head: string[]; rows: string[][] } }) {
  return (
    <Reveal>
      <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
      <p className="mt-1 text-xs text-ink-soft">{note}</p>
      <div className="mt-4 overflow-x-auto border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface">
              {data.head.map((h) => (
                <th key={h} className="label-micro px-4 py-3 text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={i === 0 ? "px-4 py-3 font-medium text-ink" : "px-4 py-3 text-ink-soft"}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function SizeGuidePage() {
  return (
    <div className="container-x max-w-3xl">
      <PageHero
        eyebrow="Measurements"
        title="Sizes, measured flat, honestly."
        copy="All measurements are of the garment laid flat, in inches — not of an imaginary body. If you are between sizes, take the larger in garment-dyed pieces."
      />

      <div className="space-y-14 pb-24">
        <Chart
          title="Tops & overshirts"
          note="Aurelia is bias-cut — it skims rather than sits; size as-is."
          data={TOPS}
        />
        <Chart
          title="Trousers & denim"
          note="Wanderer has side adjusters — waist can flex 2 inches."
          data={BOTTOMS}
        />
        <Chart
          title="Footwear"
          note="Kolhapuris run generous; Chelsea boots run true."
          data={SHOES}
        />

        <Reveal>
          <div className="border border-dashed border-line bg-surface p-8">
            <h2 className="font-display text-2xl text-ink">The two-rule shortcut</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-[1.85] text-ink-soft">
              <li>Measure a garment you already love, flat, and match the chart.</li>
              <li>
                Still torn? Write to the studio — include your usual size in two
                other brands and you will get a one-line answer the same day.
              </li>
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
