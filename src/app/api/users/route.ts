import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../_models/User";
import { formatResponse } from "@/shared/functions";
import bcrypt from "bcrypt";
import { validateToken } from "../_lib/validateToken";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Validate the token and check the user's role
    const { isValid, userId, userRole, response } = await validateToken(req);
    if (!isValid) {
      return response;
    }

    // Only allow admin users to fetch the users list
    if (userRole !== "admin") {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.nextUrl.searchParams.get("q") || "";
    const role = req.nextUrl.searchParams.get("role") || "";
    const sortBy = req.nextUrl.searchParams.get("sort_by") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sort_order") || "desc";

    // Prepare the query object
    const query: any = {};

    // If a search term is provided, add it to the query
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // If a role is provided, add it to the query
    if (role) {
      query.role = role;
    }

    const sortObject: any = {};
    sortObject[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Fetch users from the database with pagination, sorting, and optional search and role filtering
    const users = await User.find(query)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .exec();

    // Process the users to omit fields based on the role
    const processedUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      if (userWithoutPassword.role === "customer") {
        const { skills, experience, specialty, ...customerObj } =
          userWithoutPassword;
        return customerObj;
      }
      return userWithoutPassword;
    });

    // Get the total number of users matching the query
    const totalCount = await User.countDocuments(query);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      formatResponse(true, processedUsers, "Users fetched successfully", {
        currentPage: page,
        totalPages,
        totalCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      formatResponse(false, null, "Failed to fetch users"),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const userData = await req.json();
    const generatedPass = Math.random().toString(36).slice(-6);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(generatedPass, saltRounds);

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Remove restricted fields based on the user's role
    const { password, ...newUserObj } = newUser.toObject();

    if (newUser.role === "customer") {
      const { skills, specialty, experience, ...customerObj } = newUserObj;
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: customerObj,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: newUserObj,
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
