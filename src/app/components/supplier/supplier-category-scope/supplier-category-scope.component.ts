import { Component, HostListener, OnInit } from '@angular/core';

import { SupplierService } from '../../../services/supplier.service';
import { SupplierCategoryDetails } from '../../../services/SupplierCategoryDetails';
import { SupplierInformationDropdownList } from '../../../services/SupplierInformationDropdownList';
import { SupplierCategoryDocs } from '../../../services/SupplierCategoryDocs';
import { LovMaster } from '../../../services/LovMaster';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { saveAs } from 'file-saver';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { FinalSupplierModel } from '../model/FinalSupplierModel';
import { CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES, CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES, SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION } from 'src/app/services/ApplicationConstants';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { NgForm } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

declare var $: any;

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-supplier-category-scope',
  templateUrl: './supplier-category-scope.component.html',
  styleUrls: ['./supplier-category-scope.component.scss']
})

export class SupplierCategoryScopeComponent implements OnInit {
  langId: string;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  type: string;
  message: string;
  supplierCategoryDetails: SupplierCategoryDetails[];
  supplierInformationDropdownList: SupplierInformationDropdownList;
  supplierCategoryDocs: SupplierCategoryDocs[];
  parentLovMaster: LovMaster[];
  childLovMaster: LovMaster[];
  childsubLovMaster: LovMaster[];
  popUpData: any;

  formData: FormData;
  selectedfiles: any;

  supplierCategory: SupplierCategoryDetails = {
    supplierId: null,
    categoryId: null,
    parentCategory: null,
    subCategory: null,
    childCategory: null,
    childCategory1: null,
    qualificationStatus: null,
    deleteFlag: null,
    userId: null,
    compId: null,
    submClsfn: null,
    qualificationStatusName: null,
    catDocs: null
  };

  docDesc: string;
  docCategory: string;
  parentCategory: string;
  categoryId: string;
  subCategory: string;
  childCategory: string;
  successStories: any;
  specializedProfiles: any;
  documentCategory;
  loginObj: any;
  username: string;
  isAlreadySaved: boolean;
  fileName: string;
  documentTypeDropdown: Array<any>;
  attachmentDocDetails: any;
  attachmentDocList: Array<any>;
  documentCategoryName: string;
  disableButtons: boolean;
  disableProgressTab: boolean;
  addScopeSelected: boolean;
  finalData: FinalSupplierModel = {
    agreeCheck: null,
    supplierId: null,
    submissionRefNo: null
  };
  prequaliStatus: boolean;
  masterData: any = {};
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  preQualificationStatus: string;
  tabName: string;
  pageYoffset: number;
  attachmentDataNotRetrievedMsg: string;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient, private procureCacheService: ProcureCacheService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {

    this.tabName = "supplierCategory";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.username = this.loginObj.username;
    this.isAlreadySaved = false;
    this.getCategoryDetailsList();
    this.disableButtons = false;
    this.disableProgressTab = false;
    this.addScopeSelected = false;
    this.prequaliStatus = this.procureCacheService.getQualifiedStatus();

    this.attachmentService.deleteAllUnusedModuleDocs(this.supplierId, this.supplierId, 'çategory')
      .subscribe((data: SupplierDataModel) => {
        console.log(data);
      });

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      if (this.prequaliStatus == true) {
        this.disableProgressTab = true;
      }
    } else {
      if (this.prequaliStatus == true) {
        this.disableProgressTab = false;
      }
    }

