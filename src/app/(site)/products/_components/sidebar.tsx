import Image from "next/image";
import { PriceFilter } from "./price-filter";
import { StockFilter } from "./stock-filter";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface SidebarProps {
  products: Product[];
}

export function Sidebar({ products }: SidebarProps) {
  const categories = [
    "Offer",
    "Best seller",
    "Latest",
    "Featured",
    "Popular",
    "DISPOSABLE VAPE",
    "POD SYSTEM",
    "PODS",
    "Nicotine Salt-30 ML",
    "JUUL",
    "Latest Product",
  ];

  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">FILTER BY PRICE</h3>
        <PriceFilter />
      </div>

      {/* Stock Status Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">STOCK STATUS</h3>
        <StockFilter />
      </div>

      {/* Product Categories */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">PRODUCT CATEGORIES</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="block text-sm text-gray-600 hover:text-black transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">LATEST PRODUCT</h3>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xs text-gray-900 line-clamp-2 leading-tight">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold  mt-1">
                  {product.price} AED
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
