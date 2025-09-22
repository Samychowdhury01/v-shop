"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { BillingDetails } from "./billing-details";
import { OrderSummary } from "./order-summary";
import { checkoutFormSchema, CheckoutFormData } from "@/schemas/checkout";
import { useCart } from "@/lib/provider/cart-context";

export function CheckoutFormWrapper() {
  const { cartItems: orderItems } = useCart();
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "United Arab Emirates",
      streetAddress: "",
      townCity: "",
      stateCounty: "",
      phone: "",
      email: "",
      shipToDifferentAddress: false,
      orderNotes: "",
      agreeToTerms: false,
    },
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 30;
  const total = subtotal + deliveryCharge;

  async function onSubmit(data: CheckoutFormData) {
    try {
      // Handle form submission
      console.log("Order submitted:", data);

      // You can make an API call here to process the order
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, orderItems, total }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        // Redirect to success page or clear cart
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <BillingDetails form={form} />
        <OrderSummary
          form={form}
          orderItems={orderItems}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
        />
      </form>
    </Form>
  );
}
