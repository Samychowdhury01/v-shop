/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, User, MapPin } from "lucide-react"
import { StatusStepper } from "./order-stepper"

interface OrderDetailsProps {
  order: any
}

const statusColorMap = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  PROCESSING: "bg-blue-100 text-blue-800 border-blue-300",
  SHIPPED: "bg-purple-100 text-purple-800 border-purple-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const totalQuantity = order.orderItems?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
  const statusColor = statusColorMap[order.status as keyof typeof statusColorMap] || statusColorMap.PENDING

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Order {order.orderId}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {order.firstName} {order.lastName}
            </p>
          </div>
          <Badge className={`${statusColor} border text-sm px-4 py-2`}>{order.status}</Badge>
        </div>
      </Card>

      {/* Status Stepper */}
      <Card className="p-6 bg-card border-border">
        <h4 className="text-lg font-semibold text-foreground mb-6">Order Status</h4>
        <StatusStepper currentStatus={order.status} />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Information
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-foreground font-medium">
                {order.firstName} {order.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-foreground font-medium">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="text-foreground font-medium">{order.companyName || "N/A"}</p>
            </div>
          </div>
        </Card>

        {/* Shipping Information */}
        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping Information
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-foreground font-medium">{order.streetAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="text-foreground font-medium">{order.townCity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-foreground font-medium">{order.country}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Order Items */}
      <Card className="p-6 bg-card border-border">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Items ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
        </h4>
        <div className="space-y-4">
          {order.orderItems?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-start pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Flavor: {item.flavor} | Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          {/* Order Summary */}
          <div className="space-y-2 pt-4 border-t-2 border-foreground/20">
            <div className="flex justify-between items-center">
              <p className="text-foreground">Subtotal</p>
              <p className="text-foreground">${order.subtotal?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-foreground">Delivery Charge</p>
              <p className="text-foreground">${order.deliveryCharge?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-foreground/10">
              <p className="text-lg font-bold text-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">${order.total?.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
