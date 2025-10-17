import { OrderPayload } from "@/types/order";

export function renderAdminEmailTemplate(order: OrderPayload): string {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong>
          ${
            item.flavor
              ? `<br><small style="color: #666;">Flavor: ${item.flavor}</small>`
              : ""
          }
          ${
            item.color
              ? `<br><small style="color: #666;">Color: ${item.color}</small>`
              : ""
          }
          ${
            item.option
              ? `<br><small style="color: #666;">Option: ${item.option}</small>`
              : ""
          }
          ${
            item.nicotineLevel
              ? `<br><small style="color: #666;">Nicotine: ${item.nicotineLevel}</small>`
              : ""
          }
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          <strong>${item.quantity}</strong>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          <strong>৳${(item.price * item.quantity).toFixed(2)}</strong>
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
      <title>New Order Notification</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🔔 New Order Received</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
        <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
          <strong style="color: #991b1b; font-size: 16px;">⚡ Action Required:</strong> 
          <span style="color: #7f1d1d;"> A new order needs to be processed immediately.</span>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #dc2626; font-size: 20px;">Order Information</h2>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 10px 0; width: 40%;"><strong>Order ID:</strong></td>
              <td style="padding: 10px 0; font-family: monospace; background: #fff; padding: 4px 8px; border-radius: 4px;">${
                order.orderId
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Status:</strong></td>
              <td style="padding: 10px 0;"><span style="background: #fef3c7; padding: 6px 12px; border-radius: 4px; display: inline-block; font-weight: 600;">${
                order.status
              }</span></td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Total Amount:</strong></td>
              <td style="padding: 10px 0; font-size: 24px; font-weight: bold; color: #dc2626;">৳${order.total.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Total Items:</strong></td>
              <td style="padding: 10px 0; font-weight: 600;">${order.orderItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              )} items</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333; font-size: 18px;">👤 Customer Details</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0; width: 30%;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${order.firstName} ${
    order.lastName
  }</td>
            </tr>
            ${
              order.companyName
                ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${order.companyName}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${
                order.email
              }" style="color: #667eea; text-decoration: none;">${
    order.email
  }</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${
                order.phone
              }" style="color: #667eea; text-decoration: none; font-weight: 600;">${
    order.phone
  }</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Address:</strong></td>
              <td style="padding: 8px 0; line-height: 1.8;">
                ${order.streetAddress}<br>
                ${order.townCity}${
    order.stateCounty ? `, ${order.stateCounty}` : ""
  }<br>
                ${order.country}
              </td>
            </tr>
          </table>
        </div>

        <h3 style="color: #333; margin-top: 30px; font-size: 18px;">📦 Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
          <thead>
            <tr style="background: #e5e7eb;">
              <th style="padding: 12px; text-align: left; font-weight: 600;">Product</th>
              <th style="padding: 12px; text-align: center; font-weight: 600;">Quantity</th>
              <th style="padding: 12px; text-align: right; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody style="background: white;">
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0;">Subtotal:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600;">৳${order.subtotal.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Delivery Charge:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600;">৳${order.deliveryCharge.toFixed(
                2
              )}</td>
            </tr>
            <tr style="border-top: 2px solid #dc2626;">
              <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total:</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 20px; color: #dc2626;">৳${order.total.toFixed(
                2
              )}</td>
            </tr>
          </table>
        </div>

        ${
          order.orderNotes
            ? `
        <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
          <strong style="color: #92400e;">📝 Customer Notes:</strong>
          <p style="margin: 8px 0 0 0; color: #78350f; font-style: italic;">"${order.orderNotes}"</p>
        </div>
        `
            : ""
        }

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders" 
             style="background: #dc2626; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
            View Order in Admin Panel →
          </a>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p>This is an automated notification from ${
          process.env.COMPANY_NAME
        }</p>
      </div>
    </body>
    </html>
  `;
}
