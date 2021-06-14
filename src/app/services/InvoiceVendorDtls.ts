import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceCompletionCertificateMapping } from "./InvoiceCompletionCertificateMapping";

export class InvoiceVendorDtls {
    invoiceDetails:InvoiceDetails;
    invoiceWorkMappingList:Array<InvoiceCompletionCertificateMapping>;
    invDocs:Array<any>;
} 