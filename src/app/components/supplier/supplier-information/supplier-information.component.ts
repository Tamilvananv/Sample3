import { Component, HostListener, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierInfoVO } from '../../../services/SupplierInfoVO';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SupplierInformationDropdownList } from '../../../services/SupplierInformationDropdownList';
import { throwError, Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierDataModel } from '../model/SupplierDataModel';
import * as moment from 'moment';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION } from 'src/app/services/ApplicationConstants';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { ViewportScroller } from '@angular/common';
import { LovMaster } from 'src/app/services/LovMaster';

@Component({
  selector: 'app-supplier-information',
  templateUrl: './supplier-information.component.html',
  styleUrls: ['./supplier-information.component.scss']
})
export class SupplierInformationComponent implements OnInit {

  type: string;
  message: string;
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  loginObj: any;
  isAlreadySaved: boolean;
  preQualificationStatus: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  supplierInfoVO: SupplierInfoVO = {
    qualification: null,
    typeOfOwner: null,
    ownerType: null,
    qualAreaLevel: null,
    website: null,
    estdDate: null,
    parentCompName: null,
    supplierNameEn: null,
    supplierNameAr: null,
    agreeCheck: null,
    supplierId: null,
    userId: null,
    compId: null,
    managerName: null,
    jobTitle: null,
    mobile: null,
    email: null,
    isPrimary: null,
    tradelicenseno: null,
    issuedby: null,
    issueddate: null,
    location: null,
    expirydate: null,
    submissionClassification: null
  };
  disableButtons: boolean;
  disableProgressTab: boolean;
  estDateMaxValue: string;
  compId: string;
  preQualiStatus: boolean;
  tabName: string;
  futureDateError: boolean;
  pageYoffset: number;
  typeOfOwnershipDropdownList: LovMaster[];
  qualificationAreaLevelDropdownList: LovMaster[];

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(public supplierService: SupplierService, public http: HttpClient, private router: Router,
    private route: ActivatedRoute, private procureCacheService: ProcureCacheService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.tabName = "supplierInformation";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.procureCacheService.getCompId();
    this.langId = this.loginObj.langId;
    this.disableButtons = false;
    this.isAlreadySaved = false;
    this.disableProgressTab = false;
    this.estDateMaxValue = moment().format('YYYY-MM-DD');

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }

