import { notFound } from "next/navigation";
import { CATEGORIES } from "@catalog";
import { CategoryView } from "@/components/shop/category-view";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  if (!meta) return { title: "Shop" };
  return { title: `${meta.name} — ${meta.tagline}`, description: meta.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!CATEGORIES.some((c) => c.slug === category)) notFound();
  return <CategoryView category={category} />;
}
