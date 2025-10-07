import { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ord_001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: "prod_001",
        productName: "Voopoo Drag X Pod Mod",
        quantity: 1,
        price: 55.0,
      },
      {
        productId: "prod_002",
        productName: "Dinner Lady Lemon Tart E-Liquid 60ml",
        quantity: 2,
        price: 20.0,
      },
    ],
    total: 95.0,
    status: "processing",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ord_002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      {
        productId: "prod_003",
        productName: "Elf Bar BC5000 Disposable Vape",
        quantity: 3,
        price: 15.0,
      },
    ],
    total: 45.0,
    status: "shipped",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ord_003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    items: [
      {
        productId: "prod_004",
        productName: "GeekVape Zeus Sub-Ohm Tank",
        quantity: 1,
        price: 32.0,
      },
      {
        productId: "prod_005",
        productName: "Nitecore Intellicharger i2",
        quantity: 1,
        price: 25.0,
      },
    ],
    total: 57.0,
    status: "delivered",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ord_004",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    items: [
      {
        productId: "prod_001",
        productName: "Voopoo Drag X Pod Mod",
        quantity: 2,
        price: 55.0,
      },
    ],
    total: 110.0,
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]