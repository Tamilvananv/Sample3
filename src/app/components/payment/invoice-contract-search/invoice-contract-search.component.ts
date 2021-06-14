import { Component, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-invoice-contract-search',
  templateUrl: './invoice-contract-search.component.html',
  styleUrls: ['./invoice-contract-search.component.scss']
})
export class InvoiceContractSearchComponent implements OnInit {
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
