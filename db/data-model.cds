namespace com.expound.taxinvoice;

entity InvoiceHeader {
    key InvoiceID          : UUID; // Unique Invoice Identifier
        InvoiceNumber      : String(20); // Invoice number
        InvoiceDate        : Date; // Date of invoice issue
        DueDate            : Date; // Due date for payment
        CustomerID         : UUID; // Customer unique ID
        CustomerName       : String(100); // Customer name
        CustomerGSTIN      : String(15); // GSTIN of the customer
        SupplierGSTIN      : String(15); // GSTIN of the supplier
        TotalAmount        : Decimal(15, 2); // Total amount (excl. taxes)
        TotalTaxAmount     : Decimal(15, 2); // Total tax amount
        TotalAmountWithTax : Decimal(15, 2); // Total amount including taxes
        PaymentTerms       : String(100); // Payment terms (e.g., net 30)
        PlaceOfSupply      : String(100); // Place of supply for GST
        InvoiceStatus      : String(20); // e.g., 'Issued', 'Cancelled'
        GSTTaxType         : String(50); // GST tax type (e.g., 'Integrated', 'State')
        Remarks            : String(255); // Additional remarks (optional)
}

entity InvoiceItem {
    key ItemID          : UUID; // Unique identifier for the item
        InvoiceID       : UUID; // Foreign key to InvoiceHeader
        ItemDescription : String(255); // Description of the item/service
        HSNCode         : String(8); // HSN code for the product/service
        Quantity        : Decimal(10, 2); // Quantity of items
        UnitPrice       : Decimal(15, 2); // Price per unit
        TaxableAmount   : Decimal(15, 2); // Amount before taxes
        GSTRate         : Decimal(5, 2); // GST rate (e.g., 18.00 for 18%)
        CGSTAmount      : Decimal(15, 2); // CGST amount
        SGSTAmount      : Decimal(15, 2); // SGST amount
        IGSTAmount      : Decimal(15, 2); // IGST amount
        TotalAmount     : Decimal(15, 2); // Total amount after taxes
}

entity Payment {
    key PaymentID     : UUID; // Unique Payment Identifier
        InvoiceID     : UUID; // Foreign key to InvoiceHeader
        PaymentDate   : Date; // Date of payment
        PaymentAmount : Decimal(15, 2); // Amount paid
        PaymentMode   : String(50); // Payment method (e.g., 'Bank Transfer', 'Cash')
        PaymentStatus : String(20); // Payment status (e.g., 'Completed', 'Pending')
}

entity GSTDetails {
    key GSTID      : UUID; // Unique GST record ID
        InvoiceID  : UUID; // Foreign key to InvoiceHeader
        CGSTAmount : Decimal(15, 2); // CGST amount
        SGSTAmount : Decimal(15, 2); // SGST amount
        IGSTAmount : Decimal(15, 2); // IGST amount
        GSTIN      : String(15); // GSTIN of the supplier
        GSTTaxType : String(50); // Tax type, either 'CGST', 'SGST', or 'IGST'
}

entity Customer {
    key CustomerID      : UUID; // Unique Customer Identifier
        CustomerName    : String(100); // Customer's full name
        CustomerAddress : String(255); // Customer's address
        CustomerGSTIN   : String(15); // Customer's GSTIN
        ContactNumber   : String(15); // Customer's contact number
        EmailAddress    : String(100); // Customer's email address
}

entity Supplier {
    key SupplierID      : UUID; // Unique Supplier Identifier
        SupplierName    : String(100); // Supplier's name
        SupplierGSTIN   : String(15); // Supplier's GSTIN
        SupplierAddress : String(255); // Supplier's address
        ContactNumber   : String(15); // Supplier's contact number
        EmailAddress    : String(100); // Supplier's email address
}
