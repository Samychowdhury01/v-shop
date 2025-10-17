// app/admin/orders/_components/status-select.tsx
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatStatus, getStatusColor } from "@/lib/utils/order-utils";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { checkoutStatus } from "@/lib/utils/constant";
import toast from "react-hot-toast";

interface StatusSelectProps {
  order: Order;
  currentStatus: string;
  onStatusUpdate?: (orderId: string, newStatus: string) => void;
}

export function StatusSelect({
  order,
  currentStatus,
  onStatusUpdate,
}: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus.toUpperCase());
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);

    try {
      const response = await fetch(
        `https://vape-premium-uae-backend.vercel.app/order/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus.toUpperCase(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatus(newStatus);

      // Call the optional callback to update parent state
      if (onStatusUpdate) {
        onStatusUpdate(order._id, newStatus);
      }

      toast.success(
        `Order ${order.orderId} status changed to ${formatStatus(newStatus)}`
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-[140px] border-0 p-0 h-auto focus:ring-0">
        <SelectValue>
          <Badge className={getStatusColor(status)} variant="outline">
            {isUpdating ? "Updating..." : formatStatus(status)}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {checkoutStatus.map((statusOption) => (
          <SelectItem
            key={statusOption}
            value={statusOption}
            className="cursor-pointer"
          >
            <Badge className={getStatusColor(statusOption)} variant="outline">
              {formatStatus(statusOption)}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
