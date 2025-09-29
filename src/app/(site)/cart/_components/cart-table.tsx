"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import { CartTableRow } from "./cart-table-row";

interface CartTableProps {
  cartItems: CartItem[];
  updateCartQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
}

export function CartTable({
  cartItems,
  updateCartQuantity,
  removeCartItem,
  clearCart,
}: CartTableProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[50%] font-medium">PRODUCT</TableHead>
            <TableHead className="text-center font-medium">PRICE</TableHead>
            <TableHead className="text-center font-medium">QUANTITY</TableHead>
            <TableHead className="text-center font-medium">SUBTOTAL</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <CartTableRow
              key={item.id}
              item={item}
              updateQuantity={updateCartQuantity}
              removeItem={removeCartItem}
            />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
        <div className="flex gap-3">
          <Link href="/products">
            <Button variant="outline" className="border-gray-300">
              ← Continue Shopping
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={clearCart}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>
        <div className="text-sm text-gray-500">{totalItems} items in cart</div>
      </div>
    </div>
  );
}
