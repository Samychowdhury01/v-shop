"use client"

import { categories } from "@/data/category"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const Navigation = () =>{
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 py-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative pb-2"
              onMouseEnter={() => setHoveredCategory(category.slug)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                href={`/products/categories/${category.slug}`}
                className="text-sm font-medium hover:text-red-200 transition-colors flex items-center gap-1"
              >
                {category.name}
                {category.brands && category.brands.length > 0 && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown for brands */}
              {category.brands && category.brands.length > 0 && hoveredCategory === category.slug && (
                <div className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md py-2 min-w-[200px] z-50">
                  {category.brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/products/categories/${category.slug}/${brand.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation