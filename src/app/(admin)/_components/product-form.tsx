"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { Product } from "@/types/products"
import { categories } from "@/data/category"

interface ProductFormProps {
  product?: Product
  onSuccess: () => void
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const isEditing = !!product

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    price: product?.price || 0,
    discountPrice: product?.discountPrice || 0,
    isOnSale: product?.isOnSale || false,
    categorySlug: product?.category.slug || "",
    images: product?.images || [""],
    specifications: product?.specifications || [""],
    colors: product?.colors || [],
    flavors: product?.flavors || [],
    options: product?.options || [],
  })

  const [newColor, setNewColor] = useState("")
  const [newFlavor, setNewFlavor] = useState("")
  const [newOption, setNewOption] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData: Product = {
      id: product?.id || `prod_${Date.now()}`,
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      shortDescription: formData.shortDescription,
      images: formData.images.filter((img) => img.trim() !== ""),
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      isOnSale: formData.isOnSale,
      specifications: formData.specifications.filter((spec) => spec.trim() !== ""),
      faqs: product?.faqs || [],
      category: { slug: formData.categorySlug },
      colors: formData.colors.length > 0 ? formData.colors : undefined,
      flavors: formData.flavors.length > 0 ? formData.flavors : undefined,
      options: formData.options.length > 0 ? formData.options : undefined,
    }

    if (isEditing) {
      console.log("edit")
    } else {
      console.log("add")
    }

    onSuccess()
  }

  const addArrayItem = (field: "images" | "specifications") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    })
  }

  const updateArrayItem = (field: "images" | "specifications", index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const removeArrayItem = (field: "images" | "specifications", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    })
  }

  const addTag = (field: "colors" | "flavors" | "options", value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      })
    }
  }

  const removeTag = (field: "colors" | "flavors" | "options", value: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== value),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Input
            id="shortDescription"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Pricing</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPrice">Discount Price</Label>
            <Input
              id="discountPrice"
              type="number"
              step="0.01"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: Number.parseFloat(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isOnSale">On Sale</Label>
            <div className="flex items-center h-10">
              <Switch
                id="isOnSale"
                checked={formData.isOnSale}
                onCheckedChange={(checked) => setFormData({ ...formData, isOnSale: checked })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select
          value={formData.categorySlug}
          onValueChange={(value) => setFormData({ ...formData, categorySlug: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Images</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("images")}>
            Add Image
          </Button>
        </div>
        <div className="space-y-2">
          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={image}
                onChange={(e) => updateArrayItem("images", index, e.target.value)}
                placeholder="Image URL"
              />
              {formData.images.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("images", index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Specifications</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("specifications")}>
            Add Specification
          </Button>
        </div>
        <div className="space-y-2">
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={spec}
                onChange={(e) => updateArrayItem("specifications", index, e.target.value)}
                placeholder="e.g., Battery: 650mAh"
              />
              {formData.specifications.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem("specifications", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <Label>Colors</Label>
        <div className="flex gap-2">
          <Input
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Add color"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag("colors", newColor)
                setNewColor("")
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              addTag("colors", newColor)
              setNewColor("")
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.colors.map((color) => (
            <div key={color} className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm">
              <span>{color}</span>
              <button
                type="button"
                onClick={() => removeTag("colors", color)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flavors */}
      <div className="space-y-4">
        <Label>Flavors</Label>
        <div className="flex gap-2">
          <Input
            value={newFlavor}
            onChange={(e) => setNewFlavor(e.target.value)}
            placeholder="Add flavor"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag("flavors", newFlavor)
                setNewFlavor("")
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              addTag("flavors", newFlavor)
              setNewFlavor("")
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.flavors.map((flavor) => (
            <div key={flavor} className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm">
              <span>{flavor}</span>
              <button
                type="button"
                onClick={() => removeTag("flavors", flavor)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <Label>Options</Label>
        <div className="flex gap-2">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add option"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag("options", newOption)
                setNewOption("")
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              addTag("options", newOption)
              setNewOption("")
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.options.map((option) => (
            <div key={option} className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm">
              <span>{option}</span>
              <button
                type="button"
                onClick={() => removeTag("options", option)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="submit">{isEditing ? "Update Product" : "Add Product"}</Button>
      </div>
    </form>
  )
}