    if (this.disableProgressTab == false) {
      this.addScopeSelected = true;
    }
    this.preQualificationStatus = this.procureCacheService.getPrequalificationStatus();

    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualificationStatus == '7001') {
      this.disableButtons = true;
    }
  }

  getCategoryDetailsList() {
    this.supplierService.getCategoryDetails(this.supplierId, this.langId).then((data: SupplierDataModel) => {

      this.supplierCategoryDetails = data.data;
      this.masterData = JSON.parse(JSON.stringify(data.data));

      if (this.supplierCategoryDetails.length !== 0) {
        this.isAlreadySaved = true;
      }

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.supplierCategoryDetails = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }

      this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

        this.supplierInformationDropdownList = data.data;
        this.documentCategory = this.supplierInformationDropdownList.attachmentSectionDocCategory;
      })

      this.supplierService.loadParentCategoryDropdown(this.langId).subscribe((data: SupplierDataModel) => {

        this.parentLovMaster = data.data;
      })

      this.supplierService.loadSubCategoryDropdown(this.langId).subscribe((data: SupplierDataModel) => {

        this.childsubLovMaster = data.data;
      })

      this.supplierService.loadChildCategoryDropdown(this.langId).subscribe((data: SupplierDataModel) => {

        this.childLovMaster = data.data;

      })

      this.supplierService.loadDocumentType(this.langId, "9967").subscribe((data: SupplierDataModel) => {
        this.documentTypeDropdown = data.data;
      })
    })
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.supplierCategoryDetails = [];

    if (this.activePage == 1) {
      this.supplierCategoryDetails = this.masterData.slice(0, this.recCount);
    } else {
      this.supplierCategoryDetails = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
    }
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.supplierCategoryDetails = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  downloadDocument(docName) {

    this.attachmentService.downloadDocuments(docName, 'category', this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }

  saveCategoryDetails(categoryDetailsForm: NgForm): void {
    this.supplierCategory.supplierId = this.supplierId;
    this.supplierCategory.parentCategory = this.parentCategory;
    this.supplierCategory.subCategory = this.subCategory;
    this.supplierCategory.childCategory = this.childCategory;
    this.supplierCategory.catDocs = this.attachmentDocList;
    var submClsfn: string = null;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      submClsfn = SUBMISSION_CLASSIFICATION_PROFILE_UPDATES;
      this.submitFinalSupplierDetails();
      return;
    } else if (this.procureCacheService.getProfileUpdateSelected() == false) {
      submClsfn = SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE;
    } else {
      submClsfn = SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION;
    }

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.saveSupplierCategoryDetails(this.supplierCategory, this.supplierId, submClsfn).subscribe((data: SupplierDataModel) => {

          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier address';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          this.supplierCategoryDetails = data.data;
          this.attachmentDocList = [];
          this.attachmentDocDetails = undefined;
          this.type = 'success';
          this.message = data.message;
          this.isAlreadySaved = true;
          this.masterData = [];
          this.masterData = JSON.parse(JSON.stringify(this.supplierCategoryDetails));
          if (this.masterData.length > 0) {
            this.recCount = 5;
            this.totalRecordsCount = this.masterData.length;
          }
          if (+this.recCount > 0) {
            this.supplierCategoryDetails = this.masterData.slice(0, +this.recCount);
            this.activePage = 1;
          }

          if (this.prequaliStatus == true) {
            this.submitFinalSupplierDetails();
          }
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });

        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });
  }


  callFunction(event, adressdata) {


    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.deleteSupplierCategoryDetails(adressdata).subscribe((data: SupplierDataModel) => {
          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier address';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          this.supplierCategoryDetails = data.data;
          this.type = 'success';
          this.message = data.message;
          this.masterData = [];
          this.masterData = JSON.parse(JSON.stringify(this.supplierCategoryDetails));
          if (this.masterData.length > 0) {
            this.recCount = 5;
            this.totalRecordsCount = this.masterData.length;
          }
          if (+this.recCount > 0) {
            this.supplierCategoryDetails = this.masterData.slice(0, +this.recCount);
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

  uploadDocument(event, supplierId, docDesc, docCategory, parentCategory, subCategory, childCategory, userId, categoryDetailsForm: NgForm) {

    let selectedfiles = event.target.files[0];
    this.fileName = selectedfiles.name;
    let type = selectedfiles.type;
    let size = selectedfiles.size;
    const formData: FormData = new FormData();
    formData.append('file', selectedfiles);

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.attachmentService.uploadDocument(docDesc, type, this.supplierId, "category", this.loginUserID, formData, this.docCategory).subscribe((data: SupplierDataModel) => {

          if (data.status != 'OK') {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          data.data.forEach(docDet => {

            if (docDet.documentName == this.fileName) {
              this.attachmentDocDetails = docDet;
            }

            if (!isNullOrUndefined(this.documentTypeDropdown)) {
              this.attachmentDocDetails.documentCategoryName = this.documentTypeDropdown.find(item => item.lovId === docDet.docCategory).lovName;
            }

          })
          this.attachmentDocList = data.data;

          this.documentTypeDropdown.forEach(document => {

            if (this.docCategory == document.lovId) {
              this.documentCategoryName = document.lovName;
            }

          })
          this.type = 'success';
          this.message = data.message;
          categoryDetailsForm.reset();
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });


  }

  openAttachment(data) {
    this.successStories = [];
    this.specializedProfiles = [];
    this.popUpData = [];
    this.attachmentDataNotRetrievedMsg = undefined;

    this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, 'category', data.categoryId)
      .subscribe((response: SupplierDataModel) => {

        if (response.status != "OK") {
          this.attachmentDataNotRetrievedMsg = response.message;
          $('#attachmentsModel').modal('show');
          return;
        }

        this.successStories = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES);

        if (this.successStories.length == 0) {
          this.attachmentDataNotRetrievedMsg = "No attachments to display";
        }

        this.specializedProfiles = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES);

        if (this.specializedProfiles.length == 0) {
          this.attachmentDataNotRetrievedMsg = "No attachments to display";
        }

        if ((!isNullOrUndefined(this.successStories) && this.successStories.length > 0)
          || (!isNullOrUndefined(this.specializedProfiles) && this.specializedProfiles.length > 0)) {
          $('#attachmentsModel').modal('show');
        }

      });
  }

  getSuccessAndSpecialisedStories(supplierId, categoryId, lovId) {
    this.attachmentService.openAttachmentDetails(supplierId, categoryId, lovId)
      .subscribe((data: SupplierDataModel) => {

        if (data.status != "OK") {
          this.type = "danger";
          this.message = data.message;
          this.scroll.scrollToPosition([0, 0]);
          return;
        }

        return data.data;
      });
  }

  editDetails($event, categoryDetails) {

    this.supplierId = categoryDetails.supplierId;
    this.parentCategory = categoryDetails.parentCategory;
    this.subCategory = categoryDetails.subCategory;
    this.childCategory = categoryDetails.childCategory;
    this.categoryId = categoryDetails.categoryId;
    this.supplierCategory = categoryDetails;

    this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, 'category', categoryDetails.categoryId)
      .subscribe((response: SupplierDataModel) => {

        if (response.status != "OK") {
          return;
        }

        this.attachmentDocList = response.data;
        this.attachmentDocList.forEach(docDet => {
          if (!isNullOrUndefined(this.documentTypeDropdown)) {
            docDet.documentCategoryName = this.documentTypeDropdown.find(item => item.lovId === docDet.docCategory).lovName;
          }
        });

      });
  }
  goToPreviousComponent() {
    if (this.procureCacheService.getPrequalificationStatus() !== '7001') {
      this.router.navigate(['/supplier-bank-details']);
    }

  }

  goToNextComponent() {

    if (this.procureCacheService.getPrequalificationStatus() !== '7001') {
      this.router.navigate(['/attachment-section']);
    } else {
      this.router.navigate(['/final-view']);
    }
  }

  submitFinalSupplierDetails() {
    this.finalData.supplierId = this.supplierId;
    this.finalData.agreeCheck = true;

    this.supplierService.submitFinalSupplierDetails(this.finalData).subscribe((data: SupplierDataModel) => {

      if (data == null || data == undefined) {
        this.type = 'danger';
        this.message = 'Failed to submit the supplier details';
        this.scroll.scrollToPosition([0, 0]);
        return;
      }
      if (data.status != "OK") {
        this.type = 'danger';
        this.message = data.message;
        this.scroll.scrollToPosition([0, 0]);
        return;
      }
      this.type = 'info';
      this.procureCacheService.setQualifiedStatus(true);
      this.disableButtons = true;
      this.message = 'We are in receipt of your request for Supplier Registration along with the data & documents! The Application reference No. is ' + data.data.submissionRefNo + ' and can be referred for further communication with us. The Application is under review for Pre-Qualification and we shall soon revert upon evaluation of your application. We thank you for showing interest in serving our organization. ';
      this.isAlreadySaved = true;
      this.scroll.scrollToPosition([0, 0]);
    });
  }

  deleteCategoryAttachment(docId: string, categoryId: string) {


    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {

        this.attachmentService.deleteAttachment(docId, 'category', this.supplierId, categoryId).subscribe((data => {
          if (data.status != 'OK') {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.type = 'success';
          this.message = data.message;
          this.attachmentDocList = data.data;
        }))
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });

  }

  deleteAttachmentStories($event, docType) {

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {

        this.attachmentService.deleteTxnAttachments(docType.documentId,
          docType.moduleId, docType.moduleName, docType.supplierId, docType.moduleTxnId).subscribe((data => {
            if (data.status != 'OK') {
              this.type = 'danger';
              this.message = data.message;
              this.scroll.scrollToPosition([0, 0]);
              return;
            }
            this.type = 'success';
            this.message = data.message;
            this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
          }))
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });
  }

  close() {
    this.type = null;
  }

}
