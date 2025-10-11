// @/schemas/checkout.ts
import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  flavor: z.string().optional(),
  color: z.string().optional(),
  option: z.string().optional(),
  nicotineLevel: z.string().optional(),
  quantity: z.number(),
});

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  stateCounty: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  shipToDifferentAddress: z.boolean(),
  orderNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  orderItems: z.array(cartItemSchema),
  subtotal: z.number(),
  deliveryCharge: z.number(),
  total: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;