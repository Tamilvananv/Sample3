import { Component, EventEmitter, HostListener, OnInit, Output, SimpleChanges } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierAddressDtl } from '../../../services/SupplierAddressDtl';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION } from 'src/app/services/ApplicationConstants';
import { DialogBoxService } from '../../dialog-box.service';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-supplier-address-details',
  templateUrl: './supplier-address-details.component.html',
  styleUrls: ['./supplier-address-details.component.scss']
})
export class SupplierAddressDetailsComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  supplierAddressDtl: SupplierAddressDtl[];
  supplierCountryDtl = [{
    lovId: null,
    lovName: null,
    lovCode: null
  }];
  supplierStatessDtl = [{
    lovId: null,
    lovName: null,
    lovCode: null
  }];
  supplierDetails: SupplierAddressDtl = {
    status: null,
    supplierId: null,
    siteName: null,
    address1: null,
    address2: null,
    poBox: null,
    address3: null,
    city: null,
    state: null,
    ctryId: null,
    stateId: null,
    country: null,
    pin: null,
    phone: null,
    fax: null,
    email: null,
    deleteFlag: null,
    userId: null,
    compId: null,
    createdDate: null,
    modifiedDate: null,
    addressId: null,
    isMainOffice: null,
    companyCountry: null
  };

  createAccountForm: FormGroup;
  countries: {};
  states: {};
  supplierId: string;
  loginUserID: string;
  companyId: string;
  type: string;
  message: string;
  langId: string;
  SUPPLIERS: SupplierAddressDtl[];
  page = 1;
  pageSize = 5;
  loginObj: any;
  isAlreadySaved: boolean;
  disableButtons: boolean;
  disableProgressTab: boolean;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  preQualificationStatus: string;
  preQualiStatus: boolean;
  ctryId: string;
  stateId: string;
  tabName: string;
  form: any;
  invalidMessage: string;
  invalidFlag: boolean;
  pageYoffset: number;
  editFlag: number = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller) { }

  copyArrayList(src) {
    return Object.assign({}, src);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'].currentValue) {
      this.disableProgressTab = changes['items'].currentValue;
    }
  }

  ngOnInit(): void {

    this.tabName = "supplierAddress";
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
    this.invalidMessage = null;
    this.invalidFlag = false;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }
    this.preQualiStatus = this.procureCacheService.getQualifiedStatus();
    if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualiStatus == true) {
      this.disableButtons = true;
    }

    this.supplierService.getSupplierAddressDetails(this.supplierId, this.loginUserID, this.companyId).then((data: SupplierDataModel) => {
      this.supplierAddressDtl = data.data;
      this.masterData = JSON.parse(JSON.stringify(data.data));

      if (this.supplierAddressDtl.length !== 0 && this.supplierAddressDtl[0].siteName != null) {
        this.isAlreadySaved = true;
      }

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.supplierAddressDtl = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
    })

    this.supplierService.loadCountryDropdown().subscribe((data: SupplierDataModel) => {
      this.supplierCountryDtl = data.data;
    })

    this.supplierService.loadStatesDropdown().subscribe((data: SupplierDataModel) => {
      this.supplierStatessDtl = data.data;
    })
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.supplierAddressDtl = [];

    if (this.activePage == 1) {
      this.supplierAddressDtl = this.masterData.slice(0, this.recCount);
    } else {
      this.supplierAddressDtl = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
  }

  selectedGridCountChange(event) {
    this.recCount = event;
    this.supplierAddressDtl = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  onChangeCountry(countryId: string) {

    if (this.editFlag == 0) {
      this.supplierDetails.stateId = undefined;
      this.supplierDetails.state = undefined;
      this.ctryId = undefined;
      this.stateId = undefined;

      if (countryId != this.ctryId || (this.ctryId != "IN")) {
        this.supplierService.loadStates(countryId).subscribe((data: SupplierDataModel) => {
          if (!isNullOrUndefined(data.data)) {
            this.supplierStatessDtl = data.data;
          }
        })
      }
      if (countryId == "UAE" || (this.ctryId == "UAE" && (!isNullOrUndefined(this.stateId)))) {
        if (this.supplierDetails.stateId) {
          var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovId;
          this.supplierDetails.stateId = stateId;
        }
      }
    } else {
      if (countryId == "UAE") {
        if (this.supplierDetails.stateId) {
          if ((this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId)) != undefined) {
            var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovId;
          } else {
            this.supplierService.loadStates(countryId).subscribe((data: SupplierDataModel) => {
              if (!isNullOrUndefined(data.data)) {
                this.supplierStatessDtl = data.data;
                var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovId;
              }
              this.supplierDetails.stateId = stateId;
            });
          }
        }
      }

      if (countryId == "IN") {
        if (this.supplierDetails.stateId) {
          if ((this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId)) != undefined) {
            var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovId;
          } else {
            this.supplierService.loadStates(countryId).subscribe((data: SupplierDataModel) => {
              if (!isNullOrUndefined(data.data)) {
                this.supplierStatessDtl = data.data;
                var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovId;
              }
              this.supplierDetails.stateId = stateId;
            });
          }
        }
      }

    }
    this.editFlag = 0;
  }

  saveAddressDetails(addressDetailsForm: NgForm): void {

    this.type = '';
    this.message = '';
    console.log(this.supplierDetails);

    if (isNullOrUndefined(this.supplierDetails.siteName) || this.supplierDetails.siteName == ""
      || isNullOrUndefined(this.supplierDetails.address1) || this.supplierDetails.address1 == ""
      || isNullOrUndefined(this.supplierDetails.ctryId) || this.supplierDetails.ctryId == ""
      || isNullOrUndefined(this.supplierDetails.stateId) || this.supplierDetails.stateId == "") {
      this.type = 'danger';
      this.message = 'Please fill all the mandatory fields';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }
    this.supplierDetails.country = this.supplierCountryDtl.find(item => item.lovId === this.supplierDetails.ctryId).lovName;

    this.supplierDetails.state = this.supplierStatessDtl.find(item => item.lovId === this.supplierDetails.stateId).lovName;

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
        this.supplierService.saveSupplierAddressDetails(this.supplierDetails, +this.supplierId, this.loginUserID, this.companyId, submClsfn).subscribe((data: SupplierDataModel) => {

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
          this.supplierAddressDtl = data.data;
          this.masterData = [];
          this.masterData = JSON.parse(JSON.stringify(data.data));
          if (this.masterData.length > 0) {
            this.totalRecordsCount = this.masterData.length;
          }
          if (+this.recCount > 0) {
            this.supplierAddressDtl = this.masterData.slice(0, +this.recCount);
            this.activePage = 1;
          }
          this.type = 'success';
          this.message = data.message;
          this.isAlreadySaved = true;
          console.log(this.isAlreadySaved);
          addressDetailsForm.reset();
          this.editFlag = 0;
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }

    })
  }

  editSavedAddress(event, supplierinfo) {
    this.editFlag = 1;

    this.supplierDetails = this.copyArrayList(supplierinfo);
    this.ctryId = supplierinfo.ctryId;
    this.stateId = supplierinfo.stateId;
    console.log(this.supplierDetails);
    this.onChangeCountry(this.supplierDetails.ctryId);
  }

  deleteSelectedAddressDetails(event, addressdata) {

    const addressId = addressdata.addressId;
    const supplierId = addressdata.supplierId;

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.deleteSupplierAddressDetails(addressId, supplierId).subscribe((data: SupplierDataModel) => {

          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to delete the supplier address';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          if (isNullOrUndefined(data.data) || data.data.length == 0) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier address details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.supplierAddressDtl = data.data;
          this.type = 'success';
          this.message = data.message;
          
          if(this.supplierAddressDtl.length !== 0 && this.supplierAddressDtl[0].siteName != null) {
            this.isAlreadySaved = true;
          } else {
            this.isAlreadySaved = false;
          }
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });
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
    this.router.navigate(['/supplier-information']);
  }

  goToNextComponent() {
    this.router.navigate(['/supplier-contact-details']);
  }

  close() {
    this.type = null;
  }

}
