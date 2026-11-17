import { PRODUCTS } from "@catalog";
import { ProductView } from "@/components/shop/product-view";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
