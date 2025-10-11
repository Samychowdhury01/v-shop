"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Product } from "@/types/products"
import { EditProductDialog } from "./product-dialogs"

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("delete", product._id)
      // Add delete logic here
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>

      <EditProductDialog
        product={product}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </div>
  )
}