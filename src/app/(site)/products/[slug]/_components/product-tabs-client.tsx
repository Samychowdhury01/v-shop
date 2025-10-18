"use client"

import { Product } from "@/types/products"
import { useState } from "react"
import { DescriptionContent } from "./description"
import { ShippingContent } from "./shipping-content"

export default function ProductTabsClient({product}: {product: Product}) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === "description"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === "shipping"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            SHIPPING AND DELIVERY
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "description" && <DescriptionContent product={product}/>}
        {activeTab === "shipping" && <ShippingContent />}
      </div>
    </div>
  )
}



