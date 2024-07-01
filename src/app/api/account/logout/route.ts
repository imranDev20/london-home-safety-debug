import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/_lib/dbConnect";
import BlacklistedToken from "../../_models/BlacklistedToken";
import { formatResponse } from "@/shared/functions";
import { verifyJWT } from "@/app/api/_lib/verify-jwt";

const checkAndBlacklistToken = async (token: string) => {
  const isTokenBlacklisted = await BlacklistedToken.findOne({ token });
  if (isTokenBlacklisted) throw new Error("Token already blacklisted");
  await BlacklistedToken.create({ token });
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        formatResponse(false, null, "Access or refresh token missing"),
        { status: 401 }
      );
    }

    try {
      await verifyJWT(accessToken);
      await verifyJWT(refreshToken);
    } catch (err) {
      return NextResponse.json(
        formatResponse(false, null, (err as Error).message),
        { status: 401 }
      );
    }

    await checkAndBlacklistToken(accessToken);
    await checkAndBlacklistToken(refreshToken);

    const response = NextResponse.json(
      formatResponse(true, null, "Logout successful")
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      formatResponse(false, null, "An error occurred while logging out"),
      { status: 500 }
    );
  }
}
