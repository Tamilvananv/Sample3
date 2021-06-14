import { Component, OnInit } from '@angular/core';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { isNullOrUndefined } from 'src/app/tools';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  type: string;
  message: string;
  loginObj: any;
  supplierId: string;
  tenderAuctionDetails = {
    auctionNumber: null,
    auctionName: null,
    auctionType: null,
    auctionPublishFromDate: null,
    auctionPublishToDate: null,
    auctionStartFromDate: null,
    auctionStartToDate: null,
    auctionEndFromDate: null,
    auctionEndToDate: null,
    subscribed: null
  }
  tenderAuctionDetailsList: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.supplierService.getTenderAuctionList(this.supplierId).subscribe((data: SupplierDataModel) => {
      if (!isNullOrUndefined(data.data)) {
        this.tenderAuctionDetailsList = data.data;
        this.masterData = JSON.parse(JSON.stringify(this.tenderAuctionDetailsList));

        if (this.masterData.length > 0) {
          this.recCount = 5;
          this.totalRecordsCount = this.masterData.length;
        }
        if (+this.recCount > 0) {
          this.tenderAuctionDetailsList = this.masterData.slice(0, +this.recCount);
          this.activePage = 1;
        }

      }
    })
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.tenderAuctionDetailsList = [];

    if (this.activePage == 1) {
      this.tenderAuctionDetailsList = this.masterData.slice(0, this.recCount);
    } else {
      this.tenderAuctionDetailsList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.tenderAuctionDetailsList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.tenderAuctionDetailsList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  saveAuctionDetails() {
    this.supplierService.saveTenderAuctionDetails(this.tenderAuctionDetails, this.supplierId).subscribe((data: SupplierDataModel) => {
      console.log(data.data);
    })
  }

  close(){
    this.type = null;
  }
  
}
