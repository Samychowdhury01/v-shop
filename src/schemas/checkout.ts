import { z } from "zod";

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
  shipToDifferentAddress: z.boolean().default(false),
  orderNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}