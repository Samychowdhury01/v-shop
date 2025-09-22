"use client";

import type React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartSheetProps {
  children: React.ReactNode;
  cartItems: CartItem[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function ShoppingCartSheet({
  children,
  cartItems,
  isOpen,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartSheetProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getItemDetails = (item: CartItem) => {
    const details = [];
    if (item.flavor) details.push(`Flavor: ${item.flavor}`);
    if (item.color) details.push(`Color: ${item.color}`);
    if (item.option) details.push(`Option: ${item.option}`);
    if (item.nicotineLevel) details.push(`Nicotine: ${item.nicotineLevel}`);
    return details.join(" • ");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] px-5">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      {getItemDetails(item) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {getItemDetails(item)}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-medium text-black">
                      {item.quantity} × {item.price} AED
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span className="text-black">{subtotal} AED</span>
            </div>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href={"/cart"}> VIEW CART</Link>
            </Button>

            <Button
              asChild
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              <Link href={"/checkout"}>CHECKOUT</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
