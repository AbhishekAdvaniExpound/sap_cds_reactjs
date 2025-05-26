import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 20,
  },
  borderedBox: {
    border: "1px solid black",
    padding: 5,
    marginBottom: 2,
  },
  titleBox: {
    textAlign: "center",
    fontSize: 11,
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  col: {
    border: "1px solid black",
    padding: 5,
    flexGrow: 1,
  },
  colHalf: {
    flex: 1,
    border: "1px solid black",
    padding: 5,
  },
  headingLabel: {
    fontWeight: "bold",
    marginBottom: 2,
    textDecoration: "underline",
  },
  subHeader: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  section: {
    marginBottom: 5,
  },
  noBorder: {
    border: 0,
  },
  tableContainer: {
    marginTop: 0,
    border: "1px solid black",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid black",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  col1: { width: "20%", padding: 4, borderRight: "1px solid black" },
  col2: { width: "40%", padding: 4, borderRight: "1px solid black" },
  col3: {
    width: "10%",
    padding: 4,
    textAlign: "right",
    borderRight: "1px solid black",
  },
  col4: {
    width: "15%",
    padding: 4,
    textAlign: "right",
    borderRight: "1px solid black",
  },
  col5: { width: "15%", padding: 4, textAlign: "right" },
  nestedList: {
    marginTop: 3,
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 4,
    border: "1px solid black",
  },
  summaryLabel: {
    width: "85%",
    textAlign: "right",
    paddingRight: 5,
    borderRight: "1px solid black",
  },
  summaryValue: {
    width: "15%",
    textAlign: "right",
    borderRight: "1px solid black",
  },
  amountInWords: {
    marginTop: 6,
    fontStyle: "italic",
    borderRight: "1px solid black",
  },
});

const ExportInvoiceForCustomerPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.titleBox}>INVOICE</Text>

      <View style={styles.row}>
        <View style={styles.colHalf}>
          <Text style={styles.fieldLabel}>Exporter:</Text>
          <Text>{data.exporter.name}</Text>
          <Text>{data.exporter.address}</Text>
        </View>

        <View style={styles.colHalf}>
          <View style={styles.row}>
            <View style={{ flex: 2 }}>
              <Text style={styles.fieldLabel}>Invoice No. & Date</Text>
              <Text>MPR U3 {data.invoice_number}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Exporter’s Ref:</Text>
              <Text>GSTNNO.: 26AAOCM3634M1ZZ</Text>
              <Text>IEC NO: : 0309054265</Text>
            </View>
          </View>
          <Text style={styles.fieldLabel}>Buyer’s Order No. & Date :</Text>
          <Text>-</Text>
          <Text style={styles.fieldLabel}>Other Reference (s):</Text>
          <Text>-</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Country of Origin of Goods</Text>
              <Text>{data.country_of_origin}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>
                Country of final Destination
              </Text>
              <Text>{data.country_of_final_destination}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.colHalf}>
          <Text style={styles.fieldLabel}>Consignee:</Text>
          <Text>TO THE ORDER</Text>
          <Text>{data.consignee.name}</Text>
          <Text>{data.consignee.address}</Text>
        </View>

        <View style={styles.colHalf}>
          <Text style={styles.fieldLabel}>
            Buyers (If other than Consignee)
          </Text>
          <Text>{data.consignee.name}</Text>
          <Text>{data.consignee.address}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.fieldLabel}>Pre Carriage by</Text>
          <Text style={styles.fieldLabel}>Vessel/Flight No.</Text>
          <Text>BY SEA</Text>
          <Text style={styles.fieldLabel}>Port of Discharge</Text>
          <Text>{data.declaration.port_of_discharge}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.fieldLabel}>Place of Receipt by Pre-carrier</Text>
          <Text>{data.declaration.place_of_receipt_by_pre_carrier}</Text>
          <Text style={styles.fieldLabel}>Port of Loading</Text>
          <Text>{data.declaration.port_of_loading}</Text>
          <Text style={styles.fieldLabel}>Final Destination</Text>
          <Text>{data.declaration.final_destination}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.fieldLabel}>Terms of Delivery:</Text>
          <Text>{data.terms_of_delivery}</Text>
          <Text style={styles.fieldLabel}>Terms of Payment:</Text>
          <Text>{data.terms_of_payment}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {/* Header Row */}
        <View style={styles.tableHeaderRow}>
          <Text style={styles.col1}>Marks & Nos.</Text>
          <Text style={styles.col2}>Description of Goods</Text>
          <Text style={styles.col3}>Quantity</Text>
          <Text style={styles.col4}>Rate</Text>
          <Text style={styles.col5}>Amount</Text>
        </View>

        {/* Data Rows */}
        {data.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.col1}>
              {item.lot_no || "—"}
              {"\n"}
              {item.quantity_bags} BAGS{"\n"}
              Gross Wt.\n{item.gross_weight_kg || "—"}\n Net Wt.\n
              {item.net_weight_kg}
            </Text>

            <Text style={styles.col2}>
              {item.description}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}>H.S.CODE:</Text>{" "}
              {item.hs_code}
              {"\n"}
              {item.nested_contents && (
                <View style={styles.nestedList}>
                  {item.nested_contents.map((line, i) => (
                    <Text key={i}>• {line}</Text>
                  ))}
                </View>
              )}
            </Text>

            <Text style={styles.col3}>{item.quantity_bags}</Text>
            <Text style={styles.col4}>{item.rate_per_kg_usd}</Text>
            <Text style={styles.col5}>{item.amount_usd}</Text>
          </View>
        ))}
      </View>

      {/* Summary Block */}
      <View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>TOTAL FOB</Text>
          <Text style={styles.summaryValue}>{data.total_fob_usd}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>FREIGHT(MOMBASA)</Text>
          <Text style={styles.summaryValue}>{data.freight_usd}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>INSURANCE</Text>
          <Text style={styles.summaryValue}>{data.insurance_usd}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>TOTAL CIF VALUE</Text>
          <Text style={styles.summaryValue}>{data.total_cif_value_usd}</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        {" "}
        <Text style={styles.amountInWords}>
          Amount chargeable (in words): {data.amount_in_words}
        </Text>
      </View>
    </Page>
  </Document>
);

export default ExportInvoiceForCustomerPdf;
