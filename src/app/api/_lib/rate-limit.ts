import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 1, // per second
});

export async function rateLimit(req: NextRequest) {
  try {
    const ip =
      req.ip ||
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    await rateLimiter.consume(ip);
    return true;
  } catch (rejRes) {
    return false;
  }
}
