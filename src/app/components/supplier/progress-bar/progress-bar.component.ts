import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit,OnChanges {

  @Input() isAlreadySaved: boolean;
  @Input() disableTab: boolean;
  @Input() supplierTabName: string;
  id: number;
  
  constructor() { }
  
  ngOnChanges(): void {
    console.log(this.isAlreadySaved);
    console.log(this.disableTab);
    console.log(this.supplierTabName);
  }
  ngOnInit(): void {
    console.log(this.isAlreadySaved);
    console.log(this.disableTab);
    console.log(this.supplierTabName);
    
    if(this.supplierTabName == 'supplierInformation') {
      this.id = 1;
      return;
    }
    if(this.supplierTabName == 'supplierAddress') {
      this.id = 2;
      return;
    }
    if(this.supplierTabName == 'supplierContact') {
      this.id = 3;
      return;
    }
    if(this.supplierTabName == 'supplierFinancial') {
      this.id = 4;
      return;
    }
    if(this.supplierTabName == 'supplierBank') {
      this.id = 5;
      return;
    }
    if(this.supplierTabName == 'supplierCategory') {
      this.id = 6;
      return;
    }
    if(this.supplierTabName == 'supplierAttachment') {
      this.id = 7;
      return;
    }
    if(this.supplierTabName == 'supplierPreview') {
      this.id = 8;
      return;
    }
    if(this.supplierTabName == 'supplierFinal') {
      this.id = 9;
      return;
    }
  }

}
