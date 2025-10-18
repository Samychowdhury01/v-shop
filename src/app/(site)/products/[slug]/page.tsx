import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsServer from "./_components/product-details-server";
import ProductTabsClient from "./_components/product-tabs-client";
import { Product } from "@/types/products";
import { fetchProductBySlug, fetchProducts } from "@/lib/utils/fetch-products";
import ProductImages from "./_components/product-images";

// Generate static params for all product slugs
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product: Product) => ({
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
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `Buy ${product.productName} in UAE at the Best Price | Vape Dubai Hub`,
    description: `Buy ${product.productName} in UAE with thousands of puffs, multiple flavors, rechargeable battery, and free shipping over AED 300. Order now from Vape Dubai Hub.`,
    keywords: `${product.productName}, disposable vape UAE, vape Dubai, rechargeable vape, salt nicotine`,
    openGraph: {
      title: `${product.productName} - Premium Puffs | UAE`,
      description:
        product.productShortDescription ||
        `Premium disposable vape with multiple flavors and rechargeable battery. Free shipping in UAE.`,
      images: product.thumbnailImage,
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
  const product = await fetchProductBySlug(slug);

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
          <ProductImages productData={product} />
        </Suspense>

        <ProductDetailsServer product={product} />
      </div>

      <ProductTabsClient product={product} />
    </div>
  );
}
