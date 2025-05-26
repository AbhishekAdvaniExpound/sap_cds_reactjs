namespace kashflow;

entity Invoice {
    key id              : Integer;
        number          : Integer;
        issuedDate      : DateTime;
        dueDate         : DateTime;
        customerName    : String;
        customerCode    : String;
        customerId      : Integer;
        grossAmount     : Decimal(15, 2);
        netAmount       : Decimal(15, 2);
        vatAmount       : Decimal(15, 2);
        totalPaidAmount : Decimal(15, 2);
        status          : String;
        currencyCode    : String;
        currencyName    : String;
        exchangeRate    : Decimal(10, 4);
}
