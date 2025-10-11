import { OrderPayload } from "@/types/order";

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

  return response;
};

