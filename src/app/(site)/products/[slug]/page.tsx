import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./_components/product-details-client";
import ProductDetailsServer from "./_components/product-details-server";
import ProductTabsClient from "./_components/product-tabs-client";
import { products } from "@/data/products";

// Fetch product by slug
async function getProductBySlug(slug: string) {
  const product = products.find((p) => p.slug === slug);
  return product;
}

// Generate static params for all product slugs
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata dynamically based on the product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `Buy ${product.name} in UAE at the Best Price | Vape Dubai Hub`,
    description: `Buy ${product.name} in UAE with thousands of puffs, multiple flavors, rechargeable battery, and free shipping over AED 300. Order now from Vape Dubai Hub.`,
    keywords: `${product.name}, disposable vape UAE, vape Dubai, rechargeable vape, salt nicotine`,
    openGraph: {
      title: `${product.name} - Premium Puffs | UAE`,
      description:
        product.description ||
        `Premium disposable vape with multiple flavors and rechargeable battery. Free shipping in UAE.`,
      images: product.images?.[0]
        ? [product.images[0]]
        : ["/colorful-disposable-vape-devices-in-different-colo.jpg"],
    },
  };
}

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-200 aspect-square rounded-lg" />
          }
        >
          <ProductDetailsClient productData={product} />
        </Suspense>

        <ProductDetailsServer product={product} />
      </div>

      <ProductTabsClient product={product} />
    </div>
  );
}
