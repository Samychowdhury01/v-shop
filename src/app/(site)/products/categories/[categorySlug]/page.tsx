/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductPageLayout } from "../../_components/product-page-layout";
import { ProductGrid } from "../../_components/product-grid";
import { notFound } from "next/navigation";

type CategoryProductsPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

// Fetch product data from JSON file
async function getProductData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products.json`, {
    cache: 'force-cache', // Enable SSG caching
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  
  return res.json();
}

// Generate static params for all categories
export async function generateStaticParams() {
  const data = await getProductData();
  
  return data.map((category: any) => ({
    categorySlug: category.slug,
  }));
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

export default async function CategoryProductsPage({
  params,
}: CategoryProductsPageProps) {
  const { categorySlug } = await params;
  
  // Fetch product data
  const data = await getProductData();
  
  // Find the category
  const category = data.find((cat: any) => cat.slug === categorySlug);
  
  // Return 404 if category not found
  if (!category) {
    notFound();
  }
  
  // Transform products from all brands in the category
  const products = category.brands.flatMap((brand: any) => 
    brand.types.map((product: any) => ({
      id: product.slug + '-' + product.productName.toLowerCase().replace(/\s+/g, '-'),
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
    }))
  );

  return (
    <ProductPageLayout
      title={category.category.toUpperCase()}
      description={`Browse our collection of ${category.category} products`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: category.category, href: `/products/${categorySlug}` },
      ]}
      sidebarProducts={sidebarProducts}
    >
      <ProductGrid products={products} />
    </ProductPageLayout>
  );
}