/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import { OrderDetails } from "./order-details";
import toast from "react-hot-toast";

export function OrderTrackingForm() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOrderData(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

      if (!baseUrl) {
        toast.error("Server URL is not configured");
        setOrderData({});
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${baseUrl}/track/${orderId.trim()}`);

      if (!response.ok) {
        if (response.status === 404) {
          toast.error(
            "Order not found. Please check your order ID and try again."
          );
        } else {
          toast.error("Failed to get order details. Please try again later.");
        }
        setOrderData({});
        setIsLoading(false);
        return;
      }

      const order = await response.json();
      console.log(order, "order data")
      setOrderData(order);
      toast.success("Order details loaded successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setOrderData({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your order ID"
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
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-1" />
                  Track
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {orderData && <OrderDetails order={orderData} />}
    </>
  );
}
