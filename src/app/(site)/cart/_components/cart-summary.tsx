"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export function CartSummary({ subtotal, deliveryCharge, total }: CartSummaryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b">
        CART TOTALS
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{subtotal} AED</span>
        </div>

        <div className="flex justify-between text-sm pb-4 border-b border-gray-100">
          <div>
            <div className="text-gray-600 mb-2">Shipping</div>
            <div className="text-xs text-gray-500 mb-1">
              Delivery Charge:{" "}
              <span className="text-red-600 font-medium">
                {deliveryCharge} AED
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              Shipping options will be updated during checkout.
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
            >
              Calculate shipping
            </Button>
          </div>
          <span className="font-medium text-sm">
            {deliveryCharge} AED
          </span>
        </div>

        <div className="flex justify-between text-lg font-semibold pt-2">
          <span>Total</span>
          <span>{total} AED</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button
          variant="default"
          className="w-full mt-6 text-sm font-medium"
        >
          PROCEED TO CHECKOUT
        </Button>
      </Link>

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
        <p className="mb-1">✓ Secure checkout</p>
        <p className="mb-1">✓ Cash on delivery available</p>
        <p>✓ Free returns within 7 days</p>
      </div>
    </div>
  );
}