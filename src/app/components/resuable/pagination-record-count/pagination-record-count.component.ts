import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-record-count',
  templateUrl: './pagination-record-count.component.html',
  styleUrls: ['./pagination-record-count.component.scss']
})

export class PaginationRecordCountComponent implements OnInit {

  @Output() selectedGridCount: EventEmitter<any> = new EventEmitter();
  recordsPerPage: number = 5;
  @Input() totalRec: number;
  // recordsPerPage

  constructor() { }

  ngOnInit() {
    // this.selectedGridCount.emit(this.recordsPerPage);
    console.log(this.totalRec);
    
  }


  selectChange(event) {
    console.log(this.recordsPerPage);
    
    this.selectedGridCount.emit(this.recordsPerPage);

  }

}
