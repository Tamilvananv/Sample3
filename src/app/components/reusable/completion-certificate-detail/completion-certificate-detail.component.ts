import { Component, OnInit } from '@angular/core';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { isNullOrUndefined } from 'src/app/tools';


@Component({
  selector: 'app-completion-certificate-detail',
  templateUrl: './completion-certificate-detail.component.html',
  styleUrls: ['./completion-certificate-detail.component.scss']
})
export class CompletionCertificateDetailComponent implements OnInit {
  loginObj: any;
  langId: string;
  invoiceId: string;
  supplierId: string;
  completionCertificateDetails: Array<any>;

  constructor( public supplierService: SupplierService, public procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.langId = this.loginObj.langId;
    this.invoiceId = this.procureCacheService.getInvoiceId();
    // this.contractId = this.loginObj.supplierId; 
    this.supplierId = this.loginObj.supplierId;

    this.supplierService.getCompletionCertificateDetails(this.invoiceId, this.langId,this.supplierId).subscribe((data) => {
      if(!isNullOrUndefined(data)) {
        this.completionCertificateDetails = data.data;        
        console.log(this.completionCertificateDetails);
      }

      
    })
  }

}
