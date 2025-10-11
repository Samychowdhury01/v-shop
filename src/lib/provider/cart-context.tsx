"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  flavor?: string
  color?: string
  option?: string
  nicotineLevel?: string
}

interface CartContextType {
  cartItems: CartItem[]
  isCartSheetOpen: boolean
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  updateCartQuantity: (id: string, quantity: number) => void
  removeCartItem: (id: string) => void
  setCartSheetOpen: (open: boolean) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('vape-cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('vape-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [cartItems])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prev => {
      // Check if an item with the same ID (same product and options) exists
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        // If item exists, add the quantity to existing quantity
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        )
      }
      
      // If item doesn't exist, add as new item with specified quantity
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }, [])

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const removeCartItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const setCartSheetOpen = useCallback((open: boolean) => {
    setIsCartSheetOpen(open)
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartSheetOpen,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        setCartSheetOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}