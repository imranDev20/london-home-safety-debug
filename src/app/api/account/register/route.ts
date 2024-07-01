import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../_lib/generate-token";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password, role, creation_method } = await req.json(); // Added rememberMe

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide name, email, and password" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      creation_method: "registration",
    });
    await newUser.save();

    // Generate JWT tokens
    const accessToken = await generateAccessToken(newUser);
    const refreshToken = await generateRefreshToken(newUser);

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        creation_method: newUser.creation_method,
      },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 15, //20 minutes in seconds
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