    this.preQualiStatus = this.procureCacheService.getQualifiedStatus();
    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualiStatus == true) {
      this.disableButtons = true;
    }

    this.supplierService.getSupplierDropdownValues(this.langId).subscribe((data: SupplierDataModel) => {

      this.typeOfOwnershipDropdownList = data.data.typeOfOwnership;
      this.typeOfOwnershipDropdownList.sort((a, b) => {
        console.log(a.lovName);
        console.log(b.lovName);
        if (a.lovName < b.lovName) {
          return -1
        }
        if (a.lovName > b.lovName) {
          return 1
        }
        return 0
      });

      this.qualificationAreaLevelDropdownList = data.data.qualificationAreaLevel;
      this.qualificationAreaLevelDropdownList.sort((a, b) => {
        console.log(a.lovName);
        console.log(b.lovName);
        if (a.lovName < b.lovName) {
          return -1
        }
        if (a.lovName > b.lovName) {
          return 1
        }
        return 0
      });
    })

    this.supplierService.getSupplierDetails(this.supplierId, this.loginUserID, this.companyId).then((data: SupplierDataModel) => {

      this.supplierInfoVO = data.data;
      this.compId = data.data.compId;

      console.log("test", data);

      if (isNullOrUndefined(data.status !== 'OK')) {
        this.isAlreadySaved = false;
        return;
      }

      if (isNullOrUndefined(data.data.supplierNameEn)) {
        this.isAlreadySaved = false;
        return;
      }

      if (this.supplierInfoVO.estdDate != null) {
        this.supplierInfoVO.estdDate = this.setDateValue(this.supplierInfoVO.estdDate);
      }
      if (this.supplierInfoVO.expirydate != null) {
        this.supplierInfoVO.expirydate = this.setDateValue(this.supplierInfoVO.expirydate);
      }
      if (this.supplierInfoVO.issueddate != null) {
        this.supplierInfoVO.issueddate = this.setDateValue(this.supplierInfoVO.issueddate);
      }
      this.isAlreadySaved = true;
    })
  }

  saveSupplierDetails() {

    if (isNullOrUndefined(this.supplierInfoVO.supplierNameEn) || this.supplierInfoVO.supplierNameEn == ""
      || isNullOrUndefined(this.supplierInfoVO.ownerType) || this.supplierInfoVO.ownerType == ""
      || isNullOrUndefined(this.supplierInfoVO.qualAreaLevel) || this.supplierInfoVO.qualAreaLevel == ""
      || isNullOrUndefined(this.supplierInfoVO.estdDate) || this.supplierInfoVO.estdDate == ""
      || isNullOrUndefined(this.supplierInfoVO.tradelicenseno) || this.supplierInfoVO.tradelicenseno == ""
      || isNullOrUndefined(this.supplierInfoVO.issuedby) || this.supplierInfoVO.issuedby == ""
      || isNullOrUndefined(this.supplierInfoVO.location) || this.supplierInfoVO.location == ""
      || isNullOrUndefined(this.supplierInfoVO.managerName) || this.supplierInfoVO.managerName == ""
      || isNullOrUndefined(this.supplierInfoVO.jobTitle) || this.supplierInfoVO.jobTitle == ""
      || isNullOrUndefined(this.supplierInfoVO.mobile) || this.supplierInfoVO.mobile == ""
      || isNullOrUndefined(this.supplierInfoVO.email) || this.supplierInfoVO.email == ""
      || isNullOrUndefined(this.supplierInfoVO.issueddate) || this.supplierInfoVO.issueddate == ""
      || isNullOrUndefined(this.supplierInfoVO.expirydate) || this.supplierInfoVO.expirydate == ""
    ) {
      this.type = 'danger';
      this.message = 'Please fill all the mandatory fields';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }
    if (this.supplierInfoVO.supplierNameEn == this.supplierInfoVO.parentCompName) {
      this.type = 'danger';
      this.message = 'Company name in English and Parent company name cannot be same';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }

    this.supplierInfoVO.supplierId = this.supplierId;
    this.supplierInfoVO.userId = this.loginUserID;
    this.supplierInfoVO.compId = this.companyId;

    var submClsfn: string = null;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      submClsfn = SUBMISSION_CLASSIFICATION_PROFILE_UPDATES;
    } else if (this.procureCacheService.getProfileUpdateSelected() == false) {
      submClsfn = SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE;
    } else {
      submClsfn = SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION;
    }

    this.supplierInfoVO.estdDate = this.convertDateFormat(this.supplierInfoVO.estdDate);
    this.supplierInfoVO.issueddate = this.convertDateFormat(this.supplierInfoVO.issueddate);
    this.supplierInfoVO.expirydate = this.convertDateFormat(this.supplierInfoVO.expirydate);


    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.saveSupplierDetails(this.supplierInfoVO, submClsfn).subscribe((data: SupplierDataModel) => {

          if (data.status == "BAD_REQUEST") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier information';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          if (isNullOrUndefined(data.data.supplierNameEn)) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier information';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.supplierInfoVO = data.data;

            if (this.supplierInfoVO.estdDate != null) {
              this.supplierInfoVO.estdDate = this.setDateValue(data.data.estdDate);
            }
            if (this.supplierInfoVO.expirydate != null) {
              this.supplierInfoVO.expirydate = this.setDateValue(data.data.expirydate);
            }
            if (this.supplierInfoVO.issueddate != null) {
              this.supplierInfoVO.issueddate = this.setDateValue(data.data.issueddate);
            }

            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.supplierInfoVO = data.data;

          if (this.supplierInfoVO.estdDate != null) {
            this.supplierInfoVO.estdDate = this.setDateValue(data.data.estdDate);
          }
          if (this.supplierInfoVO.expirydate != null) {
            this.supplierInfoVO.expirydate = this.setDateValue(data.data.expirydate);
          }
          if (this.supplierInfoVO.issueddate != null) {
            this.supplierInfoVO.issueddate = this.setDateValue(data.data.issueddate);
          }
          this.type = 'success';
          this.message = data.message;
          this.isAlreadySaved = true;
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });

        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
        if (this.supplierInfoVO.estdDate != null) {
          this.supplierInfoVO.estdDate = this.setDateValue(this.supplierInfoVO.estdDate);
        }
        if (this.supplierInfoVO.expirydate != null) {
          this.supplierInfoVO.expirydate = this.setDateValue(this.supplierInfoVO.expirydate);
        }
        if (this.supplierInfoVO.issueddate != null) {
          this.supplierInfoVO.issueddate = this.setDateValue(this.supplierInfoVO.issueddate);
        }
      }
    })
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  goToPreviousComponent() {
    this.router.navigate(['/supplier-info']);

  }

  goToNextComponent() {
    this.router.navigate(['/supplier-address-details']);
  }

  showMsgWithoutNavigation() {
    this.type = 'danger';
    this.message = 'Supplier information should have atleast one record for navigating to next tab';
    this.scroll.scrollToPosition([0, 0]);
    return;
  }

  convertDateFormat(inputDate: string) {
    var date = moment(inputDate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    return date;
  }

  setDateValue(inputDate: string) {
    var date = moment(inputDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    return date;
  }

  close() {
    this.type = null;
  }
}