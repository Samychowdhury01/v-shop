"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FolderTree, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { products } from "@/data/products"
import { categories } from "@/data/category"
import { AdminAuthGuard } from "../../_components/auth-guard"
import { AdminLayout } from "../../_components/admin-layout"
import { orders } from "@/data/order"

export default function AdminDashboardPage() {

  // Calculate statistics
  const totalProducts = products.length
  const totalCategories = categories.length
  const totalOrders = orders.length

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status !== "cancelled") {
      return sum + order.total
    }
    return sum
  }, 0)

  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const processingOrders = orders.filter((o) => o.status === "processing").length
  const shippedOrders = orders.filter((o) => o.status === "shipped").length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length

  const productsOnSale = products.filter((p) => p.isOnSale).length

  // Recent orders (last 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-8">
          {/* Page header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your store.</p>
          </div>

          {/* Stats grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600 font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Orders</CardTitle>
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{totalOrders}</div>
                <p className="text-xs text-slate-600 mt-2">
                  <span className="font-medium">{pendingOrders}</span> pending orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
                <Package className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{totalProducts}</div>
                <p className="text-xs text-slate-600 mt-2">
                  <span className="font-medium">{productsOnSale}</span> on sale
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Categories</CardTitle>
                <FolderTree className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{totalCategories}</div>
                <p className="text-xs text-slate-600 mt-2">Active categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Order status breakdown */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Order Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="text-sm font-medium text-slate-700">Pending</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{pendingOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium text-slate-700">Processing</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{processingOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span className="text-sm font-medium text-slate-700">Shipped</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{shippedOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-slate-700">Delivered</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{deliveredOrders}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Average Order Value</span>
                    <span className="text-sm font-bold text-slate-900">
                      ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Products on Sale</span>
                    <span className="text-sm font-bold text-slate-900">{productsOnSale}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Completion Rate</span>
                    <span className="text-sm font-bold text-slate-900">
                      {totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : "0"}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Active Products</span>
                    <span className="text-sm font-bold text-slate-900">{totalProducts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">No orders yet</p>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-medium text-slate-900">{order.customerName}</p>
                          <Badge className={getStatusColor(order.status)} variant="outline">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{order.customerEmail}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-slate-600">{order.items.length} items</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
