import { OrderPayload } from "@/types/order";

export function renderCustomerEmailTemplate(order: OrderPayload): string {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center;">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 12px; border-radius: 4px;">
            <div>
              <strong>${item.name}</strong>
              ${item.flavor ? `<br><small style="color: #666;">Flavor: ${item.flavor}</small>` : ""}
              ${item.color ? `<br><small style="color: #666;">Color: ${item.color}</small>` : ""}
              ${item.option ? `<br><small style="color: #666;">Option: ${item.option}</small>` : ""}
              ${item.nicotineLevel ? `<br><small style="color: #666;">Nicotine: ${item.nicotineLevel}</small>` : ""}
            </div>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          ৳${item.price.toFixed(2)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          ৳${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px;">Hi <strong>${order.firstName}</strong>,</p>
        <p>Thank you for your order! We've received it and will process it soon.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">Order Details</h2>
          <p style="margin: 8px 0;"><strong>Order ID:</strong> ${order.orderId}</p>
          <p style="margin: 8px 0;"><strong>Status:</strong> <span style="background: #fef3c7; padding: 4px 12px; border-radius: 4px; display: inline-block;">${order.status}</span></p>
        </div>

        <h3 style="color: #333; margin-top: 30px; font-size: 18px;">Items Ordered</h3>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #eee;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="padding: 12px; text-align: left; font-weight: 600;">Product</th>
              <th style="padding: 12px; text-align: center; font-weight: 600;">Qty</th>
              <th style="padding: 12px; text-align: right; font-weight: 600;">Price</th>
              <th style="padding: 12px; text-align: right; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0;">Subtotal:</td>
              <td style="padding: 8px 0; text-align: right;">৳${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Delivery Charge:</td>
              <td style="padding: 8px 0; text-align: right;">৳${order.deliveryCharge.toFixed(2)}</td>
            </tr>
            <tr style="border-top: 2px solid #667eea;">
              <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total:</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">৳${order.total.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #333; font-size: 16px;">Shipping Address</h3>
          <p style="margin: 5px 0; line-height: 1.8;">
            ${order.firstName} ${order.lastName}<br>
            ${order.companyName ? `${order.companyName}<br>` : ""}
            ${order.streetAddress}<br>
            ${order.townCity}${order.stateCounty ? `, ${order.stateCounty}` : ""}<br>
            ${order.country}<br>
            <strong>Phone:</strong> ${order.phone}
          </p>
        </div>

        ${order.orderNotes ? `
        <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
          <strong style="color: #92400e;">Order Notes:</strong>
          <p style="margin: 8px 0 0 0; color: #78350f;">${order.orderNotes}</p>
        </div>
        ` : ""}

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">If you have any questions, please contact us.</p>
          <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">Thank you for shopping with us! 💜</p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}