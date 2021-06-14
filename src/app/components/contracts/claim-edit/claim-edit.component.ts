import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { ClaimsDetailsComponent } from '../../reusable/claims-details/claims-details.component';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-claim-edit',
  templateUrl: './claim-edit.component.html',
  styleUrls: ['./claim-edit.component.scss']
})
export class ClaimEditComponent implements OnInit {
 
  contractId: string;
  langId: string;
  userId: string;
  paymentMilestoneBOQ: any;
  supplierId:string;
  moduleTxnId:string;
  moduleName:string;

  constructor(public supplierService: SupplierService, 
    private procureCacheService: ProcureCacheService,private cd: ChangeDetectorRef) { }
  
  

  ngOnInit(): void {
    this.moduleName="Claims";
    this.moduleTxnId=this.procureCacheService.getClaimId();
    console.log(this.moduleTxnId);
    this.contractId = this.procureCacheService.getContractId();
    this.langId = this.procureCacheService.getLangId();
    this.userId = this.procureCacheService.getLoginUserID(); 
    this.supplierId=this.procureCacheService.getSupplierId();
    this.supplierService.getPaymentMilestoneBOQDetails(this.contractId, this.langId, this.supplierId).subscribe((response: SupplierDataModel) => {
      console.log(response);
      this.paymentMilestoneBOQ = response.data; 
      console.log(this.paymentMilestoneBOQ);
    }) 

}
}