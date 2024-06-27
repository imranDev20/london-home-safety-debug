import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../_lib/generate-token";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password, rememberMe } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide email and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    const accessTokenExpiry = 60 * 60 * 24;
    const refreshTokenExpiry = rememberMe
      ? 60 * 60 * 24 * 30
      : 60 * 60 * 24 * 7; // 30 days or 7 days in seconds

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: accessTokenExpiry,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpiry,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
