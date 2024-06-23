import { IOrder, IPreOrder } from "@/types/orders";
import Order from "../_models/Order";
import jsPDF from "jspdf";
import {
  ADDRESS,
  CONGESTION_ZONE_OPTIONS,
  EMAIL_ADDRESS,
  PARKING_OPTIONS,
  PHONE_NO,
} from "@/shared/constants";
import {
  calculateOrderTotalCost,
  calculatePreOrderTotalCost,
} from "@/shared/functions";
import { IUser } from "@/types/user";

export async function generateInvoiceId() {
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

export async function generateInvoicePdfFromPreOrder(
  invoiceId: string,
  preOrder: IPreOrder<IUser>
) {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(18).setFont("helvetica", "bold");
  doc
    .text("London Home Safety", 190, 20, { align: "right" })
    .setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(ADDRESS, 190, 30, {
    align: "right",
  });
  doc.text(`Email: ${EMAIL_ADDRESS}`, 190, 35, { align: "right" });
  doc.text(`Phone: ${PHONE_NO}`, 190, 40, { align: "right" });

  // Add invoice title and details
  doc.setFontSize(32);
  doc.text("INVOICE", 20, 60);
  doc.setFontSize(11);
  doc
    .setFont("helvetica", "bold")
    .text(`Invoice Number:`, 168, 80, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${invoiceId}`, 190, 80, { align: "right" });
  doc
    .setFont("helvetica", "bold")
    .text(`Date:`, 170, 85, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, 190, 85, { align: "right" });

  // Add billing and shipping address
  doc
    .setFont("helvetica", "bold")
    .text("Billing Address:", 20, 80)
    .setFont("helvetica", "normal");
  doc.text(preOrder?.personal_info?.customer?.name ?? "", 20, 90);
  doc.text(preOrder?.personal_info?.customer?.address?.street ?? "", 20, 95);
  doc.text(
    `${preOrder?.personal_info?.customer?.address?.postcode ?? ""}, ${
      preOrder?.personal_info?.customer?.address?.city ?? ""
    }`,
    20,
    100
  );

  // Add table header
  doc.setFontSize(12);
  doc.text("Service", 20, 120);
  doc.text("Quantity", 120, 120);
  doc.text("Total", 180, 120);
  doc.line(15, 125, 200, 125);

  let currentY = 132;
  preOrder.service_info.order_items.forEach((item) => {
    doc.text(item.title, 20, currentY);
    doc.text(`${item.quantity} ${item.unit}`, 120, currentY);
    doc.text(
      `£${(parseInt(item.quantity.toString()) * item.price).toString()}`,
      180,
      currentY
    );
    currentY += 10;
  });

  // Add total section
  const subtotal = preOrder.service_info.order_items.reduce(
    (sum, item) => sum + parseInt(item.quantity.toString()) * item.price,
    0
  );
  console.log(subtotal);
  // use when tax is available
  // const tax = 0;
  // const total = subtotal + tax;

  const parkingOption = PARKING_OPTIONS.find(
    (opt) => opt.value === preOrder?.personal_info?.parking_options.parking_type
  )?.name;

  const congestionOption = CONGESTION_ZONE_OPTIONS.find(
    (opt) => opt.value === preOrder?.personal_info?.congestion_zone.zone_type
  )?.name;

  const totalCost = calculatePreOrderTotalCost(preOrder) || 0;

  doc.text("Subtotal:", 150, currentY + 10);
  doc.text(`£${subtotal.toString()}`, 180, currentY + 10);
  doc.text(`Parking Charge (${parkingOption}):`, 166, currentY + 20, {
    align: "right",
  });
  doc.text(
    `£${preOrder?.personal_info?.parking_options.parking_cost.toString()}`,
    180,
    currentY + 20
  );
  doc.text(
    `Congestion Zone Charge (${congestionOption}):`,
    166,
    currentY + 30,
    {
      align: "right",
    }
  );
  doc.text(
    `£${preOrder?.personal_info?.congestion_zone.zone_cost.toString()}`,
    180,
    currentY + 30
  );
  doc
    .setFont("Helvetica", "bold")
    .text("Total (Incl. Tax):", 166, currentY + 40, { align: "right" });
  doc
    .setFont("Helvetica", "bold")
    .text(`£${totalCost.toString()}`, 180, currentY + 40)
    .setFont("Helvetica", "normal");

  // Add footer
  doc.setFontSize(10);
  doc.text("Terms and conditions apply.", 20, 280);
  doc.text("Thank you for your business!", 20, 290);

  // Return the PDF document as a Uint8Array
  return doc.output("arraybuffer");
}

export async function generateInvoicePdfFromOrder(
  invoiceId: string,
  order: IOrder<IUser>
) {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(18).setFont("helvetica", "bold");
  doc
    .text("London Home Safety", 190, 20, { align: "right" })
    .setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(ADDRESS, 190, 30, {
    align: "right",
  });
  doc.text(`Email: ${EMAIL_ADDRESS}`, 190, 35, { align: "right" });
  doc.text(`Phone: ${PHONE_NO}`, 190, 40, { align: "right" });

  // Add invoice title and details
  doc.setFontSize(32);
  doc.text("INVOICE", 20, 60);
  doc.setFontSize(11);
  doc
    .setFont("helvetica", "bold")
    .text(`Invoice Number:`, 168, 80, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${invoiceId}`, 190, 80, { align: "right" });
  doc
    .setFont("helvetica", "bold")
    .text(`Date:`, 170, 85, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, 190, 85, { align: "right" });

  // Add billing and shipping address
  doc
    .setFont("helvetica", "bold")
    .text("Billing Address:", 20, 80)
    .setFont("helvetica", "normal");
  doc.text(order?.customer?.name ?? "", 20, 90);
  doc.text(order?.customer?.address?.street ?? "", 20, 95);
  doc.text(
    `${order?.customer?.address?.postcode ?? ""}, ${
      order?.customer?.address?.city ?? ""
    }`,
    20,
    100
  );

  // Add table header
  doc.setFontSize(12);
  doc.text("Service", 20, 120);
  doc.text("Quantity", 120, 120);
  doc.text("Total", 180, 120);
  doc.line(15, 125, 200, 125);

  let currentY = 132;
  order.order_items.forEach((item) => {
    doc.text(item.title, 20, currentY);
    doc.text(`${item.quantity} ${item.unit}`, 120, currentY);
    doc.text(
      `£${(parseInt(item.quantity.toString()) * item.price).toString()}`,
      180,
      currentY
    );
    currentY += 10;
  });

  // Add total section
  const subtotal = order.order_items.reduce(
    (sum, item) => sum + parseInt(item.quantity.toString()) * item.price,
    0
  );
  console.log(subtotal);
  // use when tax is available
  // const tax = 0;
  // const total = subtotal + tax;

  const parkingOption = PARKING_OPTIONS.find(
    (opt) => opt.value === order?.parking_options.parking_type
  )?.name;

  const congestionOption = CONGESTION_ZONE_OPTIONS.find(
    (opt) => opt.value === order?.congestion_zone.zone_type
  )?.name;

  const totalCost = calculateOrderTotalCost(order) || 0;

  doc.text("Subtotal:", 150, currentY + 10);
  doc.text(`£${subtotal.toString()}`, 180, currentY + 10);
  doc.text(`Parking Charge (${parkingOption}):`, 166, currentY + 20, {
    align: "right",
  });
  doc.text(
    `£${order?.parking_options.parking_cost.toString()}`,
    180,
    currentY + 20
  );
  doc.text(
    `Congestion Zone Charge (${congestionOption}):`,
    166,
    currentY + 30,
    {
      align: "right",
    }
  );
  doc.text(
    `£${order?.congestion_zone.zone_cost.toString()}`,
    180,
    currentY + 30
  );
  doc
    .setFont("Helvetica", "bold")
    .text("Total (Incl. Tax):", 166, currentY + 40, { align: "right" });
  doc
    .setFont("Helvetica", "bold")
    .text(`£${totalCost.toString()}`, 180, currentY + 40)
    .setFont("Helvetica", "normal");

  // Add footer
  doc.setFontSize(10);
  doc.text("Terms and conditions apply.", 20, 280);
  doc.text("Thank you for your business!", 20, 290);

  // Return the PDF document as a Uint8Array
  return doc.output("arraybuffer");
}
