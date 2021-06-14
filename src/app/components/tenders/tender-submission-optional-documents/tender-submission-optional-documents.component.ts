import { Component, Input, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderDoc } from 'src/app/services/TenderDoc';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}
@Component({
  selector: 'app-tender-submission-optional-documents',
  templateUrl: './tender-submission-optional-documents.component.html',
  styleUrls: ['./tender-submission-optional-documents.component.scss']
}) 
export class TenderSubmissionOptionalDocumentsComponent implements OnInit {
  @Input() tenderDtls:TenderDetails;
  @Input() altProp:any;
  @Input() tenderMode:number;
  @Input() isInvited:boolean;
  @Input() isScopeOne:boolean;
  @Input() isPrequalified:boolean;

  
  tenderOptDocList:TenderDoc[];
  loginObj: any;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  constructor(public supplierService: SupplierService, private procureCacheService: ProcureCacheService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

    this.tenderOptDocList=this.tenderDtls.tenderOptDocList;
  }

   downloadDoc(docId:string,docName:string,docFileType:string,docType:string){
    console.log('docId : docName : docFileType :docType-->'+docId+' : '+docName+':'+docFileType+' : '+docType);
    this.attachmentService.downloadTenderSubmissionDocs(this.supplierId,docId,docName,docType) 
    .subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    });
  }
  deleteDoc(docId:string,docType:string,docFlag:string,check:string,docDesc:string){
    console.log(docId+' : '+docType+' : '+docFlag+' : '+check+' : '+docDesc);
    this.supplierService.deleteTenderSubmissionDocs(this.supplierId,this.tenderDtls.tenderMaster.tender_id,
      docId,docType,docFlag,check,docDesc)
    .subscribe((data:SupplierDataModel)=>{
        this.tenderDtls.tenderOptDocList = data.data.tenderOptDocList;
				this.tenderDtls.optDocUploadCheck = data.data.optDocUploadCheck;

    });
  }
}
