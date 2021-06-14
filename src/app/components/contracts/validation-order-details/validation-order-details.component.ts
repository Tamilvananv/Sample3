import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VariationOrderDtl } from 'src/app/services/VariationOrderDtl';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-validation-order-details',
  templateUrl: './validation-order-details.component.html',
  styleUrls: ['./validation-order-details.component.scss']
})
export class ValidationOrderDetailsComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  isAlreadySaved: boolean;
  variationOrderDtl: VariationOrderDtl;
  variationOrderId:string;
  agreeStatus: boolean;
  paymentMilestoneBOQ: any;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;
    console.log(this.procureCacheService.getVariationOrderDtl());
    console.log('agreestatus: '+this.procureCacheService.getVariationOrderDtl().agreedStatus);
    this.agreeStatus=this.procureCacheService.getVariationOrderDtl().agreedStatus;
    
    this.variationOrderId = this.procureCacheService.getVariationOrderId();
    /* this.supplierService.getVariationOrderDetails(this.variationOrderId).subscribe((data: SupplierDataModel) => {
      this.variationOrderDtl = data.data;     
    })*/
    this.supplierService.getVariationOrderPaymentMilestoneBOQList(this.variationOrderId,this.supplierId)
        .subscribe((data: SupplierDataModel) => {
          this.paymentMilestoneBOQ = data.data;
          console.log(this.paymentMilestoneBOQ);
    }); 

    /* this.onAgreeClick(); */
  }

  onAgreeClick(){
    this.supplierService.variationOrderAgreeCheck(this.variationOrderId)
        .subscribe((data: SupplierDataModel) => {
      this.agreeStatus = data.data;     
    });
  }

}
