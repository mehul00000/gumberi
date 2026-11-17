import { Suspense } from "react";
import { SuccessView } from "@/components/checkout/success-view";

export const metadata = {
  title: "Order confirmed",
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<div className="container-x py-24" />}>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ order?: string | string[] }>;
}) {
  const { order } = await searchParams;
  const number = typeof order === "string" ? order : "";
  return <SuccessView number={number} />;
}
