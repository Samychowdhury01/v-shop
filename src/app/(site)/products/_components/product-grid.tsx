// product-grid.jsx - Server Component
import { ProductCard } from "@/components/product-card";
import { ProductControls } from "./product-controls";
import { Product } from "@/types/products";

interface ProductGridProps {
  products: Product[];
  searchParams?: {
    view?: string;
    cols?: string;
  };
}

export function ProductGrid({
  products,
  searchParams,
}: ProductGridProps) {
  const cols =  parseInt(searchParams?.cols || "3");

  const gridClassName: Record<number, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <ProductControls />

      {/* Product Grid */}
      <div className={`grid ${gridClassName[cols] || gridClassName[3]} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
