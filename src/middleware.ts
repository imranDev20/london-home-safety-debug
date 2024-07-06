import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    // console.log(req.nextUrl)
    const { token } = req.nextauth;
    const { pathname, origin } = req.nextUrl;

    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(`${origin}/login`);
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

export const config = { matcher: ["/profile/:path*", "/admin/:path*"] };
