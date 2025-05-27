import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const ExportInvoiceForCustomer = ({ data }) => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    padding: "20px",
    border: "1px solid black",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: 1.5,
  };

  const sectionStyle = {
    marginBottom: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thtd = {
    border: "1px solid black",
    padding: "4px",
    textAlign: "left",
    verticalAlign: "top",
  };

  const summaryTable = {
    display: "table",
    width: "100%",
    marginTop: "0px",
    border: "1px solid black",
  };

  const summaryRow = {
    flexDirection: "row",
    border: "1px solid black",
  };

  const summaryColLabel = {
    width: "85%",
    padding: "0px",
    border: "1px solid black",
  };
  const summaryColValue = {
    width: "15%",
    padding: "0px",
    textAlign: "right",
  };
  const amountWords = {
    marginTop: 6,
    padding: 4,
    border: "1px solid black",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}
      >
        EXPORT INVOICE FOR CUSTOMS
      </div>

      <div style={sectionStyle}>
        <b>Exporter:</b>
        <br />
        {data.exporter.name}
        <br />
        {data.exporter.address}
      </div>

      <div style={sectionStyle}>
        <b>Consignee:</b>
        <br />
        TO THE ORDER
        <br />
        {data.consignee.address}
      </div>

      <div style={sectionStyle}>
        <b>Pre-Carriage by:</b> BY SEA
        <br />
        <b>Vessel/Flight No.:</b> {data.declaration.vessel_flight_no}
        <br />
        <b>Port of Discharge:</b> {data.declaration.port_of_discharge}
        <br />
        <b>Place of Receipt by Pre-Carrier:</b>{" "}
        {data.declaration.place_of_receipt_by_pre_carrier}
        <br />
        <b>Port of Loading:</b> {data.declaration.port_of_loading}
        <br />
        <b>Final Destination:</b> {data.declaration.final_destination}
      </div>

      <div style={sectionStyle}>
        <b>Invoice No. & Date:</b> MPR U3 {data.invoice_number}
        <br />
        <b>Country of Origin of Goods:</b> {data.country_of_origin}
        <br />
        <b>Country of Final Destination:</b> {data.country_of_final_destination}
        <br />
        <b>Buyer's (If other than Consignee):</b>
        <br />
        {data.consignee.name}
        <br />
        {data.consignee.address}
      </div>

      <div style={sectionStyle}>
        <b>Terms of Delivery:</b> {data.terms_of_delivery}
        <br />
        <b>Terms of Payment:</b> {data.terms_of_payment}
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thtd}>Description of Goods</th>
            <th style={thtd}>No & Kind of Pkgs</th>
            <th style={thtd}>Quantity in Kgs</th>
            <th style={thtd}>Quantity in Kgs</th>
            <th style={thtd}>Rate (in US $)</th>
            <th style={thtd}>Amount (in US $)</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, idx) => (
            <tr key={idx}>
              <td style={thtd}>
                {item.description}
                <br />
                H.S.CODE: {item.hs_code}
              </td>
              <td style={thtd}>{item.quantity_bags} BAGS</td>
              <td style={thtd}>{item.quantity_bags} BAGS</td>
              <td style={thtd}>{item.net_weight_kg}</td>
              <td style={thtd}>{item.rate_per_kg_usd}</td>
              <td style={thtd}>{item.amount_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Table */}
      <View style={summaryTable}>
        <View style={summaryRow}>
          <Text style={summaryColLabel}>TOTAL FOB</Text>
          <Text style={summaryColValue}>${data.total_fob_usd}</Text>
        </View>
        <View style={summaryRow}>
          <Text style={summaryColLabel}>FREIGHT(MOMBASA)</Text>
          <Text style={summaryColValue}>${data.freight_usd}</Text>
        </View>
        <View style={summaryRow}>
          <Text style={summaryColLabel}>INSURANCE</Text>
          <Text style={summaryColValue}>${data.insurance_usd}</Text>
        </View>
        <View style={summaryRow}>
          <Text style={summaryColLabel}>TOTAL CIF VALUE</Text>
          <Text style={summaryColValue}> ${data.total_cif_value_usd}</Text>
        </View>
      </View>

      {/* Amount in Words */}
      <View style={amountWords}>
        <Text>Amount chargeable (in words): {data.amount_in_words}</Text>
      </View>
    </div>
  );
};

export default ExportInvoiceForCustomer;
