"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdminAuthGuard } from "../../_components/auth-guard"
import { AdminLayout } from "../../_components/admin-layout"
import { Product } from "@/types/products"
import { ProductForm } from "../../_components/product-form"
import { products } from "@/data/products"
import { Badge } from "@/components/ui/badge"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("delete")
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Products</h1>
              <p className="text-slate-600 mt-2">Manage your product inventory</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Fill in the details to add a new product to your store</DialogDescription>
                </DialogHeader>
                <ProductForm onSuccess={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-slate-600">
              {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Products table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                            {product.images[0] ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-slate-400 text-xs">No image</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{product.name}</p>
                            <p className="text-sm text-slate-500">{product.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50">
                          {product.category.slug}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          {product.isOnSale && product.discountPrice ? (
                            <>
                              <p className="font-medium text-slate-900">${product.discountPrice.toFixed(2)}</p>
                              <p className="text-sm text-slate-500 line-through">${product.price.toFixed(2)}</p>
                            </>
                          ) : (
                            <p className="font-medium text-slate-900">${product.price.toFixed(2)}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.isOnSale ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">On Sale</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Edit dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update the product details</DialogDescription>
              </DialogHeader>
              {selectedProduct && (
                <ProductForm
                  product={selectedProduct}
                  onSuccess={() => {
                    setIsEditDialogOpen(false)
                    setSelectedProduct(null)
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
