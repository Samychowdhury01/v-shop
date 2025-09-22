
import { ProductCard } from "@/components/product-card";
import { ProductControls } from "./product-controls";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  isOnSale: boolean;
  inStock: boolean;
  category: string;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {

  return (
    <div className="space-y-6">
      {/* Controls */}
      <ProductControls
      />
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
