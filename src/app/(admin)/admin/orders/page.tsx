import { Order } from "@/types/order";
import { AdminAuthGuard } from "../../_components/auth-guard";
import { AdminLayout } from "../../_components/admin-layout";
import { OrdersClient } from "./_components/order-client";

async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/orderData`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    const data = await response.json();
console.log(data, "data")
    // If the API returns the orders directly as an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-600 mt-2">
              Manage and track customer orders ({orders.length} total orders)
            </p>
          </div>

          {/* Orders Table */}
          <OrdersClient orders={orders} />
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}
