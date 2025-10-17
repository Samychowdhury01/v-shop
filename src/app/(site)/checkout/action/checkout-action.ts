"use server"
import { sendOrderEmails } from "@/lib/utils/notification/email";
import { sendWhatsAppNotification } from "@/lib/utils/notification/whatsapp";
import { OrderPayload } from "@/types/order";
import { after } from "next/server";

export const submitOrder = async (data: OrderPayload) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to submit order");
  }

   // Parse the response to get the plain object
  const result = await response.json();
  // Send notifications in the background after successful order
  after(async () => {
    try {
      // Send WhatsApp notification to admin
      // await sendWhatsAppNotification({
      //   orderId: data.orderId,
      //   customerName: `${data.firstName} ${data.lastName}`,
      //   totalAmount: data.total,
      //   itemCount: data.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      //   items: data.orderItems,
      // });

      // Send emails to customer and admin
      await sendOrderEmails(data);
    } catch (error) {
      console.error("Failed to send notifications:", error);
      // Don't throw - notifications shouldn't break the order flow
    }
  });

  return result;
};

