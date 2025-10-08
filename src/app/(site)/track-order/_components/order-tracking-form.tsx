/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader, Search } from "lucide-react"
import { OrderDetails } from "./order-details"


// Mock order data
const mockOrders: Record<string, any> = {
  "ORD-2024-001": {
    orderId: "ORD-2024-001",
    customerName: "John Smith",
    email: "john.smith@email.com",
    status: "delivered",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-08",
    items: [
      { name: "Premium Vape Starter Kit", quantity: 1, price: 89.99 },
      { name: "Mint Flavor Pod Pack (3x)", quantity: 2, price: 24.99 },
    ],
    total: 139.97,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK1234567890",
  },
  "ORD-2024-002": {
    orderId: "ORD-2024-002",
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "in_transit",
    orderDate: "2024-01-07",
    estimatedDelivery: "2024-01-10",
    items: [
      { name: "Advanced Vape Mod", quantity: 1, price: 129.99 },
      { name: "Berry Blast E-Liquid", quantity: 3, price: 19.99 },
    ],
    total: 189.96,
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    trackingNumber: "TRK0987654321",
  },
  "ORD-2024-003": {
    orderId: "ORD-2024-003",
    customerName: "Mike Davis",
    email: "mike.d@email.com",
    status: "processing",
    orderDate: "2024-01-08",
    estimatedDelivery: "2024-01-12",
    items: [
      { name: "Portable Vape Pen", quantity: 2, price: 49.99 },
      { name: "Tropical Mix Pods", quantity: 1, price: 29.99 },
    ],
    total: 129.97,
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    trackingNumber: null,
  },
}

export function OrderTrackingForm() {
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId.toUpperCase()]

      if (order) {
        setOrderData(order)
        setError("")
      } else {
        setError("Order not found. Please check your order ID and try again.")
        setOrderData(null)
      }

      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your order ID (e.g., ORD-2024-001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-12 text-base bg-card border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin"/>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-1" />
                  Track
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive-foreground">{error}</p>
            </div>
          )}
        </form>

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Demo Order IDs:</span> Try ORD-2024-001, ORD-2024-002, or
            ORD-2024-003
          </p>
        </div>
      </div>

      {orderData && <OrderDetails order={orderData} />}
    </>
  )
}
