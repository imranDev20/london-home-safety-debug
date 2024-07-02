import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../../_lib/dbConnect";
import { sendEmail } from "../../_lib/send-email";
import { notifyEngineerEmailHtml } from "../../_templates/notify-engineer-email";
import { SendEmailToEngineerData } from "@/types/misc";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { subject, content, orderDetails, receiver } =
      (await req.json()) as SendEmailToEngineerData;

    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: receiver,
      subject: subject,
      html: notifyEngineerEmailHtml(orderDetails, content),
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
