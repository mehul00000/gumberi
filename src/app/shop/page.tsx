import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";

export const metadata = {
  title: "Shop all",
  description:
    "Every Gumberi piece — silk, linen, denim and brass. Filter by category, size and price.",
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<div className="container-x py-24" />}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ShopContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  return <ShopView initialQuery={typeof q === "string" ? q : ""} />;
}
