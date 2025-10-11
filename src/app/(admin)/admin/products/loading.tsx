import { AdminLayout } from "../../_components/admin-layout";
import { ProductsPageSkeleton } from "./_components/product-list-skeleton";


export default function Loading() {
  return (
    <AdminLayout>
      <ProductsPageSkeleton />
    </AdminLayout>
  )
}