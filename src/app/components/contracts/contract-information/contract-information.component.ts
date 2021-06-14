import { OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '../../../data/contact';
import { ContactService } from '../../../services/contact.service';
import { NgbdSortableHeader, SortEvent } from '../../../services/sortable.directive';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { isNull } from 'util';
import { isNullOrUndefined } from 'src/app/tools';

@Component({
  selector: 'app-contract-information',
  templateUrl: './contract-information.component.html',
  styleUrls: ['./contract-information.component.scss']
})
export class ContractInformationComponent implements OnInit {

  contractId: string;
  langId: string;
  userId: string;
  paymentMilestoneBOQ: any;
  type: string;
  message: string;
  supplierId:string;
  // isFormValid: boolean;

  moduleName:string;

  constructor(private procureCacheService: ProcureCacheService, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.moduleName="contracts";
    this.contractId = this.procureCacheService.getContractId();
    this.langId = this.procureCacheService.getLangId();
    this.userId = this.procureCacheService.getLoginUserID();
    this.supplierId = this.procureCacheService.getSupplierId();
    // this.isFormValid = false;
    this.supplierService.getPaymentMilestoneBOQDetails(this.contractId, this.langId, this.supplierId).subscribe((response: SupplierDataModel) => {
      console.log(response);
      this.paymentMilestoneBOQ = response.data;
      console.log(this.paymentMilestoneBOQ);
    })
  }

  close() {
    this.type = null;
  }

   saveContractInformation() {
  //   const claimDetails = this.procureCacheService.getClaimDetails();
  //   console.log(claimDetails);
  //   if(isNullOrUndefined(claimDetails.claimCategory || claimDetails.claimPriority  || claimDetails.claimSubmittedDate ||
  //      claimDetails.claimType  || claimDetails.claimTypeText || claimDetails.contractNumber || claimDetails.totalClaimedAmount ||
  //      claimDetails.totalClaimedTime)) {
  //       // this.isFormValid = false;
  //       this.type = 'info';
  //       this.message = 'Please fill all the fields';
  //       return;
  //      } else {
  //       // this.isFormValid = true;
  //       this.supplierService.saveClaimDetails(claimDetails).subscribe(data =>{
  //         console.log(data);
  //         if(data.status != 'OK') {
  //           this.type = 'error';
  //           this.message = 'Failed to save Contract details';
  //           return;
  //         }
  //         this.type = 'success';
  //         this.message = 'Contract details saved successfully';
  //       })
  //      }
   }
}
