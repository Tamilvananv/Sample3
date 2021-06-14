import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../supplier/model/SupplierDataModel';
import { AuthenticationService, UserService, SharedService } from '@app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  username: string;
  loginObj: any;
  dashboardMenuItems: any;

  constructor(private route: ActivatedRoute, private router: Router,
    public supplierService: SupplierService, private procureCacheService: ProcureCacheService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.username = this.loginObj.username;
    setTimeout(() => {
      console.log("Dashboard Menu Data : ", this.sharedService.menuList);
      this.dashboardMenuItems = this.sharedService.menuList;

    }, 1000);

    /* this.supplierService.getPreQualificationScorecard(this.procureCacheService.getSupplierId()).subscribe((preQualificationData: SupplierDataModel) => {
       this.procureCacheService.setPrequalificationStatus(preQualificationData.data.qualificationStatus);
       console.log(preQualificationData.data.qualificationStatus);
     });*/
  }

}
