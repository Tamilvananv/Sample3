import { Component, HostListener, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierAttachmentSection } from '../../../services/SupplierAttachmentSection';
import { SupplierInformationDropdownList } from '../../../services/SupplierInformationDropdownList';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { saveAs } from 'file-saver';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { ViewportScroller } from '@angular/common';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-attachment-details',
  templateUrl: './attachment-details.component.html',
  styleUrls: ['./attachment-details.component.scss']
})

export class AttachmentDetailsComponent implements OnInit {
  type: string;
  message: string;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  docsDesc: string;
  docsCategory: string;
  langId: string;
  loginObj: any;
  fileName: string;

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
    moduleTxnId: null
  };
  disableButtons: boolean;
  disableProgressTab: boolean;
  supplierInformationDropdownList: SupplierInformationDropdownList;
  masterData: any = {};
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  preQualificationStatus: string;
  tabName: string;
  isAlreadySaved: boolean;
  pageYoffset: number;

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
 }

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient, private procureCacheService: ProcureCacheService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.tabName = "supplierAttachment";
    this.isAlreadySaved = false;
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.disableButtons = false;
    this.disableProgressTab = false;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }
    this.preQualificationStatus = this.procureCacheService.getPrequalificationStatus();

    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualificationStatus == '7001') {
      this.disableButtons = true;
    }

    this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.supplierInformationDropdownList = data.data;
      console.log(this.supplierInformationDropdownList);

    })

    this.attachmentService.getSupplierAttachmentsDetails(this.supplierId, this.supplierId, 'attachment').then((data: SupplierDataModel) => {

      this.supplierAttachmentSection = data.data;
      this.masterData = JSON.parse(JSON.stringify(data.data));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
        this.isAlreadySaved = true;
      }
      if (+this.recCount > 0) {
        this.supplierAttachmentSection = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }

    })


  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.supplierAttachmentSection = {
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
      moduleTxnId: null
    };

    if (this.activePage == 1) {
      this.supplierAttachmentSection = this.masterData.slice(0, this.recCount);
    } else {
      this.supplierAttachmentSection = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.supplierAttachmentSection);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.supplierAttachmentSection = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  uploadDocument(event, docDesc, docCategory, supplierAttachmentForm) {
    console.log(event, docDesc, docCategory);
    let selectedfiles = event.target.files[0];
    this.fileName = selectedfiles.name;

    let type = selectedfiles.type;
    let size = selectedfiles.size;
    console.log(name, type, size);

    let userId = this.loginUserID;

    const formData: FormData = new FormData();
    formData.append('file', selectedfiles);

    // this.httpClient.post(this.apiURL + '/spmAttachment/docs/upload/' + this.supplierId + "/" + docCategory + "/" + docDesc + "/" + userId, formData)
    //   .subscribe((data: SupplierDataModel) => {
    //     this.message = data.message;
    //     this.supplierAttachmentSection = data.data
    //   });


    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.attachmentService.uploadDocument(docDesc, type, this.supplierId, "attachment", this.loginUserID, formData, docCategory).subscribe((data: SupplierDataModel) => {
          if (data.status != 'OK') {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.type = 'success';
          this.message = data.message;
          this.supplierAttachmentSection = data.data;
          supplierAttachmentForm.reset();
          this.fileName = '';
          this.masterData = [];
          this.masterData = JSON.parse(JSON.stringify(this.supplierAttachmentSection));

          if (this.masterData.length > 0) {
            this.recCount = 5;
            this.totalRecordsCount = this.masterData.length;
            this.isAlreadySaved = true;
          }
          if (+this.recCount > 0) {
            this.supplierAttachmentSection = this.masterData.slice(0, +this.recCount);
            this.activePage = 1;
          }
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);

        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }

    });
  }

  downloadDocument(docName) {
    this.attachmentService.downloadDocuments(docName, 'attachment',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }

  deleteSelectedAttachmentDetails($event, supplierinfo) {
    console.log(supplierinfo);

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.attachmentService.deleteAttachment(supplierinfo.documentId,
          supplierinfo.moduleName, supplierinfo.supplierId).subscribe((data => {
            if (data.status != 'OK') {
              this.type = 'danger';
              this.message = data.message;
              this.scroll.scrollToPosition([0, 0]);
              return;
            }
            this.type = 'success';
            this.message = data.message;
            this.supplierAttachmentSection = data.data;
            this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
          }))
          this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });


  }

  goToPreviousComponent() {
    if (this.procureCacheService.getPrequalificationStatus() !== '7003') {
      this.router.navigate(['/supplier-category-scope']);
    } else {
      this.router.navigate(['/supplier-bank-details']);
    }

  }

  goToNextComponent() {
    this.router.navigate(['/preview']);
  }

  close(){
    this.type = null;
  }
  
}
