import { CheckoutFormData } from "@/schemas/checkout"

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

export interface OrderPayload extends Omit<CheckoutFormData, 'agreeToTerms'> {
  orderItems: CheckoutFormData['orderItems'];
}
