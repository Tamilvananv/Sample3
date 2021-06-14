import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FinalSupplierModel } from '../model/FinalSupplierModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-final-view',
  templateUrl: './final-view.component.html',
  styleUrls: ['./final-view.component.scss']
})
export class FinalViewComponent implements OnInit {
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  agreeTerms: boolean;
  type: string;
  message: string;
  loginObj: any;
  finalData: FinalSupplierModel = {
    agreeCheck: null,
    supplierId: null,
    submissionRefNo: null
  };
  isAlreadySaved: boolean;
  disableButtons: boolean;
  disableProgressTab: boolean;
  tabName: string;
  isSupplierUpdated: boolean;
  updatedSupplierId: string;
  isSupplierDataUpdated: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public supplierService: SupplierService,
    private procureCacheService: ProcureCacheService, public translate: TranslateService) { }

  ngOnInit(): void {

    this.tabName = "supplierFinal";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.procureCacheService.getSupIdForSupplierTabs();
    if (isNullOrUndefined(this.supplierId)) {
      this.supplierId = this.loginObj.supplierId;
    }
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.agreeTerms = true;
    console.log(this.agreeTerms);
    var prequaliStatus = this.procureCacheService.getQualifiedStatus();
    this.disableButtons = false;
    this.disableProgressTab = false;
    
    if(this.procureCacheService.getProfileUpdateSelected()==true) {
      this.disableProgressTab = true;
    }

    if(prequaliStatus==true) {
      this.procureCacheService.setSupplierTabsButtonDisabling(true);
      // this.disableButtons = true;
    }
    this.isAlreadySaved = true;


    this.isSupplierUpdated = this.supplierService.isSupplierDetailsUpdatedOrNot().isSupplierUpdated;
    this.updatedSupplierId = this.supplierService.isSupplierDetailsUpdatedOrNot().supplierID;
  
    if(this.updatedSupplierId == this.supplierId) {
      this.isSupplierDataUpdated = true;
    }
  }

  submitFinalSupplierDetails() {
    this.finalData.supplierId = this.supplierId;
    this.finalData.agreeCheck = this.agreeTerms;
    console.log(this.agreeTerms);
    this.supplierService.submitFinalSupplierDetails(this.finalData).subscribe((data: SupplierDataModel) => {

      if (data == null || data == undefined) {
        this.type = 'danger';
        this.message = 'Failed to submit the supplier details';
        return;
      }
      if (data.status != "OK") {
        this.type = 'danger';
        this.message = data.message;
        return;
      }
      this.type = 'info';
      // this.procureCacheService.setFinalRefNo(data.data.submissionRefNo);
      // this.procureCacheService.setPrequalificationStatus(true);
      this.procureCacheService.setQualifiedStatus(true);
      this.disableButtons = true;
     // this.message = 'Thanks for submitting the documents! Reference No.' + data.data.submissionRefNo + ' can be used for further communication';
    //  this.translate.instant('');
     var thanksSubmitMsg = this.translate.instant("Thanks-submit-msg");
     var thanksSubmitMsg1 = this.translate.instant("Thanks-submit");
     var thanksSubmitMsg2 = this.translate.instant("Thanks-submit1");     
     
     this.message = thanksSubmitMsg + thanksSubmitMsg1  + data.data.submissionRefNo + thanksSubmitMsg2;
      this.isAlreadySaved = true;
    });
  }

  goToPreviousComponent() {
    this.router.navigate(['/preview']);
  }

  close(){
    this.type = null;
  }
  
}
