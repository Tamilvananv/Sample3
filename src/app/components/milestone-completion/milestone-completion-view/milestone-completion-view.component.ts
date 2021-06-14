import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VariationOrderBOQDtl } from 'src/app/services/VariationOrderBOQDtl';
import { WorkCompletionDtls } from 'src/app/services/WorkCompletion';
import { WorkCompletionViewComponent } from '../../reusable/work-completion-view/work-completion-view.component';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-milestone-completion-view',
  templateUrl: './milestone-completion-view.component.html',
  styleUrls: ['./milestone-completion-view.component.scss']
})
export class MilestoneCompletionViewComponent implements OnInit,AfterViewInit {
  //@ViewChild(WorkCompletionViewComponent) workCompletionViewChild:WorkCompletionViewComponent;
  workCompletionDetails :WorkCompletionDtls;
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  paymentMilestoneBOQList: VariationOrderBOQDtl[];
  boqList: VariationOrderBOQDtl[]=[];
  paymentMilestoneBOQ: VariationOrderBOQDtl;
  moduleTxnId:string;
  boqId:string;
  moduleName:string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  

  ngAfterViewInit(): void {
    // if(this.workCompletionViewChild.workCompletionDetails!==null){
    //   this.moduleTxnId=this.workCompletionViewChild.workCompletionDetails.workId;
    // this.supplierService.getPaymentMilestoneBOQDetails(this.procureCacheService.getContractId(), this.langId, this.supplierId).subscribe((response: SupplierDataModel) => {
    //   console.log(response);
    //   this.paymentMilestoneBOQList = response.data;
    //   console.log(this.paymentMilestoneBOQList);
    //   this.boqList=this.paymentMilestoneBOQList.filter((boq)=>boq.boqId==this.workCompletionViewChild.boqId);
    // })
    // }    
  }
  

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.moduleName="Certificate";
    const ccRefNo = this.procureCacheService.getCompletionCertificateRefNo();
    console.log(ccRefNo);
    this.supplierService.getWorkCompletionDetails(ccRefNo).subscribe((data: SupplierDataModel) => {
      console.log(data);
      this.workCompletionDetails = data.data;
      this.boqId=this.workCompletionDetails.boqId;
      if(this.workCompletionDetails!==null){
        this.moduleTxnId=this.workCompletionDetails.workId;
      this.supplierService.getPaymentMilestoneBOQDetails(this.procureCacheService.getContractId(), this.langId, this.supplierId).subscribe((response: SupplierDataModel) => {
        console.log(response);
        this.paymentMilestoneBOQList = response.data;
        console.log(this.paymentMilestoneBOQList);
        this.boqList=this.paymentMilestoneBOQList.filter((boq)=>boq.boqId==this.boqId);
      })
      }
    })
    
  }
  // ngAfterViewInit() {
  //   this.boqList=this.paymentMilestoneBOQList.filter((boq)=>boq.boqId==this.workCompletionViewChild.boqId);
  // }

}
