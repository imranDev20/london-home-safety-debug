import { NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import { contactAdminNotificationEmailHtml } from "../_templates/contact-admin-email";

import {
  customerEmailSubject,
  contactCustomerNotificationEmailHtml,
} from "../_templates/contact-customer-email";
import { sendEmail } from "../_lib/send-email";

// Type guard to check if an error has a message property
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, message, subject, name, phone } = await req.json();

    // Send email to admin
    const adminEmailSubject = `${name} wants to contact you`;
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: process.env.ADMIN_EMAIL as string,
      subject: adminEmailSubject,
      html: contactAdminNotificationEmailHtml(
        name,
        email,
        subject,
        message,
        phone
      ),
    });

    // Send email to customer
    await sendEmail({
      fromName: "London Home Safety",
      fromEmail: "info@londonhomesafety.co.uk",
      to: email,
      subject: customerEmailSubject,
      html: contactCustomerNotificationEmailHtml(name, subject, message),
    });

    // Return a success response
    return NextResponse.json(
      formatResponse(true, null, "Form submitted successfully")
    );
  } catch (error) {
    // Handle errors and return a user-friendly message
    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : "Internal Server Error";

    console.log(errorMessage);

    return NextResponse.json(formatResponse(false, null, errorMessage), {
      status: 500,
    });
  }
}
