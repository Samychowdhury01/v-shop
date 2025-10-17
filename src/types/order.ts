import { CheckoutFormData } from "@/schemas/checkout"

export type Order = {
  _id: string
  firstName: string
  lastName: string
  companyName?: string
  country: string
  streetAddress: string
  townCity: string
  stateCounty: string
  phone: string
  email: string
  shipToDifferentAddress: boolean
  orderNotes?: string
  orderItems: Array<{
    id: string
    name: string
    price: number
    image: string
    flavor?: string
    quantity: number
  }>
  subtotal: number
  deliveryCharge: number
  total: number
  status: string
  orderId: string
}

export interface OrderPayload extends Omit<CheckoutFormData, 'agreeToTerms'> {
  orderItems: CheckoutFormData['orderItems'];
}
