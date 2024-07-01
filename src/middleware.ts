import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExpiredError } from "@/shared/errors";
import { verifyJWT } from "./app/api/_lib/verify-jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminRoutes = ["/admin"];
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=no_token", req.url));
    }

    try {
      const decodedToken = await verifyJWT(token);

      if (decodedToken.role !== "admin") {
        return NextResponse.redirect(
          new URL("/login?error=unauthorized", req.url)
        );
      }

      // If the token is valid, proceed to the requested route
      return NextResponse.next();
    } catch (error) {
      if (error instanceof JWTExpiredError) {
        // Redirect to the refresh token endpoint to get a new access token
        return NextResponse.redirect(new URL("/api/refresh-token", req.url));
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
