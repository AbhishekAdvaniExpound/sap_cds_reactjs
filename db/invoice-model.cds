namespace cap.invoice;

entity Invoice {
  key invoice_number     : String;
  invoice_date           : Date;
  exporter               : Association to Exporter;
  consignee              : Association to Consignee;
  buyer_if_other_than_consignee : String;
  country_of_origin      : String;
  country_of_final_destination : String;
  terms_of_delivery      : String;
  terms_of_payment       : String;
  items                  : Composition of many InvoiceItem on items.invoice = $self;
  total_fob_usd          : Decimal(15,2);
  freight_usd            : Decimal(15,2);
  insurance_usd          : Decimal(15,2);
  total_cif_value_usd    : Decimal(15,2);
  amount_in_words        : String;
  declaration            : Composition of one Declaration;
}

entity Exporter {
  key ID     : UUID;
  name       : String;
  address    : String;
}

entity Consignee {
  key ID     : UUID;
  name       : String;
  address    : String;
}

entity InvoiceItem {
  key ID              : UUID;
  sr_no               : Integer;
  description         : String;
  hs_code             : String;
  quantity_bags       : Integer;
  net_weight_kg       : Decimal(15,2);
  rate_per_kg_usd     : Decimal(15,5);
  amount_usd          : Decimal(15,2);
  lot_no              : String;
  invoice             : Association to Invoice;
}

entity Declaration {
    key ID              : UUID;
  place_of_receipt_by_pre_carrier : String;
  vessel_flight_no                : String;
  port_of_loading                 : String;
  port_of_discharge              : String;
  final_destination              : String;
}
