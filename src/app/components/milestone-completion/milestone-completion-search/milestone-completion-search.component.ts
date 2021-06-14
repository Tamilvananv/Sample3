import { Component, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-milestone-completion-search',
  templateUrl: './milestone-completion-search.component.html',
  styleUrls: ['./milestone-completion-search.component.scss']
})
export class MilestoneCompletionSearchComponent implements OnInit {
  loginObj: any;
  supplierId: string;
  loginUserID: string;
  langId: string;
  awardedContractsList: Array<any>;
  contractId: string;

  constructor(private supplierService: SupplierService,
    private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.langId = this.loginObj.langId;
    this.supplierService.getCompletionSearchList(this.langId,this.supplierId).
    subscribe((response:SupplierDataModel)=> {
      console.log(response);
      this.awardedContractsList = response.data;
    });
  }
  getContractDetails(contract) {
    console.log(contract);
    this.contractId = contract.contractId;
    this.procureCacheService.setContractId(this.contractId);
  }

}
