import { fetchProducts } from "@/lib/utils/fetch-products"
import { Product } from "@/types/products"
import { AdminAuthGuard } from "../../_components/auth-guard"
import { AdminLayout } from "../../_components/admin-layout"
import { ProductsTable } from "./_components/product-table"


export default async function AdminProductsPage() {
  const products: Product[] = await fetchProducts()
  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-2">Manage your product inventory</p>
          </div>

          {/* Products Table */}
          <ProductsTable data={products} />
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}