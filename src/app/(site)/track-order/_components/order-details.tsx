/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, User, MapPin, Truck, CheckCircle2, Clock } from "lucide-react"

interface OrderDetailsProps {
  order: any
}

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-muted text-foreground border border-border",
    icon: Clock,
  },
  in_transit: {
    label: "In Transit",
    color: "bg-foreground text-background",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-foreground text-background",
    icon: CheckCircle2,
  },
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const status = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  const totalQuantity = order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${status.color}`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Order {order.orderId}</h3>
              <p className="text-muted-foreground">
                {order.status === "delivered" ? "Delivered" : "Estimated delivery"}:{" "}
                {order.deliveryDate || order.estimatedDelivery}
              </p>
            </div>
          </div>
          <Badge className={`${status.color} text-sm px-4 py-2`}>{status.label}</Badge>
        </div>
      </Card>

      {/* Order Timeline */}
      <Card className="p-6 bg-card border-border">
        <h4 className="text-lg font-semibold text-foreground mb-6">Order Timeline</h4>
        <div className="space-y-6">
          <TimelineItem icon={CheckCircle2} title="Order Placed" date={order.orderDate} completed={true} />
          <TimelineItem
            icon={Package}
            title="Processing"
            date={order.orderDate}
            completed={order.status !== "processing"}
            active={order.status === "processing"}
          />
          <TimelineItem
            icon={Truck}
            title="In Transit"
            date={order.status === "in_transit" || order.status === "delivered" ? order.orderDate : undefined}
            completed={order.status === "delivered"}
            active={order.status === "in_transit"}
          />
          <TimelineItem
            icon={CheckCircle2}
            title="Delivered"
            date={order.status === "delivered" ? order.deliveryDate : undefined}
            completed={order.status === "delivered"}
          />
        </div>
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
              <p className="text-foreground font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">{order.email}</p>
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
              <p className="text-sm text-muted-foreground">Delivery Address</p>
              <p className="text-foreground font-medium">{order.shippingAddress}</p>
            </div>
            {order.trackingNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="text-foreground font-medium font-mono">{order.trackingNumber}</p>
              </div>
            )}
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
          {order.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-start pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t-2 border-foreground/20">
            <p className="text-lg font-bold text-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface TimelineItemProps {
  icon: any
  title: string
  date?: string
  completed?: boolean
  active?: boolean
}

function TimelineItem({ icon: Icon, title, date, completed, active }: TimelineItemProps) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            completed
              ? "bg-foreground border-foreground text-background"
              : active
                ? "bg-muted border-foreground text-foreground"
                : "bg-background border-border text-muted-foreground"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {!active && !completed && <div className="w-0.5 h-full bg-border absolute top-10" />}
      </div>
      <div className="flex-1 pb-2">
        <p className={`font-semibold ${completed || active ? "text-foreground" : "text-muted-foreground"}`}>{title}</p>
        {date && <p className="text-sm text-muted-foreground mt-1">{date}</p>}
      </div>
    </div>
  )
}
