import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <p className="label-micro text-accent">Loose thread</p>
      <h1 className="mt-4 font-display text-[22vw] leading-none tracking-tight text-ink sm:text-[10rem]">
        404
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
        This page was cut from the pattern. It happens — some drafts never make
        it to fabric.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back to the atelier
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" size="lg">
          Shop the collections
        </ButtonLink>
      </div>
    </div>
  );
}
