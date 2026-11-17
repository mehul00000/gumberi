import { PageHero } from "@/components/editorial/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata = {
  title: "Privacy policy",
  description: "What Gumberi collects, why, and what we never do with it.",
};

const SECTIONS: { h: string; ps: string[] }[] = [
  {
    h: "What we collect",
    ps: [
      "Account data (name, email) when you create one — handled by Clerk as our authentication provider. Order data (address, phone, items) when you place one — stored in Convex, our backend. Analytics in aggregate: which pages are read, which sizes sell out. No individual tracking profiles, no third-party ad pixels.",
    ],
  },
  {
    h: "What we never do",
    ps: [
      "We do not sell, rent, trade or 'share with partners' any personal data. We do not send marketing email without an explicit subscribe, and every letter has a one-click exit. We do not store card numbers — payments are handled entirely by the payment gateway.",
    ],
  },
  {
    h: "Cookies",
    ps: [
      "Strictly necessary: session and cart persistence (including the anonymous visitor key that keeps your bag between visits). Preference: your light/dark theme. That is the whole list. In demo mode, everything — cart, wishlist, orders, game scores — lives in your browser's local storage and never leaves your device.",
    ],
  },
  {
    h: "Your rights",
    ps: [
      "Write to privacy@gumberi.in to access, correct, export or erase your data. Erasure requests are completed within 30 days, with order records retained only as long as tax law requires. Indian residents are covered under the DPDP Act 2023; EU residents under GDPR, and we honour whichever is stronger for you.",
    ],
  },
  {
    h: "Children",
    ps: [
      "Gumberi is not directed at children under 13 and we do not knowingly collect their data. If you believe a child has given us information, write to us and it will be deleted promptly.",
    ],
  },
  {
    h: "Changes",
    ps: [
      "If this policy changes materially, we will email the account holder and date the change at the top of this page. The current version is dated 1 October 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl">
      <PageHero
        eyebrow="Legal"
        title="Privacy, in plain words."
        copy="The shortest honest privacy policy we could write. It exists to be read, not to be survived."
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
