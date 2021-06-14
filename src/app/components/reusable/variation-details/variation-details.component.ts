import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VariationOrderDtl } from 'src/app/services/VariationOrderDtl';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-variation-details',
  templateUrl: './variation-details.component.html',
  styleUrls: ['./variation-details.component.scss']
})
export class VariationDetailsComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  isAlreadySaved: boolean;
  variationOrderDtl: VariationOrderDtl;
  variationOrderId:string;
  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;
    
    this.variationOrderId = this.procureCacheService.getVariationOrderId();
    console.log(this.variationOrderId);
   // this.supplierService.getVariationOrderDetails(this.variationOrderId).subscribe((data: SupplierDataModel) => {
      this.variationOrderDtl = this.procureCacheService.getVariationOrderDtl();     
   // })
    

  }

}
