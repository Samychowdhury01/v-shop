// app/admin/orders/_components/orders-client.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Order } from "@/types/order";
import Image from "next/image";
import { formatStatus, getStatusColor } from "@/lib/utils/order-utils";

interface OrdersClientProps {
  orders: Order[];
}

export function OrdersClient({ orders }: OrdersClientProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const getOrderDate = (orderId: string) => {
    // Extract timestamp from orderId (ORD-timestamp-random)
    const parts = orderId?.split("-");
    if (parts.length >= 2) {
      const timestamp = parseInt(parts[1]);
      return new Date(timestamp);
    }
    return new Date();
  };

  return (
    <>
      <DataTable columns={columns} data={orders} onRowClick={handleRowClick} />

      {/* Order details dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order ID: {selectedOrder?.orderId}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6 mt-6">
                {/* Order info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Order ID
                    </p>
                    <p className="font-mono text-sm text-slate-900 break-all">
                      {selectedOrder.orderId}
                    </p>
                  </div>
                  {selectedOrder.orderId ? (
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Order Date
                      </p>
                      <p className="text-sm text-slate-900">
                        {getOrderDate(selectedOrder.orderId).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Customer Name
                    </p>
                    <p className="text-sm text-slate-900">
                      {selectedOrder.firstName} {selectedOrder.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Customer Email
                    </p>
                    <p className="text-sm text-slate-900 break-all">
                      {selectedOrder.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Phone
                    </p>
                    <p className="text-sm text-slate-900">
                      {selectedOrder.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Company
                    </p>
                    <p className="text-sm text-slate-900">
                      {selectedOrder.companyName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Status
                    </p>
                    <Badge
                      className={getStatusColor(selectedOrder.status)}
                      variant="outline"
                    >
                      {formatStatus(selectedOrder.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Total Amount
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      AED {selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Shipping Address
                  </h3>
                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-sm text-slate-900">
                      {selectedOrder.streetAddress}
                    </p>
                    <p className="text-sm text-slate-900">
                      {selectedOrder.townCity}, {selectedOrder.stateCounty}
                    </p>
                    <p className="text-sm text-slate-900">
                      {selectedOrder.country}
                    </p>
                    {selectedOrder.shipToDifferentAddress && (
                      <Badge className="mt-2" variant="secondary">
                        Ship to different address
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Order Notes */}
                {selectedOrder.orderNotes && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Order Notes
                    </h3>
                    <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-700">
                        {selectedOrder.orderNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order items */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-slate-200 rounded-lg bg-white"
                      >
                        {item.image && (
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                              sizes="80px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {item.name}
                          </p>
                          {item.flavor && (
                            <p className="text-sm text-slate-600 mt-1">
                              Flavor: {item.flavor}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <span className="text-sm text-slate-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm text-slate-600">
                              Unit Price: AED {item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right sm:text-left w-full sm:w-auto">
                          <p className="font-semibold text-slate-900">
                            AED {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="text-slate-900">
                      AED {selectedOrder.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Delivery Charge</span>
                    <span className="text-slate-900">
                      AED {selectedOrder.deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                    <span className="text-slate-900">Total</span>
                    <span className="text-slate-900">
                      AED {selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}