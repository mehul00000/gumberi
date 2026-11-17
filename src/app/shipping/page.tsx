import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Shipping",
  description:
    "Gumberi shipping — free over ₹4,999, metro delivery in 2–4 days, international to 24 countries.",
};

const ZONES = [
  { zone: "Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune", time: "2–4 working days", fee: "Free over ₹4,999 · ₹99 below" },
  { zone: "Rest of India", time: "4–7 working days", fee: "Free over ₹4,999 · ₹99 below" },
  { zone: "Made-to-hem pieces", time: "+3 working days on the above", fee: "No extra charge" },
  { zone: "International (24 countries)", time: "7–12 working days", fee: "Calculated at checkout, duties included" },
];

export default function ShippingPage() {
  return (
    <div className="container-x max-w-3xl">
      <PageHero
        eyebrow="Logistics"
        title="Ships slow, arrives fast."
        copy="Everything leaves the loft within 48 hours of your order — the delay is never on our floor, only on the road."
      />

      <Reveal>
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="label-micro px-5 py-4 text-ink">Destination</th>
                <th className="label-micro px-5 py-4 text-ink">Time</th>
                <th className="label-micro px-5 py-4 text-ink">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ZONES.map((z) => (
                <tr key={z.zone}>
                  <td className="px-5 py-4 font-medium text-ink">{z.zone}</td>
                  <td className="px-5 py-4 text-ink-soft">{z.time}</td>
                  <td className="px-5 py-4 text-ink-soft">{z.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal className="prose-gumberi py-14">
        <h2>How your order travels</h2>
        <p>
          Orders placed before 2 p.m. IST are picked, checked by the finishing
          loft and dispatched the same day. You receive a tracking link by SMS
          and email within one hour of dispatch, and a photograph of your
          pieces folded — because packing is part of the product.
        </p>
        <h2>Packaging</h2>
        <p>
          Boxes are recycled board, tape is paper, and the tissue is
          compostable. The garment bag inside is designed to be reused — send
          it back with a return or keep it for storage. Nothing in the parcel
          is plastic except the garment itself, which is cotton, silk, linen,
          or wool.
        </p>
        <h2>One more thing</h2>
        <p>
          If a delivery date matters — a wedding, a flight, an anniversary —
          write to us at checkout and we will hand-hold the parcel through the
          network. It has worked every time so far.
        </p>
      </Reveal>
    </div>
  );
}
