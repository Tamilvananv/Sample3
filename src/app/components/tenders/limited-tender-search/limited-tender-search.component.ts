import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-limited-tender-search',
  templateUrl: './limited-tender-search.component.html',
  styleUrls: ['./limited-tender-search.component.scss']
})
export class LimitedTenderSearchComponent implements OnInit {
  type: string;
  message: string;
  limitedTenderSearchDetails: any;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.limitedTenderSearchDetails = [];

    if (this.activePage == 1) {
      this.limitedTenderSearchDetails = this.masterData.slice(0, this.recCount);
    } else {
      this.limitedTenderSearchDetails = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.limitedTenderSearchDetails);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.limitedTenderSearchDetails = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  close(){
    this.type = null;
  }
  
}
