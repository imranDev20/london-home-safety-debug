import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname, origin } = req.nextUrl;

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
