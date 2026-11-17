import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Terms of service",
  description: "The terms of the Gumberi atelier — orders, dye drift, care and law.",
};

const SECTIONS: { h: string; ps: string[] }[] = [
  {
    h: "The agreement",
    ps: [
      "By using gumberi.in or placing an order, you agree to these terms. They are governed by the laws of India, with jurisdiction in Mumbai. If any clause is found unenforceable, the rest stands.",
    ],
  },
  {
    h: "Products & the dye drift",
    ps: [
      "Gumberi garments are dyed in small natural vats. Colour varies between batches and from photographs — this drift is a documented property of the product, not a defect. Measurements have a tolerance of ±0.5 inch. Where a product page states a fabric composition, that composition is guaranteed.",
    ],
  },
  {
    h: "Orders & pricing",
    ps: [
      "Prices are in Indian Rupees and include GST. An order is accepted when our confirmation email arrives; if a piece has sold out between your click and our confirmation, you are refunded in full within 48 hours. We may cancel orders affected by obvious pricing errors, with notice.",
    ],
  },
  {
    h: "Returns",
    ps: [
      "Fourteen days from delivery, free pickup, tags on — details on the Returns page. Sale and made-to-hem pieces are final sale; this is stated on the product page before purchase.",
    ],
  },
  {
    h: "Intellectual property",
    ps: [
      "Gumberi's name, wordmark, patterns, photographs and journal text belong to Gumberi Atelier Pvt. Ltd. Block-print motifs remain the inheritance of the artisan families who carved them; we license them, we do not own them.",
    ],
  },
  {
    h: "Liability",
    ps: [
      "Our liability for any order is limited to its value. Nothing in these terms excludes liability that cannot lawfully be excluded. To the extent permitted, we are not liable for indirect losses arising from use of the site.",
    ],
  },
  {
    h: "Contact",
    ps: [
      "Gumberi Atelier Pvt. Ltd., 14 Ropewalk Lane, Kala Ghoda, Fort, Mumbai 400001. Legal queries: hello@gumberi.in. Effective 1 October 2026.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl">
      <PageHero
        eyebrow="Legal"
        title="Terms, without the fog."
        copy="The rules of the house — written to be understood on one read. The dye-drift clause is the one to know."
      />
      <div className="prose-gumberi pb-24">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.03}>
            <h2>{s.h}</h2>
            {s.ps.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
