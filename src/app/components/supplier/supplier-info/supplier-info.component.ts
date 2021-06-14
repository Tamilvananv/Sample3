import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../services/supplier';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierDataModel } from '../model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { PaginationRecordCountComponent } from '../../resuable/pagination-record-count/pagination-record-count.component';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})

export class SupplierInfoComponent implements OnInit {

  suppliers = []; //Array of supplier
  supplierId: string;
  loginUserID: string;
  companyId: string;
  loginObj: any;
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  masterData: any[] = [];

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute,
    private procureCacheService: ProcureCacheService, private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked() {
      this.cdRef.detectChanges();
    }

  ngOnInit() {

    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.procureCacheService.setFinalRefNo(null);

    this.supplierService.getAll(this.supplierId, this.loginUserID, this.companyId).subscribe((data: SupplierDataModel) => {
    
      this.masterData = JSON.parse(JSON.stringify(data.data));

      if(this.masterData.length > 0) {    
        this.recCount = 5;
      }
      if (+this.recCount > 0) {
        this.suppliers = this.masterData.slice(0, +this.recCount);
        this.activePage = 1;
      }
      
      if (this.masterData.length == 0) {
        this.router.navigate(['/supplier-information']);
      } else {
        this.totalRecordsCount = this.masterData.length;
      }
    })
        
  }

  setSupplierId(supplierId: string,compId: string) {    
    this.procureCacheService.setSupplierId(supplierId);
    this.procureCacheService.setCompId(compId);
    this.router.navigate(['/supplier-information']);
  }

  openPreviewPage(supplierId: string,compId: string) {    
    this.procureCacheService.setSupplierId(supplierId);
    this.procureCacheService.setCompId(compId);
    this.router.navigate(['/supplier-registration-preview-page']);
  }

  selectedGridCountChange(event) {
     this.recCount = event;
    this.suppliers = this.masterData.slice(0, +this.recCount);   
    this.activePage = 1;        
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.suppliers = [];

      if(this.activePage == 1) {
        this.suppliers = this.masterData.slice(0,this.recCount);
      } else {
        this.suppliers = this.masterData.slice(this.recCount*(this.activePage-1),this.recCount*this.activePage);        
      }
  }

}


