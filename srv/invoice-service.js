const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
const { InvoiceHeader, InvoiceItem, Customer, Supplier, GSTDetails, Payment } = this.entities;


//   this.on('generateInvoiceHTML', async (req) => {
//     const deliveryId = req.data.deliveryId;

//     const delivery = await SELECT.one.from(Deliveries).where({ ID });
//     if (!delivery) return req.error(404, `Delivery not found: ${deliveryId}`);

//     const company = await SELECT.one.from(Companies).where({ ID: delivery.company_ID });
//     const customer = await SELECT.one.from(Customers).where({ ID: delivery.customer_ID });

//     const items = await SELECT.from(DeliveryItems).where({ delivery_ID });
//     const productIds = items.map(i => i.product_ID);
//     const products = await SELECT.from(Products).where({ ID: { in: productIds } });

//     // Compute tax per item (assuming delivery.taxRate and delivery.taxTotal exist)
//     const itemsHTML = items.map(item => {
//       const product = products.find(p => p.ID === item.product_ID) || {};
//       const amount = item.quantity * item.price;
//       const taxPercent = item.taxPercent || delivery.taxRate || 0; // fallback tax %
//       const taxAmount = amount * taxPercent / 100;

//       return `
//         <tr>
//           <td>${product.name || ''}</td>
//           <td>${product.hsnCode || ''}</td>
//           <td class="right">${item.quantity}</td>
//           <td class="right">₹${item.price}</td>
//           <td class="right">${taxPercent}%</td>
//           <td class="right">₹${taxAmount}</td>
//           <td class="right">₹${(amount + taxAmount)}</td>
//         </tr>
//       `;
//     }).join('');



// const html = `
// <html>
// <head>
//   <title>Tax Invoice - Amazon India Style</title>
//   <style>
//     /* Reset */
//     * {
//       box-sizing: border-box;
//     }
//     body {
//       font-family: "Amazon Ember", Arial, Helvetica, sans-serif;
//       margin: 20px auto;
//       max-width: 850px;
//       font-size: 13px;
//       color: #111;
//       background-color: #fff;
//       line-height: 1.4;
//     }
//     header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 4px solid #ff9900;
//       padding-bottom: 12px;
//       margin-bottom: 20px;
//     }
//     .logo {
//       font-size: 28px;
//       font-weight: 700;
//       color: #ff9900;
//       font-family: Arial, Helvetica, sans-serif;
//       letter-spacing: 1px;
//     }
//     h1 {
//       font-size: 22px;
//       font-weight: 700;
//       margin: 0;
//       color: #111;
//       letter-spacing: 1.2px;
//     }
//     .section {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 22px;
//       gap: 20px;
//     }
//     .box {
//       width: 48%;
//       border: 1px solid #ddd;
//       padding: 12px 16px;
//       border-radius: 4px;
//       background-color: #f7f7f7;
//     }
//     .box h2 {
//       margin-top: 0;
//       font-size: 15px;
//       border-bottom: 1px solid #ccc;
//       padding-bottom: 6px;
//       font-weight: 700;
//       color: #333;
//     }
//     p {
//       margin: 4px 0;
//     }
//     table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 20px;
//       font-size: 13px;
//     }
//     th, td {
//       border: 1px solid #ddd;
//       padding: 10px 8px;
//       text-align: left;
//       vertical-align: middle;
//     }
//     th {
//       background-color: #f2f2f2;
//       font-weight: 700;
//       text-align: center;
//       letter-spacing: 0.5px;
//     }
//     td.right {
//       text-align: right;
//       font-variant-numeric: tabular-nums;
//     }
//     .summary-table {
//       width: 300px;
//       margin-left: auto;
//       border: 1px solid #ddd;
//       border-radius: 4px;
//       background: #fafafa;
//       font-size: 14px;
//     }
//     .summary-table td {
//       padding: 10px 12px;
//     }
//     .summary-table td.label {
//       font-weight: 700;
//       color: #333;
//     }
//     .summary-table tr.total-row td {
//       font-size: 16px;
//       font-weight: 800;
//       border-top: 2px solid #ff9900;
//       color: #111;
//     }
//     .invoice-info p {
//       margin: 6px 0;
//       font-size: 14px;
//       font-weight: 600;
//       color: #333;
//     }
//     footer {
//       border-top: 1px solid #ddd;
//       font-size: 11px;
//       color: #555;
//       padding-top: 14px;
//       margin-top: 30px;
//       text-align: center;
//       font-style: normal;
//       line-height: 1.5;
//     }
//     .terms {
//       margin-top: 8px;
//       font-style: italic;
//       color: #666;
//     }
//   </style>
// </head>
// <body>

// <header>
//   <div class="logo">amazon.in</div>
//   <h1>TAX INVOICE</h1>
// </header>

// <div class="section">
//   <div class="box">
//     <h2>Seller Details</h2>
//     <p><strong>${company.name}</strong></p>
//     <p>${company.address.replace(/\n/g, '<br>')}</p>
//     <p>GSTIN: ${company.taxId || 'N/A'}</p>
//     <p>State: ${company.state || 'N/A'}</p>
//   </div>
//   <div class="box">
//     <h2>Buyer Details</h2>
//     <p><strong>${customer.name}</strong></p>
//     <p>${customer.address.replace(/\n/g, '<br>')}</p>
//     <p>Email: ${customer.email || '-'}</p>
//     <p>GSTIN: ${customer.taxId || 'N/A'}</p>
//     <p>State: ${customer.state || 'N/A'}</p>
//   </div>
// </div>

