"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminAuthGuard } from "../../_components/auth-guard"
import { AdminLayout } from "../../_components/admin-layout"
import { orders } from "@/data/order"
import { Order } from "@/types/order"

export default function AdminOrdersPage() {

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    console.log("update")
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-600 mt-2">Manage and track customer orders</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search orders by customer, email, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-slate-600 flex items-center">
              {filteredOrders.length} of {orders.length} orders
            </div>
          </div>

          {/* Orders table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-mono text-sm text-slate-600">{order.id}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{order.customerName}</p>
                          <p className="text-sm text-slate-500">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">{order.items.length} items</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-slate-900">${order.total.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                        >
                          <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Order details dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>View complete order information</DialogDescription>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-6">
                  {/* Order info */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Order ID</p>
                      <p className="font-mono text-sm text-slate-900">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Order Date</p>
                      <p className="text-sm text-slate-900">
                        {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Customer Name</p>
                      <p className="text-sm text-slate-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Customer Email</p>
                      <p className="text-sm text-slate-900">{selectedOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Status</p>
                      <Badge className={getStatusColor(selectedOrder.status)} variant="outline">
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Total Amount</p>
                      <p className="text-lg font-bold text-slate-900">${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order items */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{item.productName}</p>
                            <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-slate-600">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-slate-900">Total</span>
                      <span className="text-slate-900">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
