"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "@/types/category"
import { categories } from "@/data/category"

interface CategoryFormProps {
  category?: Category
  onSuccess: () => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  
  const isEditing = !!category

  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    isChild: category?.isChild || false,
    parentCategoryId: category?.parentCategoryId || "",
  })

  // Get only parent categories for the dropdown
  const parentCategories = categories.filter((cat) => !cat.isChild && cat.id !== category?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const categoryData: Category = {
      id: category?.id || `cat_${Date.now()}`,
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      isChild: formData.isChild,
      parentCategoryId: formData.isChild ? formData.parentCategoryId : undefined,
    }

    if (isEditing) {
      updateCategory(category.id, categoryData)
    } else {
      addCategory(categoryData)
    }

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Vape Devices"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., vape-devices"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this category..."
            rows={3}
          />
        </div>
      </div>

      {/* Category type */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="isChild" className="text-base">
              Subcategory
            </Label>
            <p className="text-sm text-slate-600">Make this a subcategory of another category</p>
          </div>
          <Switch
            id="isChild"
            checked={formData.isChild}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                isChild: checked,
                parentCategoryId: checked ? formData.parentCategoryId : "",
              })
            }
          />
        </div>

        {formData.isChild && (
          <div className="space-y-2">
            <Label htmlFor="parentCategory">Parent Category *</Label>
            <Select
              value={formData.parentCategoryId}
              onValueChange={(value) => setFormData({ ...formData, parentCategoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a parent category" />
              </SelectTrigger>
              <SelectContent>
                {parentCategories.length === 0 ? (
                  <div className="p-2 text-sm text-slate-500">No parent categories available</div>
                ) : (
                  parentCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {parentCategories.length === 0 && (
              <p className="text-xs text-slate-500">Create a parent category first before adding subcategories</p>
            )}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="submit" disabled={formData.isChild && !formData.parentCategoryId}>
          {isEditing ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </form>
  )
}
