import { ADDRESS, WEBSITE_URL } from "@/shared/data";

export const receivedOrderEmailHtml = (invoiceId: string, orderId: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Received</title>
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
      .content {
        padding: 20px;
      }
      .content h2 {
        font-size: 22px;
        margin-bottom: 20px;
        color: #333;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 20px;
        color: #555;
      }
      .button {
        display: inline-block;
        background-color: #007BFF;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        font-size: 16px;
      }
      .button:hover {
        background-color: #0056b3;
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
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Order Received</h2>
      </div>
      <div class="content">
        <p>Dear Admin,</p>
        <p>We have received a new order. The order number is <strong>#${invoiceId}</strong>.</p>
        <p>To manage this order, please click the button below:</p>
        <a href="${WEBSITE_URL}/admin/orders/${orderId}" class="button">Manage Order</a>
        <p>Please ensure that the order is processed promptly and the customer is updated on its status.</p>
        <p>If you have any questions or concerns, feel free to contact the support team.</p>
        <p>Best regards,<br>The Your Company Team</p>
      </div>
      <div class="footer">
        <p>${ADDRESS}</p>
        <p><a href="${WEBSITE_URL}">${WEBSITE_URL}</a></p>
      </div>
    </div>
  </body>
  </html> `;
};
