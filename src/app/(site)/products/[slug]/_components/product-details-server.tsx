import { Card } from "@/components/ui/card";
import { Share2, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductInteractions from "./product-interactions";
import { Product } from "@/types/products";

export default function ProductDetailsServer({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {product.productName}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-red-600">
            {product?.offer?.isActive
              ? product?.offer?.offerPrice
              : product?.price}{" "}
            AED
          </span>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-900 mb-2">
          {product?.productName} Overview Dubai
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product?.productShortDescription}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          {product?.productName} Specifications in UAE
        </h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          {product?.pointDescription?.map((point, index) => (
            <li key={index}>
              <span className="font-semibold mr-1">{point?.label}</span>
              <span>{point?.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <Card className="p-4 border-orange-200 bg-orange-50">
        <p className="text-sm font-medium text-orange-800 text-center">
          🚚 FREE SHIPPING ON ALL VAPE ORDERS OVER AED 300
        </p>
      </Card>

      <ProductInteractions product={product} />

      <div className="flex items-center gap-4 pt-4 border-t">
        <span className="text-sm text-gray-600">Share:</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
