// components/header.tsx
"use client";
import { Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCart } from "@/lib/provider/cart-context";
import { ShoppingCartSheet } from "@/app/(site)/products/_components/shopping-cart-sheet";

export function Header() {
  const {
    cartItems,
    isCartSheetOpen,
    setCartSheetOpen,
    updateCartQuantity,
    removeCartItem,
  } = useCart();
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Top Banner */}
      <div className="bg-red-800 text-white text-center py-2 text-sm font-medium">
        CASH ON DELIVERY/CARD PAYMENT AT YOUR DOORSTEP
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Vape Dubai Hub"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products"
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md"
                />
                <div className="absolute right-0 top-0 h-full flex items-center">
                  <select className="bg-gray-100 border-l border-gray-300 px-3 py-2 text-sm text-gray-600 rounded-r-md">
                    <option>SELECT CATEGORY</option>
                  </select>
                  <Button
                    size="sm"
                    className="ml-2 bg-gray-600 hover:bg-gray-700"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <ShoppingCartSheet
              cartItems={cartItems}
              isOpen={isCartSheetOpen}
              onOpenChange={setCartSheetOpen}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeCartItem}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">{totalAmount} AED</span>
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </ShoppingCartSheet>
          </div>
        </div>
      </header>
    </>
  );
}
