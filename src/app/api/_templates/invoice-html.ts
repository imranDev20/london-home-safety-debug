export const invoiceHtmlTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .invoice-title {
            font-size: 24px;
        }
        .billed-to {
            margin-bottom: 20px;
        }
        .invoice-info {
            
            margin-bottom: 20px;
        }
        .invoice-sections {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .services-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .services-table th, .services-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }
        .services-table th {
            background-color: #f2f2f2;
        }
        .footer {
            margin-top: 20px;
            color: #777;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="company-logo">
                <img src="https://yourcompany.com/logo.png" alt="Company Logo">
            </div>
            <div class="invoice-title">
                <h1>Invoice</h1>
            </div>
        </div>
        <div class="invoice-sections">
            <div class="billed-to">
                <h3>Billed To:</h3>
                <p>${name}</p>
                <p>Customer Address</p>
                <p>City, Country, ZIP</p>
            </div>
            <div class="invoice-info">
            <p><strong>Invoice ID:</strong> INV-00123</p>
                
                   <p><strong>Date:</strong> June 1, 2024</p>
            </div>
        </div>
        <table class="services-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Service 1</td>
                    <td>2</td>
                    <td>$50.00</td>
                    <td>$100.00</td>
                </tr>
                <tr>
                    <td>Service 2</td>
                    <td>1</td>
                    <td>$75.00</td>
                    <td>$75.00</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="total">Total</td>
                    <td>$175.00</td>
                </tr>
            </tfoot>
        </table>
        <div class="footer">
            <div class="bank-details">
                <h3>Bank Transfer Details</h3>
                <p><strong>Bank Name:</strong> [Your Bank Name]</p>
                <p><strong>Account Holder:</strong> [Your Company Name]</p>
                <p><strong>Account Number:</strong> [Your Account Number]</p>
                <p><strong>IBAN:</strong> [Your IBAN]</p>
                <p><strong>SWIFT/BIC:</strong> [Your SWIFT/BIC]</p>
            </div>
            <div class="company-info">
                <p><strong>Your Company Name</strong></p>
                <p>123 Main Street, City, Country</p>
                <p>Phone: +123456789</p>
                <p>Email: info@yourcompany.com</p>
            </div>
        </div>
    </div>
</body>
</html>

`;
