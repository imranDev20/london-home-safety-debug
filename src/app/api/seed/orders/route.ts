import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../../_lib/dbConnect";
import PreOrder from "../../_models/PreOrder";
import Order from "../../_models/Order";
import { ORDER_STATUS } from "@/shared/constants";
import { OrderType, PreOrderType, OrderStatusValues } from "@/types/orders";
import User from "../../_models/User";
import dayjs from "dayjs";

async function generateInvoiceId() {
  const mostRecentOrder = await Order.findOne().sort({ createdAt: -1 }).exec();

  let nextInvoiceId;
  if (mostRecentOrder) {
    const numericPart = parseInt(mostRecentOrder.invoice_id.slice(3, -1), 10);
    const alphabetPart = mostRecentOrder.invoice_id.slice(-1);

    let nextNumericPart = numericPart + 1;

    if (nextNumericPart > 99999) {
      nextNumericPart = 1;
      const nextAlphabetPart = String.fromCharCode(
        alphabetPart.charCodeAt(0) + 1
      );
      if (nextAlphabetPart > "Z") {
        throw new Error("Reached the maximum invoice ID");
      }
      nextInvoiceId = `INV${
        "00001".slice(0, -nextNumericPart.toString().length) + nextNumericPart
      }${nextAlphabetPart}`;
    } else {
      nextInvoiceId = `INV${
        "00000".slice(0, -nextNumericPart.toString().length) + nextNumericPart
      }${alphabetPart}`;
    }
  } else {
    nextInvoiceId = "INV00001A";
  }

  return nextInvoiceId;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const orders = [];

    const engineers = await User.find({ role: "engineer" })
      .select("_id")
      .exec();

    const customers = await User.find({ role: "customer" })
      .select("_id")
      .exec();

    for (let i = 0; i < 200; i++) {
      // Generate fake data for PreOrder
      const fakePreOrder: PreOrderType = {
        service_info: {
          property_type: faker.helpers.arrayElement([
            "residential",
            "commercial",
          ]),
          resident_type: faker.helpers.arrayElement(["house", "hmo", "flat"]),
          bedrooms: faker.datatype.number({ min: 1, max: 10 }),
          order_items: Array.from(
            { length: faker.datatype.number({ min: 1, max: 7 }) },
            () => ({
              name: faker.commerce.productName(),
              title: faker.lorem.sentence(),
              price: faker.datatype.number({ min: 10, max: 1000 }),
              quantity: faker.datatype.number({ min: 1, max: 10 }),
              unit: faker.helpers.arrayElement(["pieces", "kg", "liters"]),
            })
          ),
        },

        personal_info: {
          //change to faker options here
          customer:
            customers[
              faker.datatype.number({ min: 0, max: customers.length - 1 })
            ]._id,
          parking_options: {
            parking_cost: faker.datatype.number({ min: 5, max: 5 }),
            parking_type: faker.helpers.arrayElement([
              "paid",
              "unavailable",
              "free",
            ]),
          },
          congestion_zone: {
            zone_cost: faker.datatype.number({ min: 5, max: 20 }),
            zone_type: faker.helpers.arrayElement([
              "congestion",
              "non_congestion",
            ]),
          },
          order_notes: faker.lorem.sentences(2).substring(0, 250),
          inspection_date: faker.date.anytime(),
          inspection_time: faker.helpers.arrayElement([
            "8 AM - 12 PM",
            "12 PM - 4 PM",
            "4 PM - 8 AM",
          ]),
        },

        payment_info: {
          payment_method: faker.helpers.arrayElement([
            "credit_card",
            "cash_to_engineer",
            "bank_transfer",
          ]),
        },

        status: "payment",
      };

      // Create a new PreOrder document
      const preOrder = await PreOrder.create(fakePreOrder);

      // Generate fake data for Order
      const fakeOrder: OrderType = {
        property_type: preOrder.service_info.property_type,
        resident_type: preOrder.service_info.resident_type,
        bedrooms: preOrder.service_info.bedrooms,
        congestion_zone: preOrder?.personal_info?.congestion_zone as any,
        parking_options: preOrder?.personal_info?.parking_options as any,
        inspection_date: new Date(
          dayjs(preOrder.personal_info?.inspection_date).format()
        ),
        inspection_time: preOrder.personal_info?.inspection_time as string,
        customer: new Types.ObjectId(
          preOrder.toObject().personal_info?.customer._id
        ),
        payment_method: faker.helpers.arrayElement([
          "credit_card",
          "cash_to_engineer",
          "bank_transfer",
        ]),
        order_notes: preOrder.personal_info?.order_notes,
        order_status: [
          {
            status: faker.helpers.arrayElement(
              ORDER_STATUS
            ) as OrderStatusValues,
            timestamp: new Date(),
          },
        ],
        remaining_amount: faker.datatype.number({ min: 100, max: 1000 }),
        paid_amount: faker.datatype.number({ min: 10, max: 500 }),
        invoice_id: await generateInvoiceId(), // Generate the invoice ID
        order_items: preOrder.service_info.order_items.map((item) => ({
          ...item,
          assigned_engineer: faker.helpers.arrayElement(
            engineers.map((engineer) => engineer._id)
          ),
        })),
      };

      // Create a new Order document
      const newOrder = new Order(fakeOrder);
      await newOrder.save();

      orders.push(newOrder);
    }

    return NextResponse.json(
      formatResponse(
        true,
        orders,
        `Seeded ${orders.length} orders successfully`
      )
    );
  } catch (error: any) {
    console.error("Error seeding orders:", error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
