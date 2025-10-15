/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";

import { promises as fs } from 'fs';
import path from 'path';
import { ProductPageLayout } from "../../../_components/product-page-layout";
import { ProductGrid } from "../../../_components/product-grid";
import { fetchProductsByBrand } from "@/lib/utils/fetch-products";

type BrandProductsPageProps = {
  params: Promise<{
    categorySlug: string;
    brandSlug: string;
  }>;
};

// Fetch product data from JSON file
async function getProductData() {

  const filePath = path.join(process.cwd(), 'public', 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Generate static params for all category/brand combinations
export async function generateStaticParams() {
  const data = await getProductData();

  const params: { categorySlug: string; brandSlug: string }[] = [];
  
  data.forEach((category: any) => {
    category.brands.forEach((brand: any) => {
      params.push({
        categorySlug: category.slug,
        brandSlug: brand.slug,
      });
    });
  });
  
  return params;
}

const sidebarProducts = [
  {
    id: Math.random().toString(),
    name: "Best Pod Salt Nexus 3500 Puffs Disposable Vape in UAE",
    price: 40,
    image: "/colorful-disposable-vape.jpg",
  },
  {
    id: Math.random().toString(),
    name: "Best Pod Salt Core Lemon Slice E-liquid 30ml in UAE",
    price: 45,
    image: "/e-liquid-bottle-lemon.jpg",
  },
  {
    id: Math.random().toString(),
    name: "Cheap Price VGOD Tropical Mango Salt Nic E-liquid 30ml in UAE",
    price: 35,
    image: "/tropical-mango-e-liquid-bottle.jpg",
  },
];

export default async function BrandProductsPage({
  params,
}: BrandProductsPageProps) {
  const { categorySlug, brandSlug } = await params;
  const brandProducts = await fetchProductsByBrand(categorySlug, brandSlug);

  console.log(brandProducts, "brand products")
  // Fetch product data
  const data = await getProductData();
  
  // Find the category
  const category = data.find((cat: any) => cat.slug === categorySlug);
  
  // Return 404 if category not found
  if (!category) {
    notFound();
  }
  
  // Find the brand within the category
  const brand = category.brands.find((b: any) => b.slug === brandSlug);
  
  // Return 404 if brand not found
  if (!brand) {
    notFound();
  }
  
  // Transform products for this specific brand
  const products = brand.types.map((product: any) => ({
    id:
      product.slug +
      "-" +
      product.productName.toLowerCase().replace(/\s+/g, "-"),
    name: product.productName,
    price: product.price,
    image: product.thumbnailImage,
    description: product.productShortDescription,
    soldOut: product.soldOut,
    brand: brand.name,
    category: category.category,
    flavours: product.flavours,
    offer: product.offer,
    slug: product.slug,
  }));

  return (
    <ProductPageLayout
      title={`${brand.name.toUpperCase()} - ${category.category.toUpperCase()}`}
      description={`Browse our collection of ${brand.name} ${category.category} products`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: category.category, href: `/products/categories/${categorySlug}` },
        { label: brand.name, href: `/products/categories/${categorySlug}/${brandSlug}` },
      ]}
      sidebarProducts={sidebarProducts}
    >
      <ProductGrid products={products} />
    </ProductPageLayout>
  );
}