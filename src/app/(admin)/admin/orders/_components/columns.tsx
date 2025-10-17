// app/admin/orders/_components/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Order } from "@/types/order"
import { StatusSelect } from "./status-select"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-slate-600">
        {row.getValue("orderId")}
      </span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <p className="font-medium text-slate-900">
            {order.firstName} {order.lastName}
          </p>
          <p className="text-sm text-slate-500">{order.email}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const order = row.original
      const fullName = `${order.firstName} ${order.lastName}`.toLowerCase()
      const email = order.email.toLowerCase()
      const searchValue = value.toLowerCase()
      return fullName.includes(searchValue) || email.includes(searchValue)
    },
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      const orderId = row.original.orderId
      // Extract timestamp from orderId (ORD-timestamp-random)
      const timestamp = orderId.split('-')[1]
      if (!timestamp) return "N/A"
      
      const date = new Date(parseInt(timestamp))
      return (
        <span className="text-sm text-slate-600">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      )
    },
  },
  {
    id: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.original.orderItems
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
      return (
        <span className="text-sm text-slate-600">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </span>
      )
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
      }).format(amount)
      return <span className="font-semibold text-slate-900">{formatted}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original
      const status = row.getValue("status") as string
      return (
        <StatusSelect 
          order={order}
          currentStatus={status}
        />
      )
    },
    filterFn: (row, id, value) => {
      if (value === "all") return true
      const status = (row.getValue(id) as string).toLowerCase()
      return status === value.toLowerCase()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.orderId)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]