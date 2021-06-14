import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';

@Component({
  selector: 'app-claim-search-details',
  templateUrl: './claim-search-details.component.html',
  styleUrls: ['./claim-search-details.component.scss']
})
export class ClaimSearchDetailsComponent implements OnInit {
  langId: string;
  claimCategoryDropdownValues: any;
  claimPriorityDropdownValues: any;
  claimTypeDropdownValues: any;
  claimSearchDetailData = {
    contractNumber: null,
    claimSubmittedDate: null,
    claimCategory: null,
    claimPriority: null,
    claimType: null,
    totalClaimedTime: null,
    totalClaimedAmount: null,
    claimTypeText: null
  }
    

  loginObj: any;

  constructor(public supplierService: SupplierService, public procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.langId = this.loginObj.langId;

    this.supplierService.getClaimCategoryDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
      this.claimCategoryDropdownValues = data.data;
      console.log(this.claimCategoryDropdownValues);
      
    })

    this.supplierService.getClaimPriorityDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
      this.claimPriorityDropdownValues = data.data;
      console.log(this.claimPriorityDropdownValues);
      
    })

    this.supplierService.getClaimTypeDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
      this.claimTypeDropdownValues = data.data;
      console.log(this.claimTypeDropdownValues);
      
    })
  }

  sendClaimDetails() {
    console.log(this.claimSearchDetailData);
    
    this.procureCacheService.setClaimDetails(this.claimSearchDetailData);
  }

}
