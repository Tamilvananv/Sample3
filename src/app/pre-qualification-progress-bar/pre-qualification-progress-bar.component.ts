import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pre-qualification-progress-bar',
  templateUrl: './pre-qualification-progress-bar.component.html',
  styleUrls: ['./pre-qualification-progress-bar.component.scss']
})
export class PreQualificationProgressBarComponent implements OnInit {
  @Input() supplierTabName: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.supplierTabName);
    
  }

}
