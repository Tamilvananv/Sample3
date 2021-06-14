import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-search',
  templateUrl: './tender-search.component.html',
  styleUrls: ['./tender-search.component.scss']
})
export class TenderSearchComponent implements OnInit {
  type: string;
  message: string;
  masterData: any[] = [];
  activePage: number;
  recCount: number = 0;
  totalRecordsCount: number;
  tenderSearchList = [];

  constructor() { }

  ngOnInit(): void {
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.tenderSearchList = [];

    if (this.activePage == 1) {
      this.tenderSearchList = this.masterData.slice(0, this.recCount);
    } else {
      this.tenderSearchList = this.masterData.slice(this.recCount * (this.activePage - 1), this.recCount * this.activePage);
      console.log(this.recCount * (this.activePage - 1), this.recCount * this.activePage);

    }
    console.log(this.tenderSearchList);
  }


  selectedGridCountChange(event) {
    this.recCount = event;
    this.tenderSearchList = this.masterData.slice(0, +this.recCount);
    this.activePage = 1;
  }

  close(){
    this.type = null;
  }
  
}
