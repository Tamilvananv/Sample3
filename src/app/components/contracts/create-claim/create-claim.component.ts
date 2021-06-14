import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ClaimDetails } from 'src/app/services/ClaimDetails';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { AttachSectionComponent } from '../../reusable/attach-section/attach-section.component';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss']
})
export class CreateClaimComponent implements OnInit {
  @ViewChild(AttachSectionComponent) attachSectionChild:AttachSectionComponent;
  type: string;
  message: string;
  moduleTxnId:string;
  moduleName:string;
  loginObj: any;
  langId: string;
  contractId: string;
  supplierId: string;
  claimTypes:string;
  claimCategories:string;
  priorities:string;
  claimDtl:ClaimDetails;
  
  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.langId = this.loginObj.langId;
    // this.invoiceId = this.loginObj.supplierId;
    this.supplierId = this.loginObj.supplierId;
    this.contractId = this.procureCacheService.getContractId();
    this.claimDtl=new ClaimDetails();
    this.claimDtl.priority=null;
    this.claimDtl.claimCategory=null;
    this.claimDtl.claimType=null;
    this.moduleTxnId=null;
    this.moduleName="Claims";
    this.attachmentService.deleteAllUnusedModuleDocs(this.supplierId,this.supplierId,'Claims')
    .subscribe((data:SupplierDataModel)=>{
      console.log(data);
    });
    this.supplierService.getLov(this.langId, "9981").subscribe((lovData: SupplierDataModel) => {
      this.priorities = lovData.data;
      console.log(this.priorities);
      
    });
    this.supplierService.getLov(this.langId, "9984").subscribe((lovData: SupplierDataModel) => {
      this.claimCategories = lovData.data;
      console.log(this.claimCategories);
      
    });
    this.supplierService.getLov(this.langId, "9987").subscribe((lovData: SupplierDataModel) => {
      this.claimTypes = lovData.data;
      console.log(this.claimTypes);
      
    });
  }

  changeClaimsSubmittedDateFormat(event){  
    var date;
    if(moment(this.claimDtl.submittedDate, 'DD-MMM-YYYY',true).isValid()){
      date = moment(this.claimDtl.submittedDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    }else{
      date = moment(this.claimDtl.submittedDate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    } 
    
    this.claimDtl.submittedDate=date;
    console.log(this.claimDtl.submittedDate);  
  }

  saveClaimDetails(){

    console.log(this.claimDtl);
    
    this.claimDtl.claimDocs=new Array<any>();
    if(null!=this.attachSectionChild.supplierAttachmentSection && this.attachSectionChild.supplierAttachmentSection.length>0){
      this.attachSectionChild.supplierAttachmentSection.forEach(element => {
        this.claimDtl.claimDocs.push(element);
      });;
    }
    this.claimDtl.contractId=this.contractId;
    this.claimDtl.userId=this.loginObj.loginUserID;
    this.supplierService.saveClaimDetails(this.claimDtl,this.supplierId).subscribe((data: SupplierDataModel) => {
      
      
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

  close() {
    this.type = null;
  }
}
