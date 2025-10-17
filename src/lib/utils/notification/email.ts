"use server";
// @/lib/utils/notifications/email.ts
import nodemailer from "nodemailer";
import { OrderPayload } from "@/types/order";
import { renderCustomerEmailTemplate } from "./customer-mail-template";
import { renderAdminEmailTemplate } from "./admin-mail-template";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, 
  },
});

export async function sendOrderEmails(orderData: OrderPayload) {
  console.log(orderData, "order Data for mail")
  try {
    // Send email to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: renderCustomerEmailTemplate(orderData),
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received - ${orderData.orderId}`,
      html: renderAdminEmailTemplate(orderData),
    });

    console.log("Order emails sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
