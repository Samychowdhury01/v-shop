"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { categories } from "@/data/category"
import { AdminAuthGuard } from "../../_components/auth-guard"
import { AdminLayout } from "../../_components/admin-layout"
import { CategoryForm } from "../../_components/category-form"
import { Category } from "@/types/category"

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Separate parent and child categories
  const parentCategories = filteredCategories.filter((cat) => !cat.isChild)
  const childCategories = filteredCategories.filter((cat) => cat.isChild)

  const handleDelete = (id: string) => {
    // Check if any products use this category
    const hasProducts = false // In a real app, you'd check this
    if (hasProducts) {
      alert("Cannot delete category that has products assigned to it")
      return
    }

    if (confirm("Are you sure you want to delete this category?")) {
      console.log("delete")
    }
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsEditDialogOpen(true)
  }

  const getCategoryParentName = (parentId: string | undefined) => {
    if (!parentId) return null
    const parent = categories.find((cat) => cat.id === parentId)
    return parent?.name
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
              <p className="text-slate-600 mt-2">Organize your products with categories</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>Create a new category or subcategory for your products</DialogDescription>
                </DialogHeader>
                <CategoryForm onSuccess={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-slate-600">
              {filteredCategories.length} of {categories.length} categories
            </div>
          </div>

          {/* Parent Categories */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Parent Categories</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {parentCategories.length === 0 ? (
                <p className="text-slate-500 col-span-full text-center py-8">No parent categories found</p>
              ) : (
                parentCategories.map((category) => {
                  const childCount = categories.filter((cat) => cat.parentCategoryId === category.id).length
                  return (
                    <Card key={category.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                            <p className="text-sm text-slate-500">{category.slug}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{category.description}</p>
                        {childCount > 0 && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {childCount} subcategories
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>

          {/* Child Categories */}
          {childCategories.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Subcategories</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {childCategories.map((category) => {
                  const parentName = getCategoryParentName(category.parentCategoryId)
                  return (
                    <Card key={category.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                            <p className="text-sm text-slate-500">{category.slug}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{category.description}</p>
                        {parentName && (
                          <Badge variant="outline" className="bg-slate-50">
                            Parent: {parentName}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Edit dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>Update the category details</DialogDescription>
              </DialogHeader>
              {selectedCategory && (
                <CategoryForm
                  category={selectedCategory}
                  onSuccess={() => {
                    setIsEditDialogOpen(false)
                    setSelectedCategory(null)
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
