"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AddToCartModal } from "@/app/(site)/products/_components/add-to-cart-modal"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  image: string
  isOnSale: boolean
  inStock: boolean
  category: string
  // Add optional product options
  flavors?: string[]
  colors?: string[]
  options?: string[]
  nicotineLevels?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              SALE
            </div>
          )}
          <div className="relative w-full h-64">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice} AED
                </span>
              )}
              <span className="text-lg font-bold text-black">
                {product.price} AED
              </span>
            </div>
          </div>

          <Button
            onClick={handleModalOpen}
            disabled={!product.inStock}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
            size="sm"
          >
            {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
          </Button>
        </div>
      </div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={product}
      />
    </>
  )
}