"use server"

interface WhatsAppNotificationData {
  orderId: string;
  customerName: string;
  totalAmount: number;
  itemCount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export async function sendWhatsAppNotification(data: WhatsAppNotificationData) {
  const { orderId, customerName, totalAmount, itemCount, items } = data;

  const itemsList = items
    .map((item) => `${item.name} (${item.quantity}x) = ৳${(item.price * item.quantity).toFixed(2)}`)
    .join(", ");

  try {
    const response = await fetch(
      `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.ADMIN_WHATSAPP_NUMBER,
          type: "template",
          template: {
            name: "order_notification",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: orderId },
                  { type: "text", text: customerName },
                  { type: "text", text: itemCount.toString() },
                  { type: "text", text: itemsList },
                  { type: "text", text: `৳${totalAmount.toFixed(2)}` },
                ],
              },
            ],
          },
        }),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`WhatsApp API Error: ${JSON.stringify(result)}`);
    }

    console.log("✅ WhatsApp notification sent:", result);
    return result;
  } catch (error) {
    console.error("❌ WhatsApp error:", error);
    throw error;
  }
}