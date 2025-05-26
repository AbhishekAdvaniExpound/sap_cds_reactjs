using kashflow from '../db/kashflow-model';

@path: 'kashflow'
service KashFlowService {
    entity Invoices as projection on kashflow.Invoice;

    action syncInvoices() returns {
        success : Boolean;
        count   : Integer;
    };
}
