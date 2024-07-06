import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../_lib/generate-token";
import { formatResponse } from "@/shared/functions";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password, role, creation_method } = await req.json(); // Added rememberMe

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        formatResponse(false, null, "Please provide name, email, and password"),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        formatResponse(false, null, "Email already exists"),
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

    return NextResponse.json(
      formatResponse(true, newUser, "User registered successfully")
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
