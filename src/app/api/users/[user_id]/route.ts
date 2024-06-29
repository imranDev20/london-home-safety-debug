import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import { formatResponse } from "@/shared/functions";
import { UserType } from "@/types/users";

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    await dbConnect();
    const { user_id } = params;

    // Find user and exclude password field
    const user = await User.findById(user_id).select("-password");

    return NextResponse.json(
      formatResponse(true, user, "User profile retrieved successfully!")
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      formatResponse(false, null, error.message || "Internal server error"),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    await dbConnect();
    const { user_id } = params;

    const data: Partial<UserType> = await req.json();

    // Find the user by ID
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user fields with the new data
    // Fix any type later here
    (Object.keys(data) as (keyof UserType)[]).forEach((key) => {
      (user as any)[key] = data[key]!;
    });

    // Save the updated user
    await user.save();

    return NextResponse.json(
      formatResponse(true, user, "Your profile has been updated successfully!")
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      formatResponse(false, null, error.message || "Internal server error"),
      {
        status: 500,
      }
    );
  }
}
