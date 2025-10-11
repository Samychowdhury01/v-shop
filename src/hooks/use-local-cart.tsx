// @/hooks/use-local-cart.ts
"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/schemas/checkout";

const CART_KEY = "vape-cart";

export function useLocalCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        const items = JSON.parse(stored);
        setCartItems(Array.isArray(items) ? items : []);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    try {
      localStorage.removeItem(CART_KEY);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return { cartItems, isLoading, clearCart, refreshCart: loadCart };
}