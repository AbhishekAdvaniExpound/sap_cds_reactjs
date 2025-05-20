import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  logoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#222",
    border: "1 solid black",
  },
  header: {
    fontSize: 14,
    textAlign: "left",
    textDecoration: "none",
    color: "black", // subtle blue accent
  },
  section: {
    marginBottom: 20,
    border: "1 solid black",
  },
  row: {
    flexDirection: "row",
    border: "1 solid black",
    justifyContent: "space-between",
  },
  box: {
    width: "48%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRight: "1 solid black",
    // borderRadius: 0,
    // backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: "700",
    fontSize: 11,
    color: "#444",
  },
  text: {
    fontSize: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e6f0fc",
    border: "1 solid black",
    borderBottom: "1 solid black",
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tableRowAlt: {
    backgroundColor: "#fafafa",
  },
  cell: {
    fontSize: 9,
    paddingHorizontal: 2,
    width: "10%",
    textAlign: "center",
  },
  descCell: {
    width: "20%",
    textAlign: "left",
  },
  totalSection: {
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 6,
  },
  totalRow: {
    fontSize: 10,
    marginVertical: 2,
  },
  amountWords: {
    fontSize: 9,
    fontStyle: "italic",
    marginTop: 4,
  },
  paymentSection: {
    marginTop: 10,
    paddingVertical: 6,
    borderTopWidth: 1,
  },
  paymentRow: {
    fontSize: 9,
    marginBottom: 2,
  },
  declaration: {
    marginTop: 8,
    fontSize: 9,
    borderTopWidth: 1,
    paddingTop: 6,
  },

  signature: {
    marginTop: 50,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "right",
    color: "#222",
  },
});

const toWords = (num) => `INR ${num.toFixed(2)} only`;

const InvoicePDF = ({ invoice }) => {
  const items = invoice.items || [];
  const company = invoice.company || {};
  const customer = invoice.customer || {};
  const supplier = invoice.supplier || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoHeader}>
          <Image
            style={styles.logo}
            src="https://media.licdn.com/dms/image/v2/C510BAQEJf5sseADh4w/company-logo_200_200/company-logo_200_200/0/1630633655892?e=2147483647&v=beta&t=Ppa1u8g31gNoDWxe-0mg1pSpNmt2fJqqN4YE96EDm74"
          />
          <Text style={styles.header}>Tax Invoice</Text>

          {/* sold by and billing */}
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Sold By</Text>
            <Text style={styles.text}>{supplier.name}</Text>
            <Text style={styles.text}>{supplier.address}</Text>
            <Text style={styles.text}>GSTIN: {supplier.gstin || "N/A"}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Billing Address </Text>
            <Text style={styles.text}>{customer.name}</Text>
            <Text style={styles.text}>{customer.address}</Text>
            <Text style={styles.text}>GSTIN: {customer.gstin || "N/A"}</Text>
            <Text style={styles.text}>Email: {customer.email}</Text>
            <Text style={styles.text}>Contact: {customer.phone || "-"}</Text>
          </View>
        </View>

        {/* pan and shipping */}
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Pan No</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.label}>GST Registration No</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.label}>FSSAI License No</Text>
            <Text style={styles.text}>-</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Shipping Address</Text>
            <Text style={styles.text}>{customer.name}</Text>
            <Text style={styles.text}>{customer.address}</Text>
            <Text style={styles.text}>GSTIN: {customer.gstin || "N/A"}</Text>
            <Text style={styles.text}>Email: {customer.email}</Text>
            <Text style={styles.text}>Contact: {customer.phone || "-"}</Text>
          </View>
        </View>

        {/* pan and shipping */}
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Order Number</Text>
            <Text style={styles.text}>{invoice.invoiceNumber}</Text>
            <Text style={styles.label}>Order Date</Text>
            <Text style={styles.text}>-</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>
              Place Of Supply:{" "}
              <Text style={styles.text}>{invoice.placeOfSupply}</Text>
            </Text>
            <Text style={styles.label}>
              Place Of Delivery:{" "}
              <Text style={styles.text}>{invoice.placeOfSupply}</Text>
            </Text>
            <Text style={styles.label}>
              Invoice Number:{" "}
              <Text style={styles.text}>{invoice.invoiceNumber}</Text>
            </Text>
            <Text style={styles.label}>
              Invoice Date:{" "}
              <Text style={styles.text}>{invoice.InvoiceDate}</Text>
            </Text>
          </View>
        </View>

        {/* Table Headers */}
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.cell, styles.descCell]}>Description</Text>
          <Text style={styles.cell}>HSN/SAC</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>Taxable</Text>
          <Text style={styles.cell}>GST%</Text>
          <Text style={styles.cell}>CGST</Text>
          <Text style={styles.cell}>SGST</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {/* Table Body */}
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 ? styles.tableRowAlt : null,
            ]}
          >
            <Text style={[styles.cell, styles.descCell]}>
              {item.description}
            </Text>
            <Text style={styles.cell}>{item.hsnCode}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>{item.unitPrice.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.taxableAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.gstRate}%</Text>
            <Text style={styles.cell}>{item.cgstAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.sgstAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.totalAmount.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalRow}>
            Subtotal: ₹ {invoice.totalAmount.toFixed(2)}
          </Text>
          <Text style={styles.totalRow}>
            Total GST: ₹ {invoice.totalTaxAmount.toFixed(2)}
          </Text>
          <Text style={styles.totalRow}>
            Grand Total: ₹ {invoice.totalAmountWithTax.toFixed(2)}
          </Text>
          <Text style={styles.amountWords}>
            Amount in Words: {toWords(invoice.totalAmountWithTax)}
          </Text>
        </View>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentRow}>
            Payment Date: {invoice.payment?.paymentDate || "-"}
          </Text>
          <Text style={styles.paymentRow}>
            Mode: {invoice.payment?.mode || "-"}
          </Text>
          <Text style={styles.paymentRow}>
            Status: {invoice.payment?.status || "-"}
          </Text>
        </View>

        {/* Terms/Declaration */}
        <View style={styles.declaration}>
          <Text>Declaration: {invoice.terms}</Text>
        </View>

        {/* Signature */}
        <Text style={styles.signature}>
          For {supplier.name || "ABC Enterprises"}
          {"\n\n"}
          Authorized Signatory
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
