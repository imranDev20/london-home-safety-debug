import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/_lib/dbConnect";

import User from "../../_models/User";
import { verifyJWT } from "../../_lib/verify-jwt";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    let decodedToken;

    try {
      decodedToken = await verifyJWT(token);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decodedToken._id;
    const user = await User.findById(userId);

    if (!user) {
      const response = NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

      return response;
    }

    return NextResponse.json({
      success: true,
      message: "User information retrieved successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching user information",
      },
      { status: 500 }
    );
  }
}
