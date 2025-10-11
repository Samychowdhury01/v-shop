
import { fetchProducts } from "@/lib/utils/fetch-products";
import { ProductGrid } from "./_components/product-grid";
import { ProductPageLayout } from "./_components/product-page-layout";

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

export default async function ProductsPage() {
  // Fetch all products from API
  const products = await fetchProducts();

  return (
    <ProductPageLayout
      title="All Products - Premium Vape Collection in UAE"
      description="Explore our complete collection of premium vaping products including disposable vapes, JUUL pods, and e-liquids from top brands like Al Fakher, ELF BAR, and FUMMO. Fast delivery across Dubai and UAE."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
      ]}
      sidebarProducts={sidebarProducts}
    >
      <ProductGrid products={products} />
    </ProductPageLayout>
  );
}