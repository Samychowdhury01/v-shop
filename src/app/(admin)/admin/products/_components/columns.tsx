"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/products"
import { Badge } from "@/components/ui/badge"

import Image from "next/image"
import { DataTableColumnHeader } from "./data-table-column-header"
import { ProductActions } from "./product-action"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
            {product.thumbnailImage ? (
             <Image
                src={product.thumbnailImage || "/placeholder.svg"}
                alt={product.productName || "Product image"}
                className="h-full w-full object-cover"
                width={48}
                height={48}
              />
            ) : (
              <span className="text-slate-400 text-xs">No image</span>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900">{product.productName}</p>
            <p className="text-sm text-slate-500">{product.slug}</p>
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "category.slug",
    id: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="bg-slate-50">
          {row.original.category}
        </Badge>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const categoryA = rowA.original.categorySlug
      const categoryB = rowB.original.categorySlug
      return categoryA?.localeCompare(categoryB || "") || 0
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const product = row.original
      return (
        <div>
          {product.offer.isActive && product.offer.offerPrice ? (
            <>
              <p className="font-medium text-slate-900">
                ${product.offer.offerPrice.toFixed(2)}
              </p>
              <p className="text-sm text-slate-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-medium text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.original.offer.offerPrice || rowA.original.price
      const priceB = rowB.original.offer.offerPrice || rowB.original.price
      return priceA - priceB
    },
  },
  {
    accessorKey: "isOnSale",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const product = row.original
      return product.offer.isActive ? (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          On Sale
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-slate-50">
          Active
        </Badge>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const statusA = rowA.original.offer.isActive ? 1 : 0
      const statusB = rowB.original.offer.isActive ? 1 : 0
      return statusA - statusB
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ProductActions product={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
]