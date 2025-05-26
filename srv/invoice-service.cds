// using com.expound.taxinvoice as inv from '../db/data-model';
using cap.invoice from '../db/invoice-model';

@protocol: 'rest'
service InvoiceServiceRest {
  // // Projections for core entities
  // entity InvoiceHeader as projection on inv.InvoiceHeader;
  // entity InvoiceItem   as projection on inv.InvoiceItem;
  // entity Payment       as projection on inv.Payment;
  // entity GSTDetails    as projection on inv.GSTDetails;
  // entity Customer      as projection on inv.Customer;
  // entity Supplier      as projection on inv.Supplier;

  // // Custom action to generate invoice HTML (e.g., for download or preview)
  // action generateInvoiceHTML(deliveryId : UUID) returns {
  //   html : LargeString;
  // };

  // // Custom action to generate invoice in JSON format (e.g., for APIs or integrations)
  // action generateInvoiceJSON(InvoiceID : UUID)  returns {
  //   json : LargeString;
  // };

  //
  entity Invoices     as projection on invoice.Invoice;
  entity Exporters    as projection on invoice.Exporter;
  entity Consignees   as projection on invoice.Consignee;
  entity InvoiceItems as projection on invoice.InvoiceItem;
  entity Declarations as projection on invoice.Declaration;
// function combined(invoice_number : String) returns String;

}


service InvoiceServiceOdata {
  // // Projections for core entities
  // entity InvoiceHeader as projection on inv.InvoiceHeader;
  // entity InvoiceItem   as projection on inv.InvoiceItem;
  // entity Payment       as projection on inv.Payment;
  // entity GSTDetails    as projection on inv.GSTDetails;
  // entity Customer      as projection on inv.Customer;
  // entity Supplier      as projection on inv.Supplier;

  // // Custom action to generate invoice HTML (e.g., for download or preview)
  // action generateInvoiceHTML(deliveryId : UUID) returns {
  //   html : LargeString;
  // };

  // // Custom action to generate invoice in JSON format (e.g., for APIs or integrations)
  // action generateInvoiceJSON(InvoiceID : UUID)  returns {
  //   json : LargeString;
  // };

  //
  entity Invoices     as projection on invoice.Invoice;
  entity Exporters    as projection on invoice.Exporter;
  entity Consignees   as projection on invoice.Consignee;
  entity InvoiceItems as projection on invoice.InvoiceItem;
  entity Declarations as projection on invoice.Declaration;
// function combined(invoice_number : String) returns String;

}
