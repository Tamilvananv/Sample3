import { Component, Input, OnInit } from '@angular/core';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { SupplierInformationDropdownList } from 'src/app/services/SupplierInformationDropdownList';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-attach-section',
  templateUrl: './attach-section.component.html',
  styleUrls: ['./attach-section.component.scss']
})
export class AttachSectionComponent implements OnInit {
  @Input() moduleTxnId;
  @Input() moduleName;
  supplierAttachmentSection: SupplierAttachmentSection[] = [];

  supplierInformationDropdownList: SupplierInformationDropdownList;
  type: string;
  message: string;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  documentDesc: string;
  documentCategory: string;
  langId: string;
  loginObj: any;
  fileName: string;

  constructor(public supplierService: SupplierService, public procureCacheService: ProcureCacheService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    console.log(this.moduleTxnId);
    
    this.supplierId = this.procureCacheService.getSupplierId();
    this.langId = this.procureCacheService.getLangId();
    this.loginUserID = this.procureCacheService.getLoginUserID();
    this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, this.moduleName,this.moduleTxnId).subscribe((data: SupplierDataModel) => {

      this.supplierAttachmentSection = data.data;

      this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

        this.supplierInformationDropdownList = data.data;
      })
    })
  }

  uploadDocument(event, docDesc, docCategory) {
    console.log(event, docDesc, docCategory);

    let selectedfiles = event.target.files[0];
    this.fileName = selectedfiles.name;

    let type = selectedfiles.type;
    let size = selectedfiles.size;
    console.log(name, type, size);

    // let userId = this.loginUserID;

    const formData: FormData = new FormData();
    formData.append('file', selectedfiles);

    // this.httpClient.post(this.apiURL + '/spmAttachment/docs/upload/' + this.supplierId + "/" + docCategory + "/" + docDesc + "/" + userId, formData)
    //   .subscribe((data: SupplierDataModel) => {
    //     this.message = data.message;
    //     this.supplierAttachmentSection = data.data
    //   });
    if (this.moduleTxnId!=null){
      this.attachmentService.uploadTxnDocument(docDesc, type, this.supplierId, this.moduleTxnId,this.moduleName, this.loginUserID, formData,this.documentCategory).subscribe((data: SupplierDataModel) => {
        if (data.status != 'OK') {
          this.type = 'error';
          this.message = data.message;
          return;
        }
        this.type = 'success';
        this.message = data.message;
        this.supplierAttachmentSection = data.data
      });
    }else{
      this.attachmentService.uploadDocument(docDesc, type, this.supplierId, this.moduleName, this.loginUserID, formData,this.documentCategory).subscribe((data: SupplierDataModel) => {
        if (data.status != 'OK') {
          this.type = 'error';
          this.message = data.message;
          return;
        }
        this.type = 'success';
        this.message = data.message;
        this.supplierAttachmentSection = data.data
      });
    }
    
  }

  downloadDocument(docName) {
    this.attachmentService.downloadDocuments(docName, 'Certificate',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }
  deleteSelectedAttachmentDetails($event, supplierinfo) {
    console.log(supplierinfo);
    this.attachmentService.deleteAttachment(supplierinfo.documentId,
      supplierinfo.moduleId, supplierinfo.moduleName, supplierinfo.supplierId).subscribe((data => {
        if (data.status != 'OK') {
          this.type = 'error';
          this.message = data.message;
          return;
        }
        this.type = 'success';
        this.message = data.message;
        this.supplierAttachmentSection = data.data
      }))
  }
}
