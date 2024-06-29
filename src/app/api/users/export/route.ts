import { NextRequest, NextResponse } from "next/server";
import exceljs from "exceljs";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import { formatResponse } from "@/shared/functions";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const users = await User.find({}, { name: 1, email: 1, phone: 1 });
    const totalUsers = users.length;

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
    ];

    const progressUpdates = [];

    let processedUsers = 0;
    for (const user of users) {
      worksheet.addRow({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      processedUsers++;
      const progress = Math.round((processedUsers / totalUsers) * 100);
      progressUpdates.push({ progress });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const excelData = Buffer.from(buffer).toString("base64");

    const response = {
      progressUpdates,
      excelData,
    };

    return NextResponse.json(
      formatResponse(true, response, "Export users successfull!"),
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="users.xlsx"',
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to export users" },
      { status: 500 }
    );
  }
}
