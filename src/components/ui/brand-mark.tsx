/**
 * The Gumberi monogram — same artwork as the favicon, but drawn with
 * theme tokens so it adapts to light/dark inside the page.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="var(--accent)" />
      <path
        d="M 47 20 A 15.5 15.5 0 1 0 47 44 L 47 33 L 35 33"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="13" r="3.5" fill="var(--gold)" />
    </svg>
  );
}
