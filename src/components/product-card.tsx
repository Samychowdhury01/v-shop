import Image from "next/image";
import { Product } from "@/types/products";
import Link from "next/link";
import AddToCardButton from "./add-to-card-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
        <div className="relative">
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              SALE
            </div>
          )}
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover  transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <AddToCardButton product={product} />
          </div>
        </div>

        <div className="p-4">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight"
          >
            {product.name}
          </Link>

          <div className="flex items-center justify-between">
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                {product.discountPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.price} AED
                  </span>
                )}
                <span className="text-lg font-bold text-black">
                  {product.discountPrice} AED
                </span>
              </div>
            ) : (
              <p className="text-lg font-bold text-black">
                {product.price} AED
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
