// _components/product-page-layout.tsx
import type React from "react"
import { Sidebar } from "./sidebar"
import { PageBreadcrumb } from "./page-breadcrumb"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface BreadcrumbItem {
  label: string
  href: string
}

interface ProductPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  sidebarProducts: Product[]
}

export function ProductPageLayout({
  children,
  title,
  description,
  breadcrumbs,
  sidebarProducts,
}: ProductPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Sidebar products={sidebarProducts} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <PageBreadcrumb items={breadcrumbs} />

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>

            {children}
          </div>
        </div>
      </div>

    </div>
  )
}