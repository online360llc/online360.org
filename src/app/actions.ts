"use server";

import { getDb } from "@/lib/db";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  try {
    // 1. Store in Database
    const db = getDb();
    db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)").run(name, email, message);

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: "hello@online360.org", // Main contact email
      replyTo: email,
      subject: `New Inquiry from ${name} via Online360.org`,
      text: `
Name: ${name}
Email: ${email}
Message:

${message}
      `,
      html: `
<h3>New Inquiry from Online360.org</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: "Thank you for reaching out! We'll get back to you soon." };
  } catch (error) {
    console.error("Contact form error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
