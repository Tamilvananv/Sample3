import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-public-tender-details',
  templateUrl: './public-tender-details.component.html',
  styleUrls: ['./public-tender-details.component.scss']
})
export class PublicTenderDetailsComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  tenderDtls: any;
  tabName: string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.tabName = 'publicTenderDetails';
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

    this.supplierService.getTenderDtls(this.supplierId, this.procureCacheService.getTenderId())
      .subscribe((data: SupplierDataModel) => {
        this.tenderDtls = data.data;
        console.log(this.tenderDtls);
      });
  }
}


