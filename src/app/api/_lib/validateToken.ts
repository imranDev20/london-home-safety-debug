// tokenUtils.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/app/api/_lib/verifyJWT";
import { formatResponse } from "@/shared/functions";

export async function validateToken(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) {
    return {
      isValid: false,
      response: NextResponse.json(
        formatResponse(false, null, "Token missing"),
        { status: 401 }
      ),
    };
  }

  try {
    const decodedToken = await verifyJWT(token);
    return {
      isValid: true,
      userId: decodedToken._id,
      userRole: decodedToken.role,
    };
  } catch (error) {
    return {
      isValid: false,
      response: NextResponse.json(
        formatResponse(false, null, "Invalid or expired token"),
        { status: 401 }
      ),
    };
  }
}
