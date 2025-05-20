import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import InvoicePDF from "./invoiceViews/InvoicePDF";
import ViewOne from "./invoiceViews/ViewOne";

function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4004/odata/v4/invoice/InvoiceHeader")
      .then((res) => setDeliveries(res.data.value))
      .catch((err) => console.error(err));
  }, []);

  const handleDownload = async (deliveryId) => {
    setLoading(true);
    console.log(deliveryId, "deliveryId");
    try {
      // const id = deliveryId?.InvoiceID;
      const id = deliveryId?.InvoiceID;
      console.log(id, "id");
      // Step 1: Fetch invoice JSON from backend
      const response = await axios.post(
        "http://localhost:4004/odata/v4/invoice/generateInvoiceJSON",
        { InvoiceID: id },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      // Step 3: Generate and download PDF
      const blob = await pdf(<InvoicePDF invoice={data} />).toBlob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `invoice_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (delivery) => {
    setLoading(true);
    try {
      const id = delivery?.InvoiceID;
      console.log(id, "id");
      // Step 1: Fetch invoice JSON from backend
      const response = await axios.post(
        "http://localhost:4004/odata/v4/invoice/generateInvoiceJSON",
        { InvoiceID: id },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      // Step 2: Map API response to your PDF component's expected format
      const invoice = {
        ID: data.deliveryID,
        invoiceNumber: data.invoiceNumber,
        date: data.invoiceDate,
        billingName: data.customer.name,
        billingAddress: data.customer.address,
        shippingName: data.customer.name,
        shippingAddress: data.customer.address,
        items: data.items.map((item) => ({
          description: item.productName,
          hsn: "", // if HSN is not provided
          qty: item.quantity,
          rate: item.price,
          gst: 18, // example fixed GST% (can be dynamic if provided)
          total: item.total,
        })),
        subtotal: data.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        gstTotal: data.items.reduce(
          (sum, item) => sum + (item.total * 18) / 100,
          0
        ), // assuming 18% GST
        grandTotal:
          data.items.reduce((sum, item) => sum + item.total, 0) * 1.18,
      };
      console.log(data, "data-data");

      // Step 3: Generate and download PDF
      const blob = await pdf(<ViewOne invoice={data} />).toBlob();
      // const blob = await pdf(<InvoicePDF invoice={data} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error("View error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          fontFamily: `'72', '72Bold', Arial, sans-serif`,
          background: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{ color: "#0a4d78", fontWeight: "600", marginBottom: "20px" }}
        >
          Deliveries
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgb(0 0 0 / 0.1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#e1eff7",
                color: "#0a4d78",
                textAlign: "left",
                fontWeight: "600",
              }}
            >
              <th style={{ padding: "12px 20px" }}>ID</th>
              <th style={{ padding: "12px 20px" }}>Date</th>
              <th style={{ padding: "12px 20px" }}>Invoice Number</th>
              <th style={{ padding: "12px 20px" }}>Grand Total</th>
              <th style={{ padding: "12px 20px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr
                key={d.InvoiceID}
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgb(0 0 0 / 0.05)",
                  transition: "background-color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d7eafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={{ padding: "12px 20px" }}>{d.InvoiceID}</td>
                <td style={{ padding: "12px 20px" }}>
                  {new Date(d.InvoiceDate).toLocaleDateString()}
                </td>
                <td style={{ padding: "12px 20px" }}>Rs{d.InvoiceNumber}</td>
                <td style={{ padding: "12px 20px" }}>
                  Rs{d.TotalAmountWithTax}
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <button
                    onClick={() => handleDownload(d)}
                    disabled={loading}
                    style={{
                      backgroundColor: "#0a4d78",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 14px",
                      marginRight: "8px",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.6 : 1,
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {loading ? "Generating..." : "Download"}
                  </button>
                  <button
                    onClick={() => handleView(d)}
                    disabled={loading}
                    style={{
                      backgroundColor: "#0073e6",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 14px",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.6 : 1,
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {loading ? "Generating..." : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
