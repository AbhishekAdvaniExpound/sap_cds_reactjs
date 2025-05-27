// srv/server.js
const cds = require("@sap/cds");

cds.on('bootstrap', app => {
  const path = require('path')
  const express = require('express')
  app.use('/', express.static(path.join(__dirname, 'app/build')))
})

const remoteService = await cds.connect.to('RemoteService');

  this.on('READ', 'Entities', req => {
    return remoteService.run(req.query);
  });



cds.on("bootstrap", (app) => {
  const cors = require("cors");
  app.use(
    cors({
      origin: "*", // or specify: ['http://localhost:3000']
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  console.log("[CAP] Custom Express routes loaded");

  app.get("/rest/invoice-service-rest/combined", async (req, res) => {
    const { invoice_number } = req.query;
    if (!invoice_number)
      return res.status(400).json({ error: "Missing invoice_number" });

    try {
      const db = await cds.connect.to("db");
      const { Invoice, Declaration } = cds.entities("cap.invoice");

      // Fetch Invoice with associated fields (but not declaration)
      const invoice = await db.run(
        SELECT.from(Invoice)
          .where({ invoice_number })
          .columns(
            "*",
            { ref: ["exporter"], expand: ["*"] },
            { ref: ["consignee"], expand: ["*"] },
            { ref: ["items"], expand: ["*"] }
          )
      );

      if (!invoice?.length)
        return res.status(404).json({ error: "Invoice not found" });

      const fullInvoice = invoice[0];

      // Fetch declaration manually (composition, no foreign key)
      if (fullInvoice.ID) {
        const declaration = await db.run(
          SELECT.one.from(Declaration).where({ invoice_ID: fullInvoice.ID })
        );
        fullInvoice.declaration = declaration || {};
      }

      res.json(fullInvoice);
    } catch (err) {
      console.error("❌ Error fetching invoice:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

module.exports = cds.server;
