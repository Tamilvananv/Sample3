import { Component, Input, OnInit } from '@angular/core';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderMaster } from 'src/app/services/TenderMaster';

@Component({
  selector: 'app-tender-timelines',
  templateUrl: './tender-timelines.component.html',
  styleUrls: ['./tender-timelines.component.scss']
})
export class TenderTimelinesComponent implements OnInit {

  @Input() tenderDtls:TenderDetails;
  constructor() { }

  ngOnInit(): void {
    console.log(this.tenderDtls);
  }

}
