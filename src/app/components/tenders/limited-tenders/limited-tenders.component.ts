import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderMaster } from 'src/app/services/TenderMaster';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-limited-tenders',
  templateUrl: './limited-tenders.component.html',
  styleUrls: ['./limited-tenders.component.scss']
})
export class LimitedTendersComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  tenderMasterList: TenderMaster[];
  tenderMasterSearch: TenderMaster=new TenderMaster();
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  
  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.tenderMasterSearch.supplierId=this.supplierId;
    
    this.supplierService.getTenders(this.supplierId,'newtenders')
        .subscribe((data: SupplierDataModel) => {
      this.tenderMasterList = data.data;
      console.log(this.tenderMasterList);
      this.masterData = JSON.parse(JSON.stringify(this.tenderMasterList));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.tenderMasterList = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }

    });
  }

  /* cacheTenderId(tenderId:string){
    this.procureCacheService.setTenderId(tenderId);
  } */
  cacheTenderMaster(tenderMaster:TenderMaster){
    this.procureCacheService.setTenderId(tenderMaster.tender_id);
    this.procureCacheService.setTenderMaster(tenderMaster);
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.tenderMasterList = [];

    if (this.activePage == 1) {
      this.tenderMasterList = this.masterData.slice(0, this.recCount);
    } else {
      this.tenderMasterList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.tenderMasterList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.tenderMasterList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }
}
