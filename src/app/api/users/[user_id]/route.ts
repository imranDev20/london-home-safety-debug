import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import { formatResponse } from "@/shared/functions";
import { UserType } from "@/types/users";
import { getServerSession } from "next-auth";
import { config } from "../../auth/[...nextauth]/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    await dbConnect();
    const { user_id } = params;

    // Restrict unauthorized users
    const session = await getServerSession(config);

    if (session?.user.role !== "admin" && session?.user._id !== user_id) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

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

    const session = await getServerSession(config);

    if (session?.user.role !== "admin" && session?.user._id !== user_id) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    await dbConnect();
    const { user_id } = params;

    const session = await getServerSession(config);

    // Only admin or the user themselves can delete the user
    if (session?.user.role !== "admin" && session?.user._id !== user_id) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

    const user = await User.findByIdAndDelete(user_id);

    if (!user) {
      return NextResponse.json(formatResponse(false, null, "User not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      formatResponse(true, null, "User deleted successfully")
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
