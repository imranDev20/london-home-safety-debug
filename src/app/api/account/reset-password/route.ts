import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import { formatResponse } from "@/shared/functions";
import Token from "../../_models/Token";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import { UserType } from "@/types/users";
import { TokenType } from "@/types/account";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { password, token } = await req.json(); // Added rememberMe

    if (!token) {
      return NextResponse.json(
        formatResponse(false, null, "You must provide the token"),
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        formatResponse(false, null, "You must provide a new password "),
        { status: 400 }
      );
    }

    const existingToken = await Token.findOne({ token });

    if (!existingToken) {
      return NextResponse.json(
        formatResponse(false, null, "Token doesn't exist"),
        { status: 400 }
      );
    }

    // Check if email exists
    const existingUser = await User.findOne({ email: existingToken.email });

    if (!existingUser) {
      return NextResponse.json(
        formatResponse(false, null, "User doesn't exist"),
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser: Partial<UserType> = {
      name: existingUser.name,
      email: existingUser.email,
      password: hashedPassword,
      creation_method: "registration",
    };

    (Object.keys(updatedUser) as (keyof UserType)[]).forEach((key) => {
      existingUser.set(key, updatedUser[key]);
    });

    await existingUser.save();

    return NextResponse.json(
      formatResponse(
        true,
        existingUser,
        "Password updated successfully. Login now!"
      )
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.nextUrl.searchParams.get("token");

    // Validate input
    if (!token) {
      return NextResponse.json(
        formatResponse(false, null, "Please provide token"),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingToken = await Token.findOne({ token });

    if (!existingToken) {
      return NextResponse.json(
        formatResponse(false, null, "Token doesn't exist"),
        { status: 400 }
      );
    }

    if (existingToken.expiry < new Date(Date.now())) {
      return NextResponse.json(
        formatResponse(false, null, "Token has expired"),
        { status: 400 }
      );
    }

    const user = User.findOne({
      email: existingToken.email,
    });

    if (!user) {
      return NextResponse.json(
        formatResponse(
          false,
          null,
          "User related to this token does not exists"
        ),
        { status: 400 }
      );
    }

    const updatedToken: Partial<TokenType> = {
      token: existingToken.token,
      is_verified: true,
      email: existingToken.email,
      type: "reset-password",
    };

    (Object.keys(updatedToken) as (keyof TokenType)[]).forEach((key) => {
      existingToken.set(key, updatedToken[key]);
    });
    await existingToken.save();

    return NextResponse.json(
      formatResponse(true, null, "Token is exists and valid")
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
