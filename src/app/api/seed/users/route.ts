import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const numUsers = 100; // Number of users to generate
    const users = [];

    for (let i = 0; i < numUsers; i++) {
      const name = faker.name.fullName();
      const email = faker.internet.email();
      const phone = faker.phone.number();
      const password = faker.internet.password();
      const role = faker.helpers.arrayElement([
        "customer",
        "admin",
        "engineer",
      ]);
      const address = {
        street: faker.address.streetAddress(),
        postcode: faker.address.zipCode(),
        city: faker.address.city(),
      };
      const preferences = {
        mode: faker.helpers.arrayElement(["light", "dark"]),
      };
      const skills =
        role === "engineer"
          ? faker.helpers.uniqueArray(faker.random.words, 3)
          : [];
      const specialty = role === "engineer" ? faker.name.jobArea() : undefined;
      const experience =
        role === "engineer"
          ? faker.datatype.number({ min: 1, max: 20 })
          : undefined;
      const creation_method = "seed";

      const user = new User({
        name,
        email,
        phone,
        role,
        password,
        address,
        preferences,
        skills,
        specialty,
        experience,
        creation_method,
      });

      users.push(user);
    }

    await User.insertMany(users);

    return NextResponse.json(
      formatResponse(true, users, `Seeded ${users.length} orders successfully`)
    );
  } catch (error: any) {
    console.error("Error seeding users", error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
