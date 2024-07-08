import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 1 point
  duration: 1, // per 60 seconds (1 minute)
});

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    const { pathname, origin } = req.nextUrl;

    // Apply rate limiting only to API routes
    if (pathname.startsWith("/api")) {
      try {
        await rateLimiter.consume(
          req.ip || req.headers.get("x-forwarded-for") || ""
        );
      } catch (error: any) {
        if (error instanceof RateLimiterRes) {
          return new NextResponse(
            JSON.stringify({ message: "Too Many Requests" }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        return new NextResponse(
          JSON.stringify({ message: "Internal Server Error" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Redirect non-admin users away from admin pages
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(`${origin}/login`);
    }

    if (
      pathname.startsWith("/profile") &&
      (token?.role === "admin" || token?.role === "engineer")
    ) {
      return NextResponse.redirect(`${origin}/`);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // If `authorized` returns `true`, the middleware function will execute.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
    secret: process.env.JWT_SECRET,
  }
);

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/login"],
};
