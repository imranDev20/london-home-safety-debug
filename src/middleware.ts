import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExpiredError } from "@/shared/errors";
import { generateAccessToken } from "./app/api/_lib/generate-token";
import { verifyJWT } from "./app/api/_lib/verify-jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminRoutes = ["/admin"];
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    let token = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!token && !refreshToken) {
      return NextResponse.redirect(new URL("/login?error=no_token", req.url));
    }

    try {
      const decodedToken = await verifyJWT(token as string);

      if (decodedToken.role !== "admin") {
        return NextResponse.redirect(
          new URL("/login?error=unauthorized", req.url)
        );
      }
    } catch (error) {
      if (error instanceof JWTExpiredError && refreshToken) {
        try {
          const user = await verifyJWT(refreshToken);
          token = await generateAccessToken(user);

          const response = NextResponse.next();

          response.cookies.set("accessToken", token, {
            httpOnly: true,
            maxAge: 60 * 20, // 20 minutes in seconds
            sameSite: "strict",
            path: "/",
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
          });

          return response;
        } catch (refreshError) {
          return NextResponse.redirect(
            new URL("/login?error=invalid_refresh_token", req.url)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL("/login?error=invalid_token", req.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
