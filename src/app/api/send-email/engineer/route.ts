import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../../_lib/dbConnect";
import { sendEmail } from "../../_lib/send-email";
import { notifyEngineerEmailHtml } from "../../_templates/notify-engineer-email";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();

    const {
      receiver_email,
      subject,
      assignment,
      orderDetails,
      content,
      orderItemsForEngineer,
    } = data;

    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: receiver_email,
      subject: subject,
      html: notifyEngineerEmailHtml(
        orderDetails,
        content,
        orderItemsForEngineer
      ),
    });

    return NextResponse.json(
      formatResponse(true, null, `Email sent successfully!`)
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
