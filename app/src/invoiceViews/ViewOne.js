import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define styles for the invoice to closely match the original design
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 3,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 3,
  },
  borderedSection: {
    border: "1",
    borderColor: "#000",
    padding: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  rowHeader: {
    flexDirection: "row",
    marginBottom: 0,
  },
  colHeader: {
    flex: 1,
    padding: 1,
    alignItem: "right",
  },
  colHeaderImage: {
    flex: 1,
    padding: 0,
    // borderRight: 1, // Uncomment this if you want a right border
    // borderColor: "#000", // Uncomment this to add a black border color
    alignItems: "flex-end", // Corrected to `alignItems`
    top: 0,
  },
  col: {
    flex: 1,
    padding: 6,
    borderRight: "1",
    borderColor: "#000",
  },
  lastCol: {
    flex: 1,
    padding: 6,
  },
  table: {
    width: "100%",
    border: "1",
    borderColor: "#000",
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#000",
  },
  tableColHeader: {
    flex: 1,
    padding: 6,
    fontWeight: "bold",
    borderRight: "1",
    borderColor: "#000",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  tableCol: {
    flex: 1,
    padding: 6,
    borderRight: "1",
    borderColor: "#000",
    textAlign: "center",
  },
  lastTableCol: {
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  totalSection: {
    marginTop: 12,
    borderTop: 1,
    borderColor: "#000",
    paddingTop: 5,
  },
  totalText: {
    fontWeight: "bold",
  },
  footer: {
    fontSize: 8,
    marginTop: 12,
    borderTop: 1,
    borderColor: "#000",
    paddingTop: 6,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 9,
    marginTop: 8,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
});

// Example of the new JSON structure

const ViewOne = ({ invoice }) => {
  const invoiceData = invoice;
  console.log("invoiceData", invoiceData);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header: Company Name */}
        <View style={styles.rowHeader}>
          {" "}
          <View style={styles.colHeader}>
            <Text style={styles.header}>GUJARAT FREIGHT TOOLS</Text>
            <Text style={styles.subHeader}>
              Manufacturing & Supply of Precision Press Tool & Room Component
            </Text>
            {/*  */}
            <View style={styles.rowHeader}>
              <View style={styles.colHeader}>
                {" "}
                <Text>{invoiceData?.supplier.address}</Text>
              </View>{" "}
              <View style={styles.colHeader}>
                {" "}
                <Text>{invoiceData?.supplier.contact}</Text>
                <Text>{invoiceData?.supplier.email}</Text>
              </View>{" "}
            </View>{" "}
          </View>
          <View style={styles.colHeaderImage}>
            <Image
              style={styles.logo}
              src="https://media.licdn.com/dms/image/v2/C510BAQEJf5sseADh4w/company-logo_200_200/company-logo_200_200/0/1630633655892?e=2147483647&v=beta&t=Ppa1u8g31gNoDWxe-0mg1pSpNmt2fJqqN4YE96EDm74"
            />
          </View>
        </View>

        {/* ROW 2 */}
        <View
          style={[
            styles.rowHeader,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            },
          ]}
        >
          <View
            style={[
              styles.colHeader,
              { flex: 1, alignItems: "center", border: "1 solid black" },
            ]}
          >
            <Text>GST: {invoiceData?.supplier.gstin}</Text>
          </View>
          <View
            style={[
              styles.colHeader,
              { flex: 1, alignItems: "center", border: "1 solid black" },
            ]}
          >
            <Text>TAX INVOICE</Text>
          </View>
          <View
            style={[
              styles.colHeader,
              { flex: 1, alignItems: "center", border: "1 solid black" },
            ]}
          >
            <Text>ORIGINAL FOR RECIPIENT</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            borderWidth: 1,
            borderColor: "#000",
            padding: 10,
            marginBottom: 15,
          }}
        >
          {/* Customer Details */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Customer Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>M/S</Text>
              <Text style={{ fontSize: 10 }}>{invoiceData?.customer.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>Address</Text>
              <Text style={{ fontSize: 10 }}>
                {invoiceData?.customer.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>PHONE</Text>
              <Text style={{ fontSize: 10 }}>
                {invoiceData?.customer.contact}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                Place of Supply
              </Text>
              <Text style={{ fontSize: 10 }}>{invoiceData?.placeOfSupply}</Text>
            </View>
          </View>

          {/* Invoice Details */}
          <View
            style={{
              flex: 1,
              borderLeftWidth: 1,
              borderLeftColor: "#000",
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Invoice Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                Invoice No
              </Text>
              <Text style={{ fontSize: 10 }}>{invoiceData.invoiceNumber}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                Challan No
              </Text>
              <Text style={{ fontSize: 10 }}>865</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>P.O. No</Text>
              <Text style={{ fontSize: 10 }}>66</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                DELIVERY DATE
              </Text>
              <Text style={{ fontSize: 10 }}>{invoiceData?.invoiceDate}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>L.R. No</Text>
              <Text style={{ fontSize: 10 }}>958</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>E-Way No</Text>
              <Text style={{ fontSize: 10 }}>EWB54864584</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Sr. No.</Text>
            <Text style={styles.tableColHeader}>Description</Text>
            <Text style={styles.tableColHeader}>HSN / SAC</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>Rate</Text>
            <Text style={styles.tableColHeader}>Taxable Value</Text>
            <Text style={styles.tableColHeader}>GST (%)</Text>
            <Text style={styles.tableColHeader}>IGST</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
          </View>
          {invoiceData.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{index + 1}</Text>
              <Text style={styles.tableCol}>{item.description}</Text>
              <Text style={styles.tableCol}>{item.hsnCode}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.unitPrice}</Text>
              <Text style={styles.tableCol}>{item.taxableAmount}</Text>
              <Text style={styles.tableCol}>{item.gstRate}%</Text>
              <Text style={styles.tableCol}>{item.igstAmount}</Text>
              <Text style={styles.tableCol}>{item.totalAmount}</Text>
            </View>
          ))}
        </View>

        {/* Total Summary Section */}
        <View
          style={{
            flexDirection: "column",
            padding: "0px",
            width: "100%",
            border: "1px solid black",
          }}
        >
          {/* Total Amount in Words */}
          <>
            <view
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                border: "1 solid black",
              }}
            >
              {/* Total In words */}
              <View style={{ flex: 2, marginRight: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Total In Words
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{invoiceData?.totalAmountWithTax}</Text>
                </View>
              </View>{" "}
              {/* Bank Details */}
              <View
                style={{
                  flex: 1,
                  marginRight: 10,
                  borderLeft: "1px solid black",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Taxable Amount{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{invoiceData?.totalAmount}</Text>
                </View>{" "}
              </View>{" "}
            </view>
          </>

          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
              }}
            >
              {/* Bank Details */}
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Bank Details
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Bank Name</Text>
                  <Text>State Bank of India</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Branch Name</Text>
                  <Text>RAF CAMP</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Bank Account Number</Text>
                  <Text>2000000004512</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Bank Branch IFSC</Text>
                  <Text>SBIN0000488</Text>
                </View>
              </View>

              {/* Right Section (Amount Details or other) */}
              <View
                style={{
                  flex: 1,
                  borderLeftWidth: 1,
                  borderLeftColor: "black",
                  paddingLeft: 10,
                }}
              >
                {/* Taxable Amount and other details can go here */}
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Amount Details
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Taxable Amount</Text>
                  <Text>{invoiceData?.totalAmount}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Add : IGST</Text>
                  <Text>{invoiceData?.taxAmount}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <Text>Total Amount After Tax</Text>
                  <Text>{invoiceData?.totalAmountWithTax}</Text>
                </View>
              </View>
            </View>
          </>

          {/* Certification and Signature */}
          <View style={{ alignItems: "flex-end", marginTop: 20 }}>
            <Text style={{ fontStyle: "italic" }}>
              This is computer generated invoice no signature required
            </Text>
            <Text style={{ marginTop: 20 }}>Authorised Signatory</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This is a computer-generated invoice and does not require a
            signature.
          </Text>
          <Text>For {invoiceData.supplier.name}</Text>
          <Text>Authorized Signatory</Text>
        </View>

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>{invoiceData.terms}</Text>
      </Page>
    </Document>
  );
};
export default ViewOne;
