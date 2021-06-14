import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tender-progress-bar',
  templateUrl: './tender-progress-bar.component.html',
  styleUrls: ['./tender-progress-bar.component.scss']
})
export class TenderProgressBarComponent implements OnInit,OnChanges {
  @Input() tabName: string;
  id: number;

  ngOnChanges(): void {
    console.log(this.tabName);
    
  }
  constructor() { }

  ngOnInit(): void {
    console.log(this.tabName);
    
    if(this.tabName == 'tenderDetails') {
      this.id = 1;
      return;
    }
    if(this.tabName == 'publicTenderDetails') {
      this.id = 2;
      return;
    }
    // if(this.tabName == 'supplierContact') {
    //   this.id = 3;
    //   return;
    // }
    if(this.tabName == 'postQueries') {
      this.id = 4;
      return;
    }
    if(this.tabName == 'publishedNotificationDetail') {
      this.id = 5;
      return;
    }
    if(this.tabName == 'tenderSubmission') {
      this.id = 6;
      return;
    }
    // if(this.tabName == 'tenderSubmission') {
    //   this.id = 7;
    //   return;
    // }
  }

}
