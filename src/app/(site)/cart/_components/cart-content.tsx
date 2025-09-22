"use client";

import { useCart } from "@/lib/provider/cart-context";
import { EmptyCart } from "./empty-cart";
import { CartTable } from "./cart-table";
import { CartSummary } from "./cart-summary";


export function CartContent() {
  const { cartItems, updateCartQuantity, removeCartItem, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 30;
  const total = subtotal + deliveryCharge;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <CartTable
          cartItems={cartItems}
          updateCartQuantity={updateCartQuantity}
          removeCartItem={removeCartItem}
          clearCart={clearCart}
        />
      </div>
      <div className="lg:w-80">
        <CartSummary
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
        />
      </div>
    </div>
  );
}