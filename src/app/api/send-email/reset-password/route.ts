import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import { formatResponse } from "@/shared/functions";
import { sendEmail } from "../../_lib/send-email";
import { passwordResetEmailHtml } from "../../_templates/password-reset-email";
import jwt from "jsonwebtoken";
import Token from "../../_models/Token";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        formatResponse(false, null, "Please provide email"),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        formatResponse(false, null, "User doesn't exist"),
        { status: 400 }
      );
    }

    if (existingUser.provider === "google") {
      return NextResponse.json(
        formatResponse(
          false,
          null,
          "Password reset is not available for accounts registered with Google."
        ),
        { status: 400 }
      );
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "3m", // Token expiry time
    });

    const newToken = new Token({
      email,
      duration: "3m",
      token,
      type: "reset-password",
    });
    await newToken.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/forgot-password?token=${newToken.token}`;

    const resetPasswordEmailSubject = `Password Reset Request for Your Account`;
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: email,
      subject: resetPasswordEmailSubject,
      html: passwordResetEmailHtml(resetLink),
    });

    return NextResponse.json(
      formatResponse(
        true,
        null,
        "Password reset link sent to your email. Check your inbox."
      )
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
