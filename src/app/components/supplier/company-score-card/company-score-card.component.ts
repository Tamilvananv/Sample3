import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierInfoVO } from 'src/app/services/SupplierInfoVO';
import { SupplierInformationDropdownList } from 'src/app/services/SupplierInformationDropdownList';
import { SupplierAddressDtl } from 'src/app/services/SupplierAddressDtl';
import { SupplierContactDetails } from 'src/app/services/SupplierContactDetails';
import { SupplierFinancialInfoVO } from 'src/app/services/SupplierFinancialInfoVO';
import { SupplierBankDetails } from 'src/app/services/SupplierBankDetails';
import { SupplierCategoryDetails } from 'src/app/services/SupplierCategoryDetails';
import { SupplierCategoryDocs } from 'src/app/services/SupplierCategoryDocs';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { SupplierDataModel } from '../model/SupplierDataModel';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
declare var $: any;

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-company-score-card',
  templateUrl: './company-score-card.component.html',
  styleUrls: ['./company-score-card.component.scss']
})

export class CompanyScoreCardComponent implements OnInit {
  loginObj: any;
  username: string;
  type: string;
  message: string;
  successStories: any;
  specializedProfiles: any;
  langId: string;
  documentCategory: any;
  supplierInformationDropdownList: SupplierInformationDropdownList;
  reviewedTime = '';
  isReviewedTime: boolean = false;
  supplierId: string;
  pageTitle: string;

  constructor(
    private procureCacheService: ProcureCacheService, public supplierService: SupplierService,
     private router: Router, private attachmentService: FileAttachmentAPIService
  ) { }

  ngOnInit(): void {
    this.pageTitle = "companyScoreCard";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.username = this.loginObj.username;
    this.langId = this.loginObj.langId;
    this.supplierId = this.procureCacheService.getSupId();
    console.log(this.loginObj);


    this.supplierService.getSupplierDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.supplierInformationDropdownList = data.data;
      console.log(this.supplierInformationDropdownList);
      if (this.supplierInformationDropdownList != null || this.supplierInformationDropdownList != undefined) {
        this.documentCategory = this.supplierInformationDropdownList.attachmentSectionDocCategory;
      }
    });

    this.supplierService.getReviewedScoreCardDetails(this.supplierId).subscribe((data: SupplierDataModel) => {

      console.log(data);
      if (!isNullOrUndefined(data.data)) {
        this.reviewedTime = data.data.reviewedOn;
        if(data.data.agreeCheck == "1") {
          this.isReviewedTime = true;
        }
      }

    })

  }

  updateTime(event) {
    console.log(event);
    
    if (event == true) {
      this.reviewedTime = new Date().toLocaleTimeString([], { timeZoneName: 'short' });;
    console.log(this.reviewedTime);
    
    } else {
      this.reviewedTime = null;
      console.log(this.reviewedTime);
    }
  }

  saveReviewedTime() {
    this.supplierService.saveReviewedScoreCardDetails(this.supplierId).subscribe((data: SupplierDataModel) => {

      if (data == null || data == undefined) {
        this.type = 'error';
        this.message = 'Failed to save the supplier buiseness details';
        return;
      }
      if (data.status != "OK") {
        this.type = 'error';
        this.message = data.message;
        return;
      }
      if (isNullOrUndefined(data.data)) {
        this.type = 'error';
        this.message = 'Failed to save the supplier buiseness details';
        return;
      }
      this.type = 'success';
      this.message = data.message;
      this.updateTime(event);
      this.router.navigate(['/supplier-score-card-summary']);
    });
  }

  openAttachment(data) {
    this.successStories = [];
    this.specializedProfiles = [];

    this.documentCategory.forEach(value => {
      this.attachmentService.openAttachmentDetails(data.supplierId, data.categoryId, value.lovId)
        .subscribe((response: SupplierDataModel) => {

          if (response.status != "OK") {
            this.type = 'error';
            this.message = response.message;
            return;
          }
          if (this.successStories.length == 0) {
            this.successStories.push(response.data[0]);
          }
          if (this.successStories.length == 1 && this.specializedProfiles.length == 0) {
            this.specializedProfiles.push(response.data[0]);
          }
          if (this.successStories.length == 1 && this.specializedProfiles.length == 1) {
            $('#attachmentsModel').modal('show');
          }
        });
    })
  }
}
