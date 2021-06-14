import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { WorkCompletionDetailsComponent } from 'src/app/components/reusable/work-completion-details/work-completion-details.component';
// import { WorkCompletionDtls } from 'src/app/services/WorkCompletion';
// import { BOQDetails } from 'src/app/services/BOQDetails';
import { VariationOrderBOQDtl } from 'src/app/services/VariationOrderBOQDtl';
import { AttachSectionComponent } from '../../reusable/attach-section/attach-section.component';

@Component({
  selector: 'app-milestone-completion-details',
  templateUrl: './milestone-completion-details.component.html',
  styleUrls: ['./milestone-completion-details.component.scss']
})
export class MilestoneCompletionDetailsComponent implements OnInit {
  @ViewChild(AttachSectionComponent) attachSectionChild:AttachSectionComponent;
  @ViewChild(WorkCompletionDetailsComponent) workCompletionDtlsChild:WorkCompletionDetailsComponent;
  type: string;
  message: string;
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  paymentMilestoneBOQList: VariationOrderBOQDtl[];
  boqList: VariationOrderBOQDtl[]=[];
  paymentMilestoneBOQ: VariationOrderBOQDtl;
  moduleTxnId:string;
  moduleName:string; 


  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.moduleTxnId=null;
    this.moduleName="Certificate";
    this.supplierService.getPaymentMilestoneBOQDetails(this.procureCacheService.getContractId(), this.langId, this.supplierId).subscribe((response: SupplierDataModel) => {
      console.log(response);
      this.paymentMilestoneBOQList = response.data;
      console.log(this.paymentMilestoneBOQList);
    })
  }

  saveWorkCompletionDetails(){
    console.log(this.workCompletionDtlsChild);
    this.workCompletionDtlsChild.workCompletionDetails.boqId=this.paymentMilestoneBOQ.boqId;
    this.workCompletionDtlsChild.workCompletionDetails.contractId=this.paymentMilestoneBOQ.contractId;
    this.workCompletionDtlsChild.workCompletionDetails.vendorId=this.supplierId;
    this.workCompletionDtlsChild.workCompletionDetails.workCCDocs=new Array<any>();
    if(null!=this.attachSectionChild.supplierAttachmentSection && this.attachSectionChild.supplierAttachmentSection.length>0){
      this.attachSectionChild.supplierAttachmentSection.forEach(element => {
        this.workCompletionDtlsChild.workCompletionDetails.workCCDocs.push(element);
      });;
    }
    
    this.supplierService.saveWorkCompletionDetails(this.workCompletionDtlsChild.workCompletionDetails)
    .subscribe((data: SupplierDataModel) => {
      if (data == null || data == undefined|| data.status != "OK") {
        this.type = 'danger';
        this.message = 'Failed to save the supplier information';
        return;
      }
      this.type = 'success';
      this.message = data.message;
      console.log(data);
    });
    document.getElementById("msgAlert").scrollIntoView();
  }

  onMilestoneChange(boq:any){    
    console.log(boq);
    this.boqList=[];
    this.boqList.push(boq);    
  }

  close(){
    this.type = null;
  }
  
}
