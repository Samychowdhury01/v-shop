
"use client"

import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface StatusStepperProps {
  currentStatus: string
}

const STATUS_ORDER = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"]
const CANCELLED = "CANCELLED"

const statusConfig = {
  PENDING: {
    label: "Pending",
    description: "Order received",
    icon: Clock,
  },
  PROCESSING: {
    label: "Processing",
    description: "Preparing your order",
    icon: Clock,
  },
  SHIPPED: {
    label: "Shipped",
    description: "On the way",
    icon: Clock,
  },
  DELIVERED: {
    label: "Delivered",
    description: "Order completed",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelled",
    description: "Order cancelled",
    icon: AlertCircle,
  },
}

export function StatusStepper({ currentStatus }: StatusStepperProps) {
  const isCancelled = currentStatus === CANCELLED
  const currentIndex = STATUS_ORDER.indexOf(currentStatus)

  return (
    <div className="w-full">
      {/* Main Status Flow */}
      <div className="flex items-center justify-between mb-8">
        {STATUS_ORDER.map((status, index) => {
          const config = statusConfig[status as keyof typeof statusConfig]
          const Icon = config.icon
          const isCompleted = index < currentIndex
          const isActive = status === currentStatus && !isCancelled
          // const isDisabled = index > currentIndex || isCancelled

          return (
            <div key={status} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center w-full">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p
                    className={`mt-3 font-semibold text-sm ${
                      isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {config.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{config.description}</p>
                </div>

                {/* Connector Line */}
                {index < STATUS_ORDER.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 transition-all ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Cancelled Status (if applicable) */}
      {isCancelled && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Order Cancelled</p>
            <p className="text-sm text-red-700">This order has been cancelled and will not be processed.</p>
          </div>
        </div>
      )}
    </div>
  )
}
