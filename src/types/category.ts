export interface Category {
  id: string
  name: string
  slug: string
  description: string
  isChild?: boolean
  parentCategoryId?: string
}