import { Component, OnInit } from '@angular/core';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';

@Component({
  selector: 'app-contract-information-details',
  templateUrl: './contract-information-details.component.html',
  styleUrls: ['./contract-information-details.component.scss']
})

export class ContractInformationDetailsComponent implements OnInit {

  contractId: string;
  langId: string;
  contractInformation = {
    contractNumber: null,
    contractStatus: null,
    awardedContractValue: null,
    revisionNumber: null,
    contractDesc: null,
    awardedContractDate: null,
    awardedContractFromDate: null,
    awardedContractToDate: null,
    contractPeriod: null,
    coordinator: null,
    rtaLiaisonOfficer: null,
    mainType: null,
    subType: null,
    agency: null,
    department: null,
    section: null
  };
  // contractInfoArr: any;
  constructor(private procureCacheService: ProcureCacheService, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.contractId = this.procureCacheService.getContractId();
    this.langId = this.procureCacheService.getLangId();

    console.log(this.contractId);
    console.log(this.langId);
    
    this.supplierService.getContractInformation(this.contractId, this.langId).subscribe((response: SupplierDataModel) => {
      console.log(response);
      if(!isNullOrUndefined(response) && !isNullOrUndefined(response.data)) {
        this.contractInformation = response.data;
        console.log(this.contractInformation);
      }
    });
  }


}
