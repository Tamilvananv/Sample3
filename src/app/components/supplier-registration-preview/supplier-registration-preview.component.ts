import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES, CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES } from 'src/app/services/ApplicationConstants';
import { ViewportScroller } from '@angular/common';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierInfoVO } from 'src/app/services/SupplierInfoVO';
import { SupplierInformationDropdownList } from 'src/app/services/SupplierInformationDropdownList';
import { SupplierAddressDtl } from 'src/app/services/SupplierAddressDtl';
import { SupplierContactDetails } from 'src/app/services/SupplierContactDetails';
import { SupplierFinancialInfoVO } from 'src/app/services/SupplierFinancialInfoVO';
import { SupplierBankDetails } from 'src/app/services/SupplierBankDetails';
import { SupplierCategoryDetails } from 'src/app/services/SupplierCategoryDetails';
import { SupplierCategoryDocs } from 'src/app/services/SupplierCategoryDocs';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { SupplierDataModel } from '../supplier/model/SupplierDataModel';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
declare var $: any;


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-supplier-registration-preview',
  templateUrl: './supplier-registration-preview.component.html',
  styleUrls: ['./supplier-registration-preview.component.scss']
})
export class SupplierRegistrationPreviewComponent implements OnInit {

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
  suppliers = []; //Array of supplier
  
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
 }

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private procureCacheService: ProcureCacheService, private scroll: ViewportScroller,
    private attachmentService: FileAttachmentAPIService) { }

    ngOnInit(): void {
    
      this.tabName = "supplierPreview";
      this.isAlreadySaved = true;
      this.loginObj = this.procureCacheService.getLoginObject();
  
      if (this.pageTitle != "companyScoreCard") {
        this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
      } else {
        this.supplierId = this.procureCacheService.getSupId();
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
  
      this.supplierService.getSupplierDetails(this.supplierId, this.loginUserID, this.companyId).then((data: SupplierDataModel) => {
  
        this.supplierInfoVO = data.data;
        this.supplierInfoVO.estdDate = this.setDateValue(this.supplierInfoVO.estdDate);
        this.supplierInfoVO.expirydate = this.setDateValue(this.supplierInfoVO.expirydate);
        this.supplierInfoVO.issueddate = this.setDateValue(this.supplierInfoVO.issueddate);
      })
    
      this.supplierService.getSupplierDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
  
        this.supplierInformationDropdownList = data.data.experienceHistory;
        console.log(this.supplierInformationDropdownList);
  
        this.documentCategory = this.supplierInformationDropdownList;
      })
  
      this.supplierService.getSupplierAddressDetails(this.supplierId, this.supplierId, this.supplierId).then((data: SupplierDataModel) => {
  
        this.supplierAddressDtl = data.data;
      })
  
      this.supplierService.loadCountryDropdown().subscribe((data: SupplierDataModel) => {
  
        this.supplierCountryDtl = data.data;
      })
  
      this.supplierService.loadStatesDropdown().subscribe((data: SupplierDataModel) => {
  
        this.supplierStatessDtl = data.data;
      })
  
      this.supplierService.getSupplierContactDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {
  
        this.supplierContactDetails = data.data;
      })
  
  
      this.supplierService.getSupplierFinanceDetails(this.supplierId).then((data: SupplierDataModel) => {
  
        this.supplierFinancialInfoVO = data.data;
      })
  
      this.supplierService.getSupplierInfoDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {
  
        this.supplierInformationDropdownList = data.data;
        console.log(this.supplierInformationDropdownList)
      })
  
      this.supplierService.getSupplierBankDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {
  
        this.supplierBankDetails = data.data;
        console.log(this.supplierBankDetails);
  
      })
  
  
      this.supplierService.getCategoryDetails(this.supplierId, this.langId).then((data: SupplierDataModel) => {
  
        this.supplierCategoryDetails = data.data;
      })
  
  
      this.attachmentService.getSupplierAttachmentsDetails(this.supplierId, this.supplierId, 'attachment').then((data: SupplierDataModel) => {
  
        this.supplierAttachmentSection = data.data;
        console.log(this.supplierAttachmentSection);
  
      })
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

      this.successStories = undefined;
      this.specializedProfiles = undefined;
      this.popUpData = undefined;

      this.attachmentService.getSupplierTxnAttachmentsDetails(this.supplierId, this.supplierId, 'category', null )
        .subscribe((response: SupplierDataModel) => {
          console.log(response.data);
          if (response.status != "OK") {
            this.type = "danger";
            this.message = response.message;
            // alert(response.message);
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.successStories = [];
          this.specializedProfiles = [];
          this.popUpData = [];
          this.successStories = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SUCCESS_STORIES);
          console.log(this.successStories);
  
          this.specializedProfiles = response.data.filter((x) => x.docCategory == CATEGORY_SCOPE_ATTACHMENT_TYPE_SPECIALIZED_PROFILES);
          console.log(this.specializedProfiles);
          if ((!isNullOrUndefined(this.successStories) && this.successStories.length > 0)
            || (!isNullOrUndefined(this.specializedProfiles) && this.specializedProfiles.length > 0)) {
            console.log(this.successStories);
            console.log(this.specializedProfiles);
            $('#attachmentsModel').modal('show');
          }
        });
    }

  goBackComponent() {
    this.supplierService.getAll(this.supplierId, this.loginUserID, this.companyId).subscribe((data: SupplierDataModel) => {
      this.suppliers = data.data;
      if (this.suppliers.length > 0) {
        this.router.navigate(['/supplier-info']);
      }
    })
  }

  close(){
    this.type = null;
  }
  
}
