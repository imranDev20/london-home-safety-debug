import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/_lib/dbConnect";
import { verifyJWT } from "../_lib/verify-jwt";
import { generateAccessToken } from "../_lib/generate-token";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 }
      );
    }

    const user = await verifyJWT(refreshToken);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = await generateAccessToken(user);

    const response = NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15, // 15 minutes
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
