import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierBankDetails } from '../../../services/SupplierBankDetails';
import { SupplierAddressDtl } from '../../../services/SupplierAddressDtl';
import { LovMaster } from '../../../services/LovMaster';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { SUBMISSION_CLASSIFICATION_ADD_REMOVE_SCOPE, SUBMISSION_CLASSIFICATION_PROFILE_UPDATES, SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION } from 'src/app/services/ApplicationConstants';
import { NgForm } from '@angular/forms';
import { ConfirmationBoxComponent } from '../../confirmation-box/confirmation-box.component';
import { DialogBoxService } from '../../dialog-box.service';
import { ViewportScroller } from '@angular/common';

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
  selector: 'app-supplier-bank-details',
  templateUrl: './supplier-bank-details.component.html',
  styleUrls: ['./supplier-bank-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SupplierBankDetailsComponent implements OnInit {

  supplierId: string;
  loginUserID: string;
  companyId: string;
  type: string;
  message: string;
  loginObj: any;
  supplierBankDetails: SupplierBankDetails[] = [];
  supplierBank: SupplierBankDetails;
  supplierCountryDtl: SupplierAddressDtl[];
  // supplierStatessDtl: SupplierAddressDtl[];  
  supplierStatessDtl = [{
    lovId: null,
    lovName: null,
    lovCode: null
  }];
  // supplierCorresStatesDtl: SupplierAddressDtl[];
  supplierCorresStatesDtl = [{
    lovId: null,
    lovName: null,
    lovCode: null
  }];
  loadBankRefDropdown: LovMaster[];
  langId: string;
  isAlreadySaved: boolean;
  supplierbank: SupplierBankDetails = {
    supplierId: null,
    bankId: null,
    bankName: null,
    branch: null,
    currencyCode: null,
    city: null,
    accountNumber: null,
    swiftCode: null,
    bankRefNum: null,
    bankRefNumName: null,
    refNum: null,
    correspondent: null,
    deleteFlag: null,
    corresBankId: null,
    corresBankName: null,
    corresBranch: null,
    corresCurrencyCode: null,
    corresCity: null,
    corresAccountNumber: null,
    corresSwiftCode: null,
    corresBankRefNum: null,
    corresBankRefNumName: null,
    corresRefNum: null,
    userId: null,
    compId: null,
    country: null,
    state: null,
    corresCountry: null,
    corresState: null,
    corresCountryId: null,
    corresStateId: null,
    countryId: null,
    stateId: null
  };
  disableButtons: boolean;
  disableProgressTab: boolean;
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  masterData: any;
  preQualificationStatus: string;
  bankDetails: SupplierBankDetails[];
  ctryId: string;
  stateId: string;
  coressCtryId: string;
  corresStateId: string;
  tabName: string;
  editFlag: number = 0;
  pageYoffset: number;

  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
 }
  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private procureCacheService: ProcureCacheService, private cdr: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService, private scroll: ViewportScroller) { }

  ngOnInit(): void {

    this.tabName = "supplierBank";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;
    this.getBankDetails();
    this.disableButtons = false;
    this.disableProgressTab = false;

    if (this.procureCacheService.getProfileUpdateSelected() == true) {
      this.disableProgressTab = true;
    }
    this.preQualificationStatus = this.procureCacheService.getPrequalificationStatus();

    if (!isNullOrUndefined(this.supplierBankDetails) && this.supplierBankDetails.length !== 0 && this.supplierBankDetails[0].bankName != null) {

      if (this.procureCacheService.getSupplierTabsButtonDisableStatus() == true || this.preQualificationStatus == '7001') {
        this.disableButtons = true;
      }
    }
    this.supplierService.loadCountryDropdown().subscribe((data: SupplierDataModel) => {

      this.supplierCountryDtl = data.data;
    })

    this.supplierService.loadStatesDropdown().subscribe((data: SupplierDataModel) => {

      this.supplierStatessDtl = data.data;
    })

    this.supplierService.loadBankRefDropdown(this.langId).subscribe((data: SupplierDataModel) => {
      console.log(data);
      this.loadBankRefDropdown = data.data.bankRefDropdown;
    })


  }

  getBankDetails() {

    this.supplierService.getSupplierBankDetails(this.supplierId, this.loginUserID, this.companyId, this.langId).then((data: SupplierDataModel) => {
      console.log(this.supplierId + '::' + this.loginUserID + '::' + this.companyId);
      this.supplierBank = data.data;
      console.log(this.supplierBank);

      this.masterData = JSON.parse(JSON.stringify(data.data));

      if (this.masterData.bankId != null || this.masterData.bankId != '' || this.masterData.bankId != undefined) {
        this.recCount = 5;
        this.totalRecordsCount = 1;
      }
      if (this.recCount > 0) {
        this.activePage = 1;
      }
      var i = 0;
      let bankDetails: SupplierBankDetails = {
        supplierId: '',
        bankId: '',
        bankName: '',
        branch: '',
        currencyCode: '',
        city: '',
        accountNumber: '',
        swiftCode: '',
        bankRefNum: '',
        corresBankRefNumName: '',
        bankRefNumName: '',
        refNum: '',
        correspondent: null,
        deleteFlag: '',
        corresBankId: '',
        corresBankName: '',
        corresBranch: '',
        corresCurrencyCode: '',
        corresCity: '',
        corresAccountNumber: '',
        corresSwiftCode: '',
        corresBankRefNum: '',
        corresRefNum: '',
        userId: '',
        compId: '',
        country: '',
        state: '',
        countryId: '',
        stateId: '',
        corresCountry: '',
        corresState: '',
        corresCountryId: '',
        corresStateId: ''
      };

      let corresBankDetails: SupplierBankDetails = {
        supplierId: '',
        bankId: '',
        bankName: '',
        branch: '',
        currencyCode: '',
        city: '',
        accountNumber: '',
        swiftCode: '',
        bankRefNum: '',
        corresBankRefNumName: '',
        bankRefNumName: '',
        refNum: '',
        correspondent: null,
        deleteFlag: '',
        corresBankId: '',
        corresBankName: '',
        corresBranch: '',
        corresCurrencyCode: '',
        corresCity: '',
        corresAccountNumber: '',
        corresSwiftCode: '',
        corresBankRefNum: '',
        corresRefNum: '',
        userId: '',
        compId: '',
        country: '',
        state: '',
        countryId: '',
        stateId: '',
        corresCountry: '',
        corresState: '',
        corresCountryId: '',
        corresStateId: ''
      };
      this.supplierBankDetails = [];
      if (this.supplierBank.correspondent == true && !(this.supplierBank.corresBankId == null || this.supplierBank.corresBankId == '')) {
        corresBankDetails.bankId = this.supplierBank.corresBankId;
        corresBankDetails.bankName = this.supplierBank.corresBankName;
        corresBankDetails.branch = this.supplierBank.corresBranch;
        corresBankDetails.bankRefNum = this.supplierBank.corresBankRefNum;
        corresBankDetails.bankRefNumName = this.supplierBank.corresBankRefNumName;
        corresBankDetails.accountNumber = this.supplierBank.corresAccountNumber;
        corresBankDetails.city = this.supplierBank.corresCity;
        corresBankDetails.refNum = this.supplierBank.corresRefNum;
        corresBankDetails.correspondent = true;
        corresBankDetails.swiftCode = this.supplierBank.corresSwiftCode;
        corresBankDetails.currencyCode = this.supplierBank.corresCurrencyCode;
        corresBankDetails.countryId = this.supplierBank.corresCountryId;
        corresBankDetails.stateId = this.supplierBank.corresStateId;
        corresBankDetails.state = this.supplierBank.state;
        this.supplierBankDetails.push(corresBankDetails);
      }
      console.log(this.supplierBank);
      console.log(bankDetails);


      bankDetails.bankId = this.supplierBank.bankId;
      bankDetails.bankName = this.supplierBank.bankName;
      bankDetails.branch = this.supplierBank.branch;
      bankDetails.bankRefNum = this.supplierBank.bankRefNum;
      bankDetails.bankRefNumName = this.supplierBank.bankRefNumName;
      bankDetails.accountNumber = this.supplierBank.accountNumber;
      bankDetails.city = this.supplierBank.city;
      bankDetails.refNum = this.supplierBank.refNum;
      bankDetails.correspondent = false;
      bankDetails.swiftCode = this.supplierBank.swiftCode;
      bankDetails.currencyCode = this.supplierBank.currencyCode;
      bankDetails.countryId = this.supplierBank.countryId;
      bankDetails.stateId = this.supplierBank.stateId;
      bankDetails.state = this.supplierBank.state;
      this.supplierBankDetails.push(bankDetails);
      console.log(this.supplierBankDetails);

      if (this.supplierBankDetails[0].bankName != null) {
        this.isAlreadySaved = true;
      }
    });
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
  }

  selectedGridCountChange(event) {
    this.recCount = event;
    this.activePage = 1;
  }

  saveBankDetails(bankDetailsForm: NgForm): void {
    console.log(bankDetailsForm);
    if (isNullOrUndefined(this.supplierbank.bankName) || this.supplierbank.bankName == ""
      || isNullOrUndefined(this.supplierbank.branch) || this.supplierbank.branch == ""
      || isNullOrUndefined(this.supplierbank.currencyCode) || this.supplierbank.currencyCode == ""
      || isNullOrUndefined(this.supplierbank.city) || this.supplierbank.city == ""
      || isNullOrUndefined(this.supplierbank.countryId) || this.supplierbank.countryId == ""
      || isNullOrUndefined(this.supplierbank.stateId) || this.supplierbank.stateId == ""
      || isNullOrUndefined(this.supplierbank.accountNumber) || this.supplierbank.accountNumber == ""
    ) {
      if (this.supplierbank.correspondent == true) {
        if (isNullOrUndefined(this.supplierbank.corresBankName) || this.supplierbank.corresBankName == "" ||
          isNullOrUndefined(this.supplierbank.corresCurrencyCode) || this.supplierbank.corresCurrencyCode == ""
          || isNullOrUndefined(this.supplierbank.corresCity) || this.supplierbank.corresCity == "") {
          this.type = 'danger';
          this.message = 'Please fill all the mandatory fields';
          this.scroll.scrollToPosition([0, 0]);
          return;
        }
      }
      this.type = 'danger';
      this.message = 'Please fill all the mandatory fields';
      this.scroll.scrollToPosition([0, 0]);
      return;
    }

    this.supplierbank.supplierId = this.supplierId;
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
        this.supplierService.saveSupplierBankDetails(this.supplierbank, this.supplierId, submClsfn).subscribe((data: SupplierDataModel) => {

          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier bank details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (isNullOrUndefined(data.data) || data.data.length == 0) {
            this.type = 'danger';
            this.message = 'Failed to save the supplier bank details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          this.type = 'success';
          this.message = data.message;
          this.isAlreadySaved = true;
          // this.getBankDetails();
          bankDetailsForm.reset();
          this.getBankDetails();
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });

  }


  callFunction(event, bankdata) {
    console.log(bankdata);
    const supplierId = this.supplierId;
    const bankId = bankdata.bankId;

    const modalRef = this.dialogBoxService.openSupplierSaveConfirmation(ConfirmationBoxComponent, 'Confirmation', 'Are you sure to save the change?');
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.supplierService.deleteSupplierBankDetails(supplierId, bankId).subscribe((data: SupplierDataModel) => {
          if (data == null || data == undefined) {
            this.type = 'danger';
            this.message = 'Failed to delete the supplier bank details';
            this.scroll.scrollToPosition([0, 0]);
            return;
          }
          if (data.status != "OK") {
            this.type = 'danger';
            this.message = data.message;
            this.scroll.scrollToPosition([0, 0]);
            return;
          }

          this.getBankDetails();
          this.type = 'success';
          this.message = data.message;
          this.supplierService.setSupplierDetailsUpdated(this.supplierId, true);
          return;
        });
        this.scroll.scrollToPosition([0, 0]);
      } else if (result == 'No') {
        // do nothing
      }
    });
  }

  onChangeCountry(countryId: string) {
    // for (var supplierinfo of this.bankDetails) {
    //   console.log(supplierinfo.stateId);
    //   console.log(this.stateId);

      if (this.editFlag == 0) {
        this.supplierbank.stateId = undefined;
        this.supplierbank.state = undefined;
        this.ctryId = undefined;
        this.stateId = undefined;
        // if (isNullOrUndefined(supplierinfo.stateId) && supplierinfo.stateId != "") {
        if (countryId != this.ctryId || (this.ctryId != "IN")) {

          this.supplierService.loadStates(countryId).subscribe((data: SupplierDataModel) => {

            this.supplierStatessDtl = data.data;
            if (this.supplierbank.stateId) {
              var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierbank.stateId).lovId;
              console.log(this.supplierbank);
              this.supplierbank.stateId = stateId;
            }
          })
        }

        if (countryId == "UAE" || (this.ctryId == "UAE" && (!isNullOrUndefined(this.stateId)))) {
          if (this.supplierbank.stateId) {
            var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierbank.stateId).lovId;
            console.log(this.supplierbank);
            this.supplierbank.stateId = stateId;
            console.log(this.supplierbank);
          }
        }
      // }
    }
    this.editFlag = 0;
  }
  onChangeCorresCountry(countryId: string) {

    if (countryId != this.coressCtryId || (this.coressCtryId != "IN")) {

      this.supplierService.loadStates(countryId).subscribe((data: SupplierDataModel) => {

        this.supplierCorresStatesDtl = data.data;

        if (this.supplierbank.corresStateId) {
          var stateId = this.supplierCorresStatesDtl.find(item => item.lovId === this.supplierbank.corresStateId).lovId;
          console.log(this.supplierbank);
          this.supplierbank.corresState = stateId;
        }
      })
    }
    if (countryId == "UAE" || (this.coressCtryId == "UAE" && (!isNullOrUndefined(this.corresStateId)))) {
      if (this.supplierbank.stateId) {
        var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierbank.corresStateId).lovId;
        console.log(this.supplierbank);
        this.supplierbank.corresStateId = stateId;
        console.log(this.supplierbank);
      }
    }
  }

  editSavedBankDetails(event, supplierBankList: SupplierBankDetails[]) {
    this.editFlag = 1;
    this.bankDetails = supplierBankList;
    for (var supplierinfo of supplierBankList) {
      if (supplierinfo.correspondent) {
        this.supplierbank.correspondent = true;
        this.supplierbank.corresAccountNumber = supplierinfo.corresAccountNumber;
        this.supplierbank.corresBankId = supplierinfo.corresBankId;
        this.supplierbank.corresBranch = supplierinfo.corresBranch;
        this.supplierbank.corresBankName = supplierinfo.corresBankName;
        this.supplierbank.corresBankRefNum = supplierinfo.corresBankRefNum;
        this.supplierbank.corresRefNum = supplierinfo.corresRefNum;
        this.supplierbank.corresCurrencyCode = supplierinfo.corresCurrencyCode;
        this.supplierbank.corresCity = supplierinfo.corresCity;
        this.supplierbank.corresSwiftCode = supplierinfo.corresSwiftCode;
        this.supplierbank.corresCountryId = supplierinfo.corresCountryId;
        if (!isNullOrUndefined(supplierinfo.corresCountryId) && supplierinfo.corresCountryId != '') {
          this.onChangeCorresCountry(supplierinfo.corresCountryId);
        }
        this.supplierbank.corresStateId = supplierinfo.corresStateId;
        this.supplierbank.corresState = supplierinfo.corresState;

        this.coressCtryId = supplierinfo.corresCountryId;
        this.corresStateId = supplierinfo.corresStateId;

      } else {
        this.supplierbank.accountNumber = supplierinfo.accountNumber;
        this.supplierbank.bankId = supplierinfo.bankId;
        this.supplierbank.branch = supplierinfo.branch;
        this.supplierbank.bankName = supplierinfo.bankName;
        this.supplierbank.bankRefNum = supplierinfo.bankRefNum;
        this.supplierbank.refNum = supplierinfo.refNum;
        this.supplierbank.currencyCode = supplierinfo.currencyCode;
        this.supplierbank.city = supplierinfo.city;
        this.supplierbank.swiftCode = supplierinfo.swiftCode;
        this.supplierbank.countryId = supplierinfo.countryId;
        if (!isNullOrUndefined(supplierinfo.countryId) && supplierinfo.countryId != '') {
          this.onChangeCountry(supplierinfo.countryId);
        }
        this.supplierbank.stateId = supplierinfo.stateId;
        this.supplierbank.state = supplierinfo.state;
        this.supplierbank.bankRefNum = supplierinfo.bankRefNum;
        this.supplierBank.bankRefNumName = supplierinfo.bankRefNumName;

        console.log(supplierinfo);
        console.log(this.supplierbank);

        this.ctryId = supplierinfo.countryId;
        this.stateId = supplierinfo.stateId;
      }
      if (this.ctryId == "UAE" && (!isNullOrUndefined(this.stateId))) {
        this.supplierService.loadStates(this.ctryId).subscribe((data: SupplierDataModel) => {
         if (this.supplierbank.stateId) {

          this.supplierStatessDtl = data.data;
          if (this.supplierbank.stateId) {
            var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierbank.stateId).lovId;
            console.log(this.supplierbank);
            this.supplierbank.stateId = stateId;
          }
        }
        })
      
        // if (this.supplierbank.stateId) {
        //   var stateId = this.supplierStatessDtl.find(item => item.lovId === this.supplierbank.stateId).lovId;
        //   console.log(this.supplierbank);
        //   this.supplierbank.stateId = stateId;
        //   console.log(this.supplierbank);
        // }
      }
      console.log(this.supplierbank);
    }

  }

  goToPreviousComponent() {
    this.router.navigate(['/supplier-financial-business']);
  }

  goToNextComponent() {
    if (this.procureCacheService.getPrequalificationStatus() !== '7003') {
      this.router.navigate(['/supplier-category-scope']);
    } else {
      this.router.navigate(['/attachment-section']);
    }
  }

  close(){
    this.type = null;
  }
  
}
