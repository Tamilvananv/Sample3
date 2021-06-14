import { Component, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { isNullOrUndefined } from 'src/app/tools';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  //@ViewChild(InvoicedetailsComponent) invDtls:InvoicedetailsComponent;

  moduleTxnId:string;
  moduleName:string;
  loginObj: any;
  langId: string;
  contractId: string;
  supplierId: string;
  invoiceDetails = {
    description: null,
    finalPayment: null,
    invoiceAmount: null,
    invoiceDate: null,
    invoiceNo: null,
    paymentType: null,
    status: null,
    totalAmount: null,
    userId: null,
    vatAmount: null,
    vendorId: null,
    workCompletedDate: null
  };
  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.langId = this.loginObj.langId;
    // this.invoiceId = this.loginObj.supplierId;
    this.supplierId = this.loginObj.supplierId;
    this.contractId = this.procureCacheService.getContractId();
    const invoiceId = this.procureCacheService.getInvoiceId();
    this.moduleName="Invoice";
    this.moduleTxnId=invoiceId;
    // this.supplierService.getCompletionCertificateInvoiceDetails(this.contractId, this.langId, this.supplierId).subscribe((data: SupplierDataModel) => {
    this.supplierService.getWorkCompletionCertificates(invoiceId,this.langId).subscribe((data)=>{  
    console.log(data);  
      
      if(!isNullOrUndefined(data.data)) {
        this.invoiceDetails = data.data;
        console.log(this.invoiceDetails);
      }

    })
  }

}
