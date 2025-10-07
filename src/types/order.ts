
export interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}