// <div class="invoice-info">
//   <p><strong>Invoice No:</strong> ${delivery.invoiceNumber || 'INV-001'}</p>
//   <p><strong>Invoice Date:</strong> ${new Date(delivery.date).toLocaleDateString('en-IN')}</p>
//   <p><strong>Payment Terms:</strong> Payment due within 15 days from invoice date</p>
// </div>

// <table>
//   <thead>
//     <tr>
//       <th style="width:36%;">Description</th>
//       <th style="width:10%;">HSN/SAC</th>
//       <th style="width:8%;">Qty</th>
//       <th style="width:12%;">Rate (₹)</th>
//       <th style="width:8%;">Tax %</th>
//       <th style="width:12%;">Tax Amt (₹)</th>
//       <th style="width:14%;">Total (₹)</th>
//     </tr>
//   </thead>
//   <tbody>
//     ${itemsHTML}
//   </tbody>
// </table>

// <table class="summary-table">
//   <tr><td class="label">Subtotal</td><td class="right">₹${delivery.subTotal}</td></tr>
//   <tr><td class="label">CGST</td><td class="right">₹${(delivery.taxTotal / 2).toFixed(2)}</td></tr>
//   <tr><td class="label">SGST / IGST</td><td class="right">₹${(delivery.taxTotal / 2).toFixed(2)}</td></tr>
//   <tr class="total-row"><td class="label">Total Amount</td><td class="right">₹${delivery.totalAmount}</td></tr>
// </table>

// <footer>
//   <p><strong>Note:</strong> Goods once sold will not be taken back.</p>
//   <p class="terms">This is a system generated invoice and does not require signature.</p>
//   <p>Thank you for shopping with amazon.in!</p>
// </footer>

// </body>
// </html>
// `
//     return { html };
//   });


this.on('generateInvoiceJSON', async (req) => {
  const InvoiceID = req.data.InvoiceID;

  // Step 1: Fetch the invoice header
  const invoice = await SELECT.one.from(InvoiceHeader).where({ InvoiceID });
  if (!invoice) return req.error(404, `Invoice not found: ${InvoiceID}`);

  // Step 2: Fetch the customer and supplier
  const customer = await SELECT.one.from(Customer).where({ CustomerID: invoice.CustomerID });
  const supplier = await SELECT.one.from(Supplier).where({ SupplierGSTIN: invoice.SupplierGSTIN });

  // Step 3: Fetch invoice items
  const items = await SELECT.from(InvoiceItem).where({ InvoiceID });

  // Step 4: Fetch GST details
  const gstDetails = await SELECT.from(GSTDetails).where({ InvoiceID });

  // Step 5: Fetch payment information
  const payment = await SELECT.one.from(Payment).where({ InvoiceID });

  // Step 6: Structure the invoice JSON
  const invoiceJSON = {
    invoiceID: invoice.InvoiceID,
    invoiceNumber: invoice.InvoiceNumber,
    invoiceDate: invoice.InvoiceDate,
    dueDate: invoice.DueDate,
    invoiceStatus: invoice.InvoiceStatus,
    placeOfSupply: invoice.PlaceOfSupply,
    paymentTerms: invoice.PaymentTerms,
    totalAmount: invoice.TotalAmount,
    totalTaxAmount: invoice.TotalTaxAmount,
    totalAmountWithTax: invoice.TotalAmountWithTax,
    gstTaxType: invoice.GSTTaxType,
    remarks: invoice.Remarks,

    customer: {
      customerID: customer.CustomerID,
      name: customer.CustomerName,
      address: customer.CustomerAddress,
      gstin: customer.CustomerGSTIN,
      contact: customer.ContactNumber,
      email: customer.EmailAddress
    },

    supplier: {
      name: supplier?.SupplierName || '',
      gstin: supplier?.SupplierGSTIN || invoice.SupplierGSTIN,
      address: supplier?.SupplierAddress || '',
      contact: supplier?.ContactNumber || '',
      email: supplier?.EmailAddress || ''
    },

    items: items.map(item => ({
      itemID: item.ItemID,
      description: item.ItemDescription,
      hsnCode: item.HSNCode,
      quantity: item.Quantity,
      unitPrice: item.UnitPrice,
      taxableAmount: item.TaxableAmount,
      gstRate: item.GSTRate,
      cgstAmount: item.CGSTAmount,
      sgstAmount: item.SGSTAmount,
      igstAmount: item.IGSTAmount,
      totalAmount: item.TotalAmount
    })),

    gstBreakdown: gstDetails.map(gst => ({
      gstID: gst.GSTID,
      gstin: gst.GSTIN,
      gstTaxType: gst.GSTTaxType,
      cgstAmount: gst.CGSTAmount,
      sgstAmount: gst.SGSTAmount,
      igstAmount: gst.IGSTAmount
    })),

    payment: payment ? {
      paymentID: payment.PaymentID,
      paymentDate: payment.PaymentDate,
      amount: payment.PaymentAmount,
      mode: payment.PaymentMode,
      status: payment.PaymentStatus
    } : null,

    terms: "Goods once sold will not be taken back. Payment due within 15 days from invoice date. Thank you for your business."
  };

  return invoiceJSON;
});

});
