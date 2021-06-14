import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BOQDetails } from 'src/app/services/BOQDetails';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-boq-details',
  templateUrl: './boq-details.component.html',
  styleUrls: ['./boq-details.component.scss']
})
export class BoqDetailsComponent implements OnInit {
@Input() tenderDtls:TenderDetails;
  @Input ()boqDetailsList:BOQDetails[];
  @Input () boqProjectCost:number;
  
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  loginObj: any;
  
  constructor(public supplierService: SupplierService, 
    private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

    console.log(this.tenderDtls.boqDetailsList);
    if (this.tenderDtls.boqProjectCost==null) this.tenderDtls.boqProjectCost=0;
  }
  changeAmount(boq:BOQDetails){
    boq.amount=boq.rate*boq.quantity;
    var totalProjectCost = 0;
    var total = "0";
    this.tenderDtls.boqDetailsList.forEach(boq => {
      totalProjectCost = totalProjectCost + Number(boq.amount);
    })
    this.tenderDtls.boqProjectCost=totalProjectCost;

  }
  
    saveBoQDetails(){
      this.tenderDtls.tenderId=this.tenderDtls.tenderMaster.tender_id;
      this.tenderDtls.boqDetailsList=this.boqDetailsList;
      this.tenderDtls.boqProjectCost=this.boqProjectCost;
      console.log(this.tenderDtls);
      this.supplierService.saveBoQDetails(this.supplierId,'file',this.tenderDtls)
      .subscribe((data: SupplierDataModel) => {
        console.log(data);
      });
    }

  }

