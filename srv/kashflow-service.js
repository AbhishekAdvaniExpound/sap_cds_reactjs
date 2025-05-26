const cds = require("@sap/cds");
const axios = require("axios");

module.exports = async (srv) => {
  const { Invoice } = cds.entities("kashflow");

  srv.on("syncInvoices", async () => {
    try {
      const response = await axios.get("https://api.kashflow.com/v2/invoices", {
        headers: {
          Authorization: "Basic YOUR_API_TOKEN_HERE",
          Accept: "application/json",
        },
      });

      const data = response.data.Data || [];

      const mapped = data.map((entry) => ({
        id: entry.Id,
        number: entry.Number,
        issuedDate: entry.IssuedDate,
        dueDate: entry.DueDate,
        customerName: entry.CustomerName,
        customerCode: entry.CustomerCode,
        customerId: entry.CustomerId,
        grossAmount: entry.GrossAmount,
        netAmount: entry.NetAmount,
        vatAmount: entry.VATAmount,
        totalPaidAmount: entry.TotalPaidAmount,
        status: entry.Status,
        currencyCode: entry.Currency?.Code,
        currencyName: entry.Currency?.Name,
        exchangeRate: entry.Currency?.ExchangeRate,
      }));

      const db = await cds.connect.to("db");

      await db.run(DELETE.from(Invoice)); // optional reset
      await db.run(INSERT.into(Invoice).entries(mapped));

      return { success: true, count: mapped.length };
    } catch (e) {
      console.error("❌ Sync failed:", e);
      return { success: false, count: 0 };
    }
  });
};
