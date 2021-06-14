import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input() totalRecords: number;
  @Input() recordsPerPage: number;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;
  disablePreviousBtn: boolean = false;
  disableNextBtn: boolean = false;

  ngOnInit(): void {
    this.disablePreviousBtn = true;
    this.disableNextBtn = false;
    this.activePage = 1;
  }

  ngOnChanges(): any {
    this.activePage = 1;
    this.prevNextBtnEnablingDisabling();
  }

  prevNextBtnEnablingDisabling() {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    console.log(this.activePage);
    console.log(pageCount);
    console.log(this.pages.length);


    // this.activePage = 1;
    if (this.activePage == pageCount) {
      this.disableNextBtn = true;
      this.disablePreviousBtn = false;
    }
    if (this.activePage == 1) {
      this.disablePreviousBtn = true;
      if (pageCount > 1) {
        this.disableNextBtn = false;
      } else {
        this.disableNextBtn = true;

      }

    }
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > this.recordsPerPage) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    console.log(pageNumber);

    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
      const pageCount = this.getPageCount();
      this.pages = this.getArrayOfPage(pageCount);
    }

    this.prevNextBtnEnablingDisabling();
  }
}
