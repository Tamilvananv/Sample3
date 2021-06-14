import { Component, Input, OnInit } from '@angular/core';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderDoc } from 'src/app/services/TenderDoc';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-optional-documents',
  templateUrl: './optional-documents.component.html',
  styleUrls: ['./optional-documents.component.scss']
})
export class OptionalDocumentsComponent implements OnInit {
  @Input() tenderDtls:TenderDetails;
  @Input() altProp:any;
  @Input() tenderMode:number;
  @Input() isInvited:boolean;
  @Input() isScopeOne:boolean;
  @Input() isPrequalified:boolean;

  supplierAttachmentSection: SupplierAttachmentSection = {
    documentDescription: null,
    documentFlag: null,
    documentId: null,
    documentName: null,
    documentPath: null,
    documentType: null,
    modifiedDate: null,
    moduleId: null,
    moduleName: null,
    supplierId: null,
    uploadDate: null,
    userId: null,
    userName: null,
    vendorId: null,
    moduleTxnId:null
  };
  optDocTypes:any;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  documentDesc: string;
  documentType: string;
  langId: string;
  loginObj: any;
  fileName: string;
  type: string;
  message: string;
  tenderOptDocList:TenderDoc[];

  constructor(public supplierService: SupplierService, private procureCacheService: ProcureCacheService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

    

    this.supplierService.getLov(this.langId, "9010").subscribe((optDocCategory: SupplierDataModel) => {
      this.optDocTypes = optDocCategory.data.filter(i => i.lovId !== "9013");
      console.log(this.optDocTypes);
      
    });


  }

  uploadOptDocument(event,docCategory:string,docDesc:string,
    successMsg:string,info:string,ok:string,errMsg:string){
    let selectedfiles = event.target.files[0];
    console.log(selectedfiles);
    
    //this.fileName = selectedfiles.name;
    let type = selectedfiles.type;
    let size = selectedfiles.size;
    const formData: FormData = new FormData();
    formData.append('files', selectedfiles);
    
    this.attachmentService.uploadOptTenderDoc(this.supplierId,this.loginUserID,
      this.tenderDtls.tenderMaster.tender_id,this.tenderDtls.tenderMaster.referenceNumber,docCategory,docDesc,formData)
      .subscribe((data: SupplierDataModel) => {
        console.log(data);
        this.tenderDtls.tenderOptDocList = data.data.tenderOptDocList;
        this.tenderOptDocList= data.data.tenderOptDocList;
        this.documentDesc="";
        this.documentType="";
       // this.tenderDtls.optDocUploadCheck=data.data.optDocUploadCheck;
        //this.tenderDtls.tenderMaster.tenderSubmissionStatus=data.data.tenderVendorStatusName;
				this.tenderDtls.isEdmsExpOccured = data.data.isEdmsExpOccured;
					// if(this.tenderDtls.isEdmsExpOccured){
					// show modal with errMsg
					// this.checkOk="6";}
    });      
  }
}
