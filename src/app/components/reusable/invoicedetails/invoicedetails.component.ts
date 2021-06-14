import { Component, Input, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { isNullOrUndefined } from 'src/app/tools';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.scss']
})
export class InvoicedetailsComponent implements OnInit {
  @Input() invoiceDetails={
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
  // loginObj: any;
  // langId: string;
  // contractId: string;
  // supplierId: string;
  // invoiceDetails = {
  //   description: null,
  //   finalPayment: null,
  //   invoiceAmount: null,
  //   invoiceDate: null,
  //   invoiceNo: null,
  //   paymentType: null,
  //   status: null,
  //   totalAmount: null,
  //   userId: null,
  //   vatAmount: null,
  //   vendorId: null,
  //   workCompletedDate: null
  // };

  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService) { }

  ngOnInit(): void {
    console.log(this.invoiceDetails);
  //   this.loginObj = this.procureCacheService.getLoginObject();
  //   this.langId = this.loginObj.langId;
  //   // this.invoiceId = this.loginObj.supplierId;
  //   this.supplierId = this.loginObj.supplierId;
  //   this.contractId = this.procureCacheService.getContractId();
  //   const invoiceId = this.procureCacheService.getInvoiceId();
  //   // this.supplierService.getCompletionCertificateInvoiceDetails(this.contractId, this.langId, this.supplierId).subscribe((data: SupplierDataModel) => {
  //   this.supplierService.getWorkCompletionCertificates(invoiceId,this.langId).subscribe((data)=>{  
  //   console.log(data);
      
  //     if(!isNullOrUndefined(data.data)) {
  //       this.invoiceDetails = data.data;
  //       console.log(this.invoiceDetails);
  //     }

  //   })
  }

}
