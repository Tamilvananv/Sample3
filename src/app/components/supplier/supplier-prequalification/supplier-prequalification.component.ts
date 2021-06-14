import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';

@Component({
  selector: 'app-supplier-prequalification',
  templateUrl: './supplier-prequalification.component.html',
  styleUrls: ['./supplier-prequalification.component.scss']
})
export class SupplierPrequalificationComponent implements OnInit {
  supplierId: string;
  loginUserID: string;
  companyId: string;
  langId: string;
  loginObj: any;
  suppliers: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  constructor(public supplierService: SupplierService,
    private router: Router, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.supplierId = this.procureCacheService.getSupplierId();
    // this.supplierId = "901";
    this.loginUserID = this.procureCacheService.getLoginUserID();
    this.companyId = this.procureCacheService.getCompanyId();


    // this.supplierService.getSupplierReviewDetails(this.supplierId).subscribe((data: SupplierDataModel) => {
    //   console.log(data);
    // })

    this.supplierService.getAll(this.supplierId, this.loginUserID, this.companyId).subscribe((data: SupplierDataModel) => {
      this.suppliers = data.data;
      this.masterData = JSON.parse(JSON.stringify(data.data));

      if (this.masterData.length > 0) {
        this.recCount = 5;
        this.totalRecordsCount = this.masterData.length;
      }
      if (+this.recCount > 0) {
        this.suppliers = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
      console.log(this.suppliers);
      // if (this.suppliers.length == 0) {
      // this.router.navigate(['/supplier-information', this.supplierId, this.loginUserID, this.companyId, this.langId]);
      // this.router.navigate(['/supplier-information']);
      // }
    })

  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.suppliers = [];

    if (this.activePage == 1) {
      this.suppliers = this.masterData.slice(0, this.recCount);
    } else {
      this.suppliers = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.suppliers);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.suppliers = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  getSupplierDetails(supplierData) {
    console.log(supplierData);
    this.supplierId = supplierData.supplierId;
    this.procureCacheService.setSupplierPreQualDetails(supplierData.supplierId, supplierData.supplierNameInEnglish,
      supplierData.tradelicenseno, supplierData.submittedDate, supplierData.submissionClassification,
      supplierData.parentCategory, supplierData.childCategory, supplierData.subCategory);
    this.router.navigate(['/company-score-card'])
  }

}
