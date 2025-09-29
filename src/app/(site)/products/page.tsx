import { products } from "@/data/products";
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

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  return (
    <ProductPageLayout
      title="Juul Pods: The Ultimate Guide – It's Pronounced 'J-u-u-l' not, 'Y'all'"
      description="Welcome to your no-bs guide to Juul Pods – defining simplicity as easy as using a toothpick. As technology progresses to grow with time, their inherent change and features also casts reflection on the contemporary culture, their needs and aspirations, which also evolves with time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "JUUL", href: "/products/juul" },
      ]}
      sidebarProducts={sidebarProducts}
    >
      <ProductGrid products={products} searchParams={resolvedSearchParams} />
    </ProductPageLayout>
  );
}
