import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierContactDetails } from '../../../services/SupplierContactDetails';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { PaginationService } from 'src/app/services/pagination.service';
import { SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION } from 'src/app/services/ApplicationConstants';
import { SupplierInformationDropdownList } from 'src/app/services/SupplierInformationDropdownList';
import { NgForm } from '@angular/forms';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-supplier-contact-details',
  templateUrl: './supplier-contact-details.component.html',
  styleUrls: ['./supplier-contact-details.component.scss']
})

export class SupplierContactDetailsComponent implements OnInit {

  type: string;
  message: string;
  supplierContactDetails: SupplierContactDetails[] = [];
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  loginObj: any;

  supContactDetails: SupplierContactDetails = {
    supplierId: null,
    contactId: null,
    firstName: null,
    middleName: null,
    lastName: null,
    jobTitle: null,
    keyRole: null,
    mobile: null,
    phone: null,
    fax: null,
    email: null,
    userId: null,
    primary: null,
    deleteFlag: null,
    compId: null
  };
  isAlreadySaved: boolean;
  supplierData: SupplierContactDetails[] = [];
  @Input('supplierGridDataLength') gridCount: string;
  length: number;
  @Output() gridTotalPages: EventEmitter<any> = new EventEmitter();
  @Output() pageLength: EventEmitter<any> = new EventEmitter();
  pager: any = {};
  pagedItems: any[];
  pageNumber: number;
  disableButtons: boolean;
  disableProgressTab: boolean;
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  masterData: any[] = [];
  preQualificationStatus: string;
  supplierContactRoles: Array<any>;
  roleName: string;
  preQualiStatus: boolean;
  tabName: string;
  pageYoffset: number;

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
 }
  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private procureCacheService: ProcureCacheService, public paginationService: PaginationService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller) {
  }

  copyArrayList(src) {
    return Object.assign({}, src);
  }

  ngOnInit(): void {

    this.tabName = "supplierContact";
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

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }
    this.preQualiStatus = this.procureCacheService.getQualifiedStatus();
    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualiStatus == true) {
      this.disableButtons = true;
    }

    this.supplierService.getSupplierContactDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {

      this.supplierContactDetails = data.data;

      if (this.supplierContactDetails.length > 0) {
        this.isAlreadySaved = true;
      }

      if (!isNullOrUndefined(this.supplierContactRoles)) {

        this.masterData = JSON.parse(JSON.stringify(this.supplierContactDetails));

        if (this.masterData.length > 0) {
          this.recCount = 5;
          this.totalRecordsCount = this.masterData.length;
        }
        if (+this.recCount > 0) {
          this.supplierContactDetails = this.masterData.slice(0, +this.recCount);
          this.activePage = 1;
        }

        if (this.supplierContactDetails.length > 0) {
          this.setPage(1);
          return;
        }
      }
    });

    this.supplierService.getScoreCardStatus(this.langId, "9660").subscribe((roleData: SupplierDataModel) => {
      this.supplierContactRoles = roleData.data;

      if (!isNullOrUndefined(this.supplierContactRoles)) {
        this.supplierContactDetails.forEach(value => {
          this.roleName = this.getRoleName(value);
        });
      }
    });
  }

  displayActivePage(activePageNumber: number) {

    this.activePage = activePageNumber;
    this.supplierContactDetails = [];

    if (this.activePage == 1) {
      this.supplierContactDetails = this.masterData.slice(0, this.recCount);
    } else {
      this.supplierContactDetails = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
    }
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.supplierContactDetails = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  setPage(page: number) {
    this.pageNumber = page;

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.supplierContactDetails.length, page, this.length);

    // get current page of items
    this.pagedItems = this.supplierContactDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  editSavedAddress(event, supplierContact) {

    this.supContactDetails = this.copyArrayList(supplierContact);

    this.supplierContactDetails.forEach(contactData => {
      if (supplierContact.contactId == contactData.contactId) {
        this.supContactDetails.keyRole = this.supplierContactRoles.find(item => item.lovName === contactData.keyRole).lovId
      }
    })
    this.disableButtons = false;
  }

  gridLengthEvent(length) {
    this.length = +length;
    var totalpages = Math.ceil(this.supplierContactDetails.length / this.length);
    this.gridTotalPages.emit(totalpages.toString());
    this.gridPageLength();
  }

  gridPageLength() {
    this.pageLength.emit(this.length.toString());
  }

  saveContactDetails(contactDetailsForm: NgForm): void {

    if (isNullOrUndefined(this.supContactDetails.firstName) || this.supContactDetails.firstName == ""
      || isNullOrUndefined(this.supContactDetails.lastName) || this.supContactDetails.lastName == ""
      || isNullOrUndefined(this.supContactDetails.jobTitle) || this.supContactDetails.jobTitle == ""
      || isNullOrUndefined(this.supContactDetails.keyRole) || this.supContactDetails.keyRole == ""
      || isNullOrUndefined(this.supContactDetails.mobile) || this.supContactDetails.mobile == ""
      || isNullOrUndefined(this.supContactDetails.email) || this.supContactDetails.email == "") {
      this.type = 'danger';
      this.message = 'Please fill all the mandatory fields';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }
    this.supContactDetails.supplierId = this.supplierId;
    this.supContactDetails.userId = this.loginUserID;
    this.supContactDetails.compId = this.companyId;

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
        this.supplierService.saveSupplierContactDetails(this.supContactDetails, this.supplierId, submClsfn).subscribe((contactData: SupplierDataModel) => {

          if (contactData == null || contactData == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier address';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (contactData.status != "OK") {
            this.type = 'danger';
            this.message = contactData.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (!isNullOrUndefined(contactData.data.supplierContactList) || contactData.data.supplierContactList.length !== 0) {

            this.supplierContactDetails = contactData.data.supplierContactList;
            this.masterData = JSON.parse(JSON.stringify(this.supplierContactDetails));

            if (this.masterData.length > 0) {
              this.recCount = 5;
              this.totalRecordsCount = this.masterData.length;
            }
            if (+this.recCount > 0) {
              this.supplierContactDetails = this.masterData.slice(0, +this.recCount);
              this.activePage = 1;
            }
            this.type = 'success';
            this.message = contactData.message;
            this.isAlreadySaved = true;
            contactDetailsForm.reset();
            this.supplierService.setSupplierDetailsUpdated(this.supplierId,true);
          }
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });
  }

  callFunction(event, contactdata) {

    const contactId = contactdata.contactId;
    const supplierId = contactdata.supplierId;

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.deleteSupplierContactDetails(contactId, supplierId, this.langId).subscribe((data: SupplierDataModel) => {
          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to delete the supplier address';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
    
          this.supplierContactDetails = data.data;
          this.type = 'success';
          this.message = data.message;
          if (this.supplierContactDetails.length > 0) {
            this.isAlreadySaved = true;
          } else {
            this.isAlreadySaved = false;
          }
          this.supplierService.setSupplierDetailsUpdated(this.supplierId,true);
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result =='No') {
        // do nothing
      }
    });

    
  }
  goToPreviousComponent() {
    this.router.navigate(['/supplier-address-details']);
  }

  goToNextComponent() {
    this.router.navigate(['/supplier-financial-business']);
  }

  getRoleName(value) {
    if (!isNullOrUndefined(value.keyRole)) {
      return value.keyRole = this.supplierContactRoles.find(item => item.lovId === value.keyRole).lovName
    }
  }

  close(){
    this.type = null;
  }
  
}
