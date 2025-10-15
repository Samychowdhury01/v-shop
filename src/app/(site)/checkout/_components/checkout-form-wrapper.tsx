// checkout-form-wrapper.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { BillingDetails } from "./billing-details";
import { OrderSummary } from "./order-summary";
import { checkoutFormSchema, CheckoutFormData } from "@/schemas/checkout";
import { useLocalCart } from "@/hooks/use-local-cart";
import toast from "react-hot-toast";
import { OrderPayload } from "@/types/order";
import { submitOrder } from "../action/checkout-action";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function CheckoutFormWrapper() {
  const router = useRouter();
  const { cartItems, isLoading: isCartLoading, clearCart } = useLocalCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      orderItems: [],
      subtotal: 0,
      deliveryCharge: 30,
      total: 0,
      status: "PENDING",
    },
  });

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 30;
  const total = subtotal + deliveryCharge;

  async function onSubmit(formData: CheckoutFormData) {
    // Validate cart items
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order payload
      const orderPayload: OrderPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName || "",
        country: formData.country,
        streetAddress: formData.streetAddress,
        townCity: formData.townCity,
        stateCounty: formData.stateCounty || "",
        phone: formData.phone,
        email: formData.email,
        shipToDifferentAddress: formData.shipToDifferentAddress,
        orderNotes: formData.orderNotes || "",
        orderItems: cartItems,
        subtotal,
        deliveryCharge,
        total,
        status: "PENDING",
      };

      // Submit order to API
      const response = await submitOrder(orderPayload);
      const result = await response.json();

      // Success handling
      toast.success("Your order has been placed successfully");

      // Clear cart after successful order
      clearCart();

      // Redirect to success page or order confirmation
      // You might want to pass the order ID to the success page
      router.push(
        `/order-success${result.orderId ? `?orderId=${result.orderId}` : ""}`
      );
    } catch (error) {
      console.error("Error submitting order:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state while cart is loading
  if (isCartLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Add some items to your cart before checking out
        </p>
        <Link
          href="/products"
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Continue Shopping
        </Link>
      </div>
    );
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
          orderItems={cartItems}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
