import { Component, HostListener, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierFinancialInfoVO } from '../../../services/SupplierFinancialInfoVO';
import { SupplierInformationDropdownList } from '../../../services/SupplierInformationDropdownList';
import { Router, ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
import { HttpClient } from "@angular/common/http";
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { FinanceProjectDtl } from 'src/app/services/FinanceProjectDtl';
import { FinanceAssetDtl } from 'src/app/services/FinanceAssetDtl';
import { SupplierFinanceDtl } from 'src/app/services/SupplierFinanceDtl';
import { SUPPLIER_FINANCE_PROJECT_TYPE_ONGOING, SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS, SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION, SUPPLIER_FINANCE_TOTAL_ASSETS, SUPPLIER_FINANCE_TOTAL_LIABILITIES } from 'src/app/services/ApplicationConstants';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { ViewportScroller } from '@angular/common';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

interface Supplier {
  id?: number;
  applicationno: number;
  scopeofwork: string;
  subcategory: string;
  childcategory: string;
  submiteddate: string;
  status: string;
}

const SUPPLIERS: Supplier[] = [];


@Component({
  selector: 'app-supplier-financial-business',
  templateUrl: './supplier-financial-business.component.html',
  styleUrls: ['./supplier-financial-business.component.scss']
})
export class SupplierFinancialBusinessComponent implements OnInit {

  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  type: string;
  message: string;
  docName: string;
  supplierFinancialInfoVO: SupplierFinancialInfoVO;
  supplierInformationDropdownList: SupplierInformationDropdownList;
  loginObj: any;
  isAlreadySaved: boolean;
  fileName: string;
  attachedFileList: any;
  disableButtons: boolean;
  disableProgressTab: boolean;
  preQualificationStatus: string;
  tabName: string;
  pageYoffset: number;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient, private procureCacheService: ProcureCacheService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.tabName = "supplierFinancial";
    this.loginObj = this.procureCacheService.getLoginObject();

    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;
    this.disableButtons = false;
    this.disableProgressTab = false;


    this.supplierFinancialInfoVO = new SupplierFinancialInfoVO();
    this.supplierFinancialInfoVO.finDocs = [];
    this.supplierFinancialInfoVO.finDtl.financeAssetDtl = [];
    this.supplierFinancialInfoVO.finDtl.financeProjectDtl = [];
    this.supplierFinancialInfoVO.financeAssetDtl = [];
    this.supplierFinancialInfoVO.financeProjectDtl = [];

    this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS));
    this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_ONGOING));
    this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_ASSETS));
    this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_LIABILITIES));

    this.supplierService.getSupplierDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
      this.supplierInformationDropdownList = data.data.experienceHistory;
      data.data.experienceHistory.sort((a, b) => {
        console.log(Number(a.lovId));
        console.log(Number(b.lovId));


        return Number(a.lovId) - Number(b.lovId);
      });
    })

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }
    this.preQualificationStatus = this.procureCacheService.getPrequalificationStatus();

    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualificationStatus == '7001') {
      this.disableButtons = true;
    }
    this.attachmentService.getSupplierAttachmentsDetails(this.supplierId, this.supplierId, 'Finance').then((data: SupplierDataModel) => {
      if (data.data.length != 0) {
        this.attachedFileList = data.data;
      }

    })

    this.supplierService.getSupplierFinanceDetails(this.supplierId).then((data: SupplierDataModel) => {

      if (data.data != null) {
        this.supplierFinancialInfoVO = data.data;
        if (this.supplierFinancialInfoVO && this.supplierFinancialInfoVO.finDtl && this.supplierFinancialInfoVO.finDtl.financeProjectDtl.length !== 0) {
          this.isAlreadySaved = true;
        }
        if (this.supplierFinancialInfoVO.finDtl == null) {
          this.supplierFinancialInfoVO.finDtl = new SupplierFinanceDtl();
          this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS));
          this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_ONGOING));
          this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_ASSETS));
          this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_LIABILITIES));
        } else if (this.supplierFinancialInfoVO.finDtl.financeProjectDtl.length == 0) {
          this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS));
          this.supplierFinancialInfoVO.finDtl.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_ONGOING));
        } else if (this.supplierFinancialInfoVO.finDtl.financeAssetDtl.length == 0) {
          this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_ASSETS));
          this.supplierFinancialInfoVO.finDtl.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_LIABILITIES));
        }

      }
    })
  }

  onChange(isChecked: boolean) {
    if (isChecked) {
      this.supplierFinancialInfoVO.finDtl.isNetProfit = "1";
    } else {
      this.supplierFinancialInfoVO.finDtl.isNetProfit = "0";
    }
  }

  uploadDocument(event, docDesc, docCategory) {

    let selectedfiles = event.target.files[0];
    this.fileName = selectedfiles.name;
    let type = selectedfiles.type;
    let size = selectedfiles.size;
    const userId = this.loginUserID;
    const formData: FormData = new FormData();
    formData.append('file', selectedfiles);

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.attachmentService.uploadDocument(docDesc, type, this.supplierId, "Finance", this.loginUserID, formData).subscribe((data: SupplierDataModel) => {

          if (data.status != 'OK') {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.type = 'success';
          this.message = data.message;
          this.attachedFileList = data.data;
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);

        });
        this.scroll.scrollToPosition([0, 0]);

      } else if (result == 'No') {
        // do nothing
      }
    });

  }

  close() {
    this.type = null;
  }

  saveFinanceDetails(): void {

    this.supplierFinancialInfoVO.financeAssetDtl = [];
    this.supplierFinancialInfoVO.financeProjectDtl = [];
    if (isNullOrUndefined(this.supplierFinancialInfoVO.finDtl.financeAssetDtl[0].yearOne)
      || this.supplierFinancialInfoVO.finDtl.financeAssetDtl[0].yearOne == ""
      || isNullOrUndefined(this.supplierFinancialInfoVO.finDtl.financeAssetDtl[1].yearOne)
      || this.supplierFinancialInfoVO.finDtl.financeAssetDtl[1].yearOne == ""
      // || isNullOrUndefined(this.attachedFileList)
      // || this.attachedFileList.length == 0
      || isNullOrUndefined(this.supplierFinancialInfoVO.finDtl.expHistory)
      || this.supplierFinancialInfoVO.finDtl.expHistory == ""
      || isNullOrUndefined(this.supplierFinancialInfoVO.finDtl.totalProjectVal)
      || this.supplierFinancialInfoVO.finDtl.totalProjectVal == ""
      || isNullOrUndefined(this.supplierFinancialInfoVO.finDtl.maxProjectVal)
      || this.supplierFinancialInfoVO.finDtl.maxProjectVal == ""
    ) {
      this.type = 'danger';
      this.message = 'Please fill all the mandatory fields';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }

    if (isNullOrUndefined(this.supplierFinancialInfoVO.finDocs)) {
      this.supplierFinancialInfoVO.finDocs = [];
    }

    var submClsfn: string = null;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      submClsfn = SUBMISSION_CLASSIFICATION_PROFILE_UPDATES;
    } else if (this.procureCacheService.getProfileUpdateSelected() == false) {
      submClsfn = SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE;
    } else {
      submClsfn = SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION;
    }

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {

        this.supplierService.saveSupplierFinanceDetails(this.supplierFinancialInfoVO, this.supplierId, submClsfn).subscribe((data: SupplierDataModel) => {

          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier buiseness details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (isNullOrUndefined(data.data)) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier buiseness details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.supplierFinancialInfoVO = data.data;
          this.type = 'success';
          this.message = data.message;
          this.isAlreadySaved = true;
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
          this.scroll.scrollToPosition([0, 0]);
        });
      } else if (result == 'No') {
        // do nothing
      }
    });

  }

  page = 1;
  pageSize = 5;
  collectionSize = SUPPLIERS.length;

  get suppliers(): Supplier[] {
    return SUPPLIERS
      .map((supplierinfo, i) => ({ id: i + 1, ...supplierinfo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  downloadDocument(docName) {

    this.attachmentService.downloadDocuments(docName, 'Finance', this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }

  deleteSelectedAttachmentDetails($event, supplierinfo) {

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to delete this attachment?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
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
                this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);

                if (data.data.length == 0) {
                  this.attachedFileList = null;
                  return;
                }
                this.attachedFileList = data.data;
              }));
            this.scroll.scrollToPosition([0, 0]);
          } else if (result == 'No') {
            // do nothing
          }
        });
      } else if (result == 'No') {
        // do nothing
      }
    });

  }

  goToPreviousComponent() {
    this.router.navigate(['/supplier-contact-details']);
  }

  goToNextComponent() {
    this.router.navigate(['/supplier-bank-details']);
  }

}
