"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Product } from "@/types/products"
import { AddProductDialog } from "./product-dialogs"

interface TableToolbarProps {
  table: Table<Product>
  totalCount: number
}

export function TableToolbar({ table, totalCount }: TableToolbarProps) {
  const filteredCount = table.getFilteredRowModel().rows.length
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="pl-10"
        />
      </div>

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}

      <div className="text-sm text-slate-600">
        {filteredCount} of {totalCount} products
      </div>

      <div className="ml-auto">
        <AddProductDialog />
      </div>
    </div>
  )
}