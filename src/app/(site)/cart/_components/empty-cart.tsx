import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-8">Add some products to get started!</p>

      <Button
        asChild
        className="bg-black hover:bg-gray-800 text-white px-8 py-3"
      >
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
