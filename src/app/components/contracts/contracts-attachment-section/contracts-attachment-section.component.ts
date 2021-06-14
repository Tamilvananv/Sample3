import { Component, Input, OnInit } from '@angular/core';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { saveAs } from 'file-saver';
import { SupplierInformationDropdownList } from 'src/app/services/SupplierInformationDropdownList';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-contracts-attachment-section',
  templateUrl: './contracts-attachment-section.component.html',
  styleUrls: ['./contracts-attachment-section.component.scss']
})
export class ContractsAttachmentSectionComponent implements OnInit {
  @Input() moduleTxnId;
  contractAttachmentSection: SupplierAttachmentSection = {
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
    moduleTxnId:null,
  };
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
    console.log('moduleTxnId: --> '+this.moduleTxnId);
    this.supplierId = this.procureCacheService.getSupplierId();
    this.langId = this.procureCacheService.getLangId();
    this.loginUserID = this.procureCacheService.getLoginUserID();
    this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.supplierInformationDropdownList = data.data;
    });
    this.getDocuments();
  }

  getDocuments(){
    this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, 'contracts',this.moduleTxnId).subscribe((data: SupplierDataModel) => {
      this.contractAttachmentSection = data.data;      
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

    this.attachmentService.uploadTxnDocument(docDesc, type, this.supplierId,this.moduleTxnId, "contracts", this.loginUserID, formData).subscribe((data: SupplierDataModel) => {
      if (data.status != 'OK') {
        this.type = 'error';
        this.message = data.message;
        return;
      }
      this.type = 'success';
      this.message = data.message;
      this.contractAttachmentSection = data.data
    });
  }

  downloadDocument(docName) {
    this.attachmentService.downloadDocuments(docName, 'contracts',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }
  deleteSelectedAttachmentDetails($event, contractAttachment) {
    console.log(contractAttachment);
    // contractAttachment.moduleId, 
    this.attachmentService.deleteAttachment(contractAttachment.documentId,
      contractAttachment.moduleName, contractAttachment.supplierId).subscribe((data => {
        if (data.status != 'OK') {
          this.type = 'error';
          this.message = data.message;
          return;
        }
        this.type = 'success';
        this.message = data.message;
        this.contractAttachmentSection = data.data
      })) 
  }
}
