import { UserType } from "@/types/users";
import { SignJWT } from "jose";

const secretKey = process.env.JWT_SECRET;

export async function generateAccessToken(
  user: Partial<UserType<true>>
): Promise<string> {
  try {
    if (!secretKey) {
      throw new Error("JWT secret is not defined in environment variables.");
    }

    const encoder = new TextEncoder();
    const encodedSecret = encoder.encode(secretKey);

    const jwt = await new SignJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("15m") // token expires in 15 minutes
      .sign(encodedSecret);

    return jwt;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error; // Re-throwing the error for the caller to handle
  }
}

export async function generateRefreshToken(
  user: Partial<UserType<true>>
): Promise<string> {
  try {
    if (!secretKey) {
      throw new Error("JWT secret is not defined in environment variables.");
    }

    const encoder = new TextEncoder();
    const encodedSecret = encoder.encode(secretKey);

    const jwt = await new SignJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("7d")
      .sign(encodedSecret);

    return jwt;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error; // Re-throwing the error for the caller to handle
  }
}
