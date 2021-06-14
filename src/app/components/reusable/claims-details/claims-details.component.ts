import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/services/Claim';
import { ClaimDetails } from 'src/app/services/ClaimDetails';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-claims-details',
  templateUrl: './claims-details.component.html',
  styleUrls: ['./claims-details.component.scss']
})
export class ClaimsDetailsComponent implements OnInit {
  claimDetails:ClaimDetails;
  claimId:string;
  constructor(public supplierService: SupplierService, 
    private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.claimId=this.procureCacheService.getClaimId();
    this.supplierService.getClaimsDetails(this.claimId).subscribe((response: SupplierDataModel) => {
      console.log(response.data);
      this.claimDetails=response.data;
    });
  }

}
