import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierService } from '../../../services/supplier.service';
import { SupplierInfoVO } from '../../../services/SupplierInfoVO';
import { SupplierInformationDropdownList } from '../../../services/SupplierInformationDropdownList';
import { SupplierAddressDtl } from '../../../services/SupplierAddressDtl';
import { SupplierContactDetails } from '../../../services/SupplierContactDetails';
import { SupplierFinancialInfoVO } from '../../../services/SupplierFinancialInfoVO';
import { SupplierBankDetails } from '../../../services/SupplierBankDetails';
import { SupplierCategoryDocs } from '../../../services/SupplierCategoryDocs';
import { LovMaster } from '../../../services/LovMaster';
import { SupplierCategoryDetails } from '../../../services/SupplierCategoryDetails';
import { SupplierAttachmentSection } from '../../../services/SupplierAttachmentSection';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES, CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES } from 'src/app/services/ApplicationConstants';
import { ViewportScroller } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
declare var $: any;


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() pageTitle: string;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  type: string;
  message: string;
  langId: string;
  successStories: any;
  specializedProfiles: any;
  supplierInfoVO: SupplierInfoVO;
  supplierInformationDropdownList: SupplierInformationDropdownList;
  supplierAddressDtl: SupplierAddressDtl[];
  supplierCountryDtl: SupplierAddressDtl[];
  supplierStatessDtl: SupplierAddressDtl[];
  supplierContactDetails: SupplierContactDetails[];
  supplierFinancialInfoVO: SupplierFinancialInfoVO;
  supplierBankDetails: SupplierBankDetails;
  supplierCategoryDetails: SupplierCategoryDetails[];
  supplierCategoryDocs: SupplierCategoryDocs[];
  supplierAttachmentSection: SupplierAttachmentSection;
  documentCategory;
  attachmentDetails: Array<any>;
  username: string;
  loginObj: any;
  popUpData: any;
  disableProgressTab: boolean;
  isAlreadySaved: boolean;
  tabName: string;
  pageYoffset: number;
  attachmentDataNotRetrievedMsg: string;
  supDataAvailable: boolean;
  supInfoData: boolean;
  supAddrData: boolean;
  supConData: boolean;
  supFinData: boolean;
  supBankData: boolean;
  supCatData: boolean;
  supAttachData: boolean;
  supplierContactRoles: Array<any>;
  loadBankRefDropdown: LovMaster[];

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private procureCacheService: ProcureCacheService, private scroll: ViewportScroller,
    private attachmentService: FileAttachmentAPIService) {
  }

  // this.supplierService.getSupplierAddressDetails(this.supplierId,this.loginUserID,this.companyId).pipe(take(1))

  ngOnInit() {
    this.loadPreviewData();
  }

  getRoleName(value) {
    if (!isNullOrUndefined(value.keyRole)) {
      return value.keyRole = this.supplierContactRoles.find(item => item.lovId === value.keyRole).lovName
    }
  }

  loadPreviewData() {

    this.supDataAvailable = false;
    this.supInfoData = false;
    this.supAddrData = false;
    this.supConData = false;
    this.supFinData = false;
    this.supBankData = false;
    this.supCatData = false;
    this.supAttachData = false;
    this.tabName = "supplierPreview";
    this.isAlreadySaved = false;
    this.loginObj = this.procureCacheService.getLoginObject();

    if (this.pageTitle != "companyScoreCard") {
      this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    } else {
      this.supplierId = this.procureCacheService.getSupId();
    }

    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }

    this.loginUserID = this.loginObj.loginUserID;
    this.langId = this.loginObj.langId;
    this.companyId = this.supplierId;
    this.username = this.loginObj.username;
    this.attachmentDetails = [];
    this.disableProgressTab = false;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }

    this.supplierService.getSupplierDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.supplierInformationDropdownList = data.data.experienceHistory;
      console.log(this.supplierInformationDropdownList);
      this.documentCategory = this.supplierInformationDropdownList;
    })

    this.supplierService.loadCountryDropdown().subscribe((data: SupplierDataModel) => {

      this.supplierCountryDtl = data.data;
    })

    this.supplierService.loadStatesDropdown().subscribe((data: SupplierDataModel) => {

      this.supplierStatessDtl = data.data;
    })

    this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.supplierInformationDropdownList = data.data;
      console.log(this.supplierInformationDropdownList)
    })

    this.supplierService.getScoreCardStatus(this.langId, "9660").subscribe((roleData: SupplierDataModel) => {
      this.supplierContactRoles = roleData.data;
      console.log(this.supplierContactDetails);
    });

    this.supplierService.getSupplierDetails(this.supplierId, this.loginUserID, this.companyId).then((data: SupplierDataModel) => {

      this.supplierInfoVO = data.data;
      this.supplierInfoVO.estdDate = this.setDateValue(this.supplierInfoVO.estdDate);
      this.supplierInfoVO.expirydate = this.setDateValue(this.supplierInfoVO.expirydate);
      this.supplierInfoVO.issueddate = this.setDateValue(this.supplierInfoVO.issueddate);
      console.log(this.supplierInfoVO);

      if (isNullOrUndefined(data.status == 'OK')) {
        this.supInfoData = true;

      } else {
        this.supInfoData = false;

      }
    })

    this.supplierService.getSupplierAddressDetails(this.supplierId, this.loginUserID, this.companyId).then((data: SupplierDataModel) => {

      this.supplierAddressDtl = data.data;

      if (this.supplierAddressDtl.length !== 0 && this.supplierAddressDtl[0].siteName != null) {
        this.supAddrData = true;
      } else {
        this.supAddrData = false;
      }
    })

    this.supplierService.getSupplierContactDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {

      this.supplierContactDetails = data.data;

      if (this.supplierContactDetails.length > 0) {
        this.supConData = true;
      } else {
        this.supConData = false;
      }

      if (!isNullOrUndefined(this.supplierContactRoles)) {
        this.supplierContactDetails.forEach(value => {
          this.getRoleName(value);
        });
      }
    })

    this.supplierService.getSupplierFinanceDetails(this.supplierId).then((data: SupplierDataModel) => {

      this.supplierFinancialInfoVO = data.data;

      if (this.supplierFinancialInfoVO && this.supplierFinancialInfoVO.finDtl && this.supplierFinancialInfoVO.finDtl.financeProjectDtl.length !== 0) {
        this.supFinData = true;
      } else {
        this.supFinData = false;
      }
    })


    this.supplierService.getSupplierBankDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {

      this.supplierBankDetails = data.data;
      console.log(this.supplierBankDetails);

      if (!isNullOrUndefined(this.supplierBankDetails)) {
        if (this.supplierBankDetails.bankName != null) {
          this.supBankData = true;
        } else {
          this.supBankData = false;
        }
      }
    })

    this.supplierService.getCategoryDetails(this.supplierId, this.langId).then((data: SupplierDataModel) => {

      this.supplierCategoryDetails = data.data;

      if (!isNullOrUndefined(this.supplierCategoryDetails)) {
        if (this.supplierCategoryDetails.length !== 0) {
          this.supCatData = true;
        } else {
          this.supCatData = false;
        }
      }
    })
    this.attachmentService.getSupplierAttachmentsDetails(this.supplierId, this.supplierId, 'attachment').then((data: SupplierDataModel) => {

      this.supplierAttachmentSection = data.data;
      console.log(this.supplierAttachmentSection);
      if (!isNullOrUndefined(this.supplierAttachmentSection)) {
        this.supAttachData = true;
      } else {
        this.supAttachData = false;
      }
    })

    forkJoin([
      this.supplierService.getSupplierDetails(this.supplierId, this.loginUserID, this.companyId),
      this.supplierService.getSupplierAddressDetails(this.supplierId, this.supplierId, this.supplierId),
      this.supplierService.getSupplierContactDetails(this.supplierId, this.loginUserID, this.companyId, this.langId),
      this.supplierService.getSupplierFinanceDetails(this.supplierId),
      this.supplierService.getSupplierBankDetails(this.supplierId, this.loginUserID, this.companyId, this.langId),
      this.supplierService.getCategoryDetails(this.supplierId, this.langId),
      this.attachmentService.getSupplierAttachmentsDetails(this.supplierId, this.supplierId, 'attachment')
    ]).subscribe(result => {
      console.log('forkjoin testm', result);

      if (result[0].isError == false) {
        if (result[0].status == 'OK' && !isNullOrUndefined(result[0].data.supplierNameEn)) {
          this.supInfoData = true;
        } else {
          this.supInfoData = false;
        }
      }

      if (result[1].isError == false) {

        if (result[1].data.length !== 0 && result[1].data[0].siteName != null) {
          this.supAddrData = true;
        } else {
          this.supAddrData = false;
        }
      }

      if (result[2].isError == false) {

        if (result[2].data.length > 0) {
          this.supConData = true;
        } else {
          this.supConData = false;
        }
      }

      if (result[3].isError == false) {

        if (result[3].data && result[3].data.finDtl && result[3].data.finDtl.financeProjectDtl.length !== 0) {
          this.supFinData = true;
        } else {
          this.supFinData = false;
        }
      }

      if (result[4].isError == false) {

        if (!isNullOrUndefined(result[4].data)) {
          if (result[4].data.bankName != null) {
            this.supBankData = true;
          } else {
            this.supBankData = false;
          }
        }
      }

      if (result[5].isError == false) {

        if (!isNullOrUndefined(result[5].data)) {
          if (result[5].data.length !== 0) {
            this.supCatData = true;
          } else {
            this.supCatData = false;
          }
        }
      }

      if (result[6].isError == false) {

        if (!isNullOrUndefined(result[6].data)) {
          this.supAttachData = true;
        } else {
          this.supAttachData = false;
        }
      }

      if (this.supInfoData == true && this.supAddrData == true && this.supConData == true && this.supFinData == true && this.supBankData == true && this.supCatData == true && this.supAttachData == true) {
        this.isAlreadySaved = true;
      } else {
        this.isAlreadySaved = false;
      }
    });
  }

  downloadDocument(docName) {
    this.attachmentService.downloadDocuments(docName, 'attachment',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }

  setDateValue(inputDate) {
    var date = moment(inputDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    return date;
  }

  openAttachment(data) {

    this.successStories = [];
    this.specializedProfiles = [];
    this.popUpData = [];
    this.attachmentDataNotRetrievedMsg = undefined;

    console.log(data);
    this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, 'category', null)
      .subscribe((response: SupplierDataModel) => {
        console.log(response.data);

        if (response.status != "OK") {
          this.attachmentDataNotRetrievedMsg = response.message;
          console.log(this.attachmentDataNotRetrievedMsg);
          $('#attachmentsModel').modal('show');
          return;
        }

        this.successStories = [];
        this.specializedProfiles = [];
        this.popUpData = [];
        this.successStories = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES);
        console.log(this.successStories);
        if (this.successStories.length == 0) {
          this.attachmentDataNotRetrievedMsg = "No attachments to display";
        }
        this.specializedProfiles = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES);
        console.log(this.specializedProfiles);
        if (this.specializedProfiles.length == 0) {
          this.attachmentDataNotRetrievedMsg = "No attachments to display";
        }
        if ((!isNullOrUndefined(this.successStories) && this.successStories.length > 0)
          || (!isNullOrUndefined(this.specializedProfiles) && this.specializedProfiles.length > 0)) {
          console.log(this.successStories);
          console.log(this.specializedProfiles);
          $('#attachmentsModel').modal('show');
        }
      });
  }

  goToPreviousComponent() {
    this.router.navigate(['/attachment-section']);
  }

  goToNextComponent() {
    this.router.navigate(['/final-view']);
  }

  close() {
    this.type = null;
  }

}
