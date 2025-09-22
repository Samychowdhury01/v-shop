"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function StockFilter() {
  const [filters, setFilters] = useState({
    onSale: false,
    inStock: false,
  })

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="onSale"
          checked={filters.onSale}
          onCheckedChange={() => handleFilterChange("onSale")}
        />
        <Label htmlFor="onSale" className="text-sm text-gray-700">
          On sale
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={filters.inStock}
          onCheckedChange={() => handleFilterChange("inStock")}
        />
        <Label htmlFor="inStock" className="text-sm text-gray-700">
          In stock
        </Label>
      </div>
    </div>
  )
}
