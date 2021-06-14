import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VariationOrderBOQDtl } from 'src/app/services/VariationOrderBOQDtl';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-payment-milestone-boq',
  templateUrl: './payment-milestone-boq.component.html',
  styleUrls: ['./payment-milestone-boq.component.scss']
})
export class PaymentMilestoneBoqComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  isAlreadySaved: boolean;
  @Input('boqDtlList') boqDtlList: VariationOrderBOQDtl[];
  variationOrderId: string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    const contractId = this.procureCacheService.getContractId();
    console.log(this.boqDtlList);
    // this.variationOrderId = this.procureCacheService.getVariationOrderId();
    //boqId
    // this.supplierService.getVariationOrderPaymentMilestoneBOQList(this.variationOrderId,this.supplierId)
    //     .subscribe((data: SupplierDataModel) => {
    //   this.boqDtlList = data.data;     
    // });
    // this.supplierService.getCompletionCertificateBOQDetails(contractId).subscribe((data: SupplierDataModel) => {
    //   this.boqDtlList = data.data.paymentMileStoneOrBOQList;
    // });
  }
  ngOnChanges() {
    // console i never see
    console.log(this.boqDtlList);
  }

}
