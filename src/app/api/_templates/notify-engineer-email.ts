import { ADDRESS, BUSINESS_NAME, WEBSITE_URL } from "@/shared/data";
import { OrderTypeForResponse } from "@/types/orders";
import { UserType } from "@/types/users";
import dayjs from "dayjs";

export const notifyEngineerEmailHtml = (
  orderDetails: OrderTypeForResponse<UserType>,
  content: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Order</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007BFF;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 28px;
    }
    .header img {
      margin-bottom: 20px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #555;
    }
    .message-box {
      margin-top: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ul li {
      padding: 5px 0;
    }
    @media (max-width: 600px) {
      .container {
        width: 100%;
        margin: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Service Order</h2>
    </div>
    <div class="content">
      <p>Dear Engineer,</p>
      <p>
        A new service order has been received. Details are as follows:
      </p>
      <div class="message-box">
        <p style="font-weight: bold;">Customer Details:</p>
        <p style="margin-left: 20px;">
          <strong>Address:</strong> ${orderDetails.customer.address?.street}, ${
  orderDetails.customer.address?.postcode
}, ${orderDetails.customer.address?.city}<br>
          <strong>Phone:</strong> ${orderDetails.customer.phone}<br>
          <strong>Email:</strong> ${orderDetails.customer.email}<br>
          <strong>Scheduled:</strong> ${orderDetails.inspection_time}, ${dayjs(
  orderDetails.inspection_date
).format("DD MMMM YYYY")}
        </p>
        <p style="font-weight: bold;">Desired Services:</p>
        <ul style="margin-left: 20px;">
          ${orderDetails.order_items
            .map(
              (item) => `<li>${item.name} - ${item.quantity} ${item.unit}</li>`
            )
            .join("")}
        </ul>
        <p style="font-weight: bold;">Message from Kamal:</p>
        <p style="margin-left: 20px;">${content}</p>
      </div>
      <p style="margin-top: 20px;">
        Please contact the customer to schedule the visit and provide the requested services.
      </p>
      <p>
        Best regards,<br/>
        <strong>Kamal Ahmed</strong>
      </p>
    </div>
    <div class="footer">
      <p>${BUSINESS_NAME} | ${ADDRESS}</p>
      <p><a href="https://${WEBSITE_URL}">${WEBSITE_URL}</a></p>
    </div>
  </div>
</body>
</html>
`;
