using com.expound.taxinvoice as inv from '../db/data-model';

service InvoiceService {
  // Projections for core entities
  entity InvoiceHeader as projection on inv.InvoiceHeader;
  entity InvoiceItem   as projection on inv.InvoiceItem;
  entity Payment       as projection on inv.Payment;
  entity GSTDetails    as projection on inv.GSTDetails;
  entity Customer      as projection on inv.Customer;
  entity Supplier      as projection on inv.Supplier;

  // Custom action to generate invoice HTML (e.g., for download or preview)
  action generateInvoiceHTML(deliveryId : UUID) returns {
    html : LargeString;
  };

  // Custom action to generate invoice in JSON format (e.g., for APIs or integrations)
  action generateInvoiceJSON(InvoiceID : UUID)  returns {
    json : LargeString;
  };
}
