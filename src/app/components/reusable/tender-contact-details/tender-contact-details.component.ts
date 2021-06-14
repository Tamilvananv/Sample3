import { Component, Input, OnInit } from '@angular/core';
import { TenderMaster } from 'src/app/services/TenderMaster';

@Component({
  selector: 'app-tender-contact-details',
  templateUrl: './tender-contact-details.component.html',
  styleUrls: ['./tender-contact-details.component.scss']
})
export class TenderContactDetailsComponent implements OnInit {

  @Input() tenderContact:TenderMaster;
  constructor() { }

  ngOnInit(): void {
    console.log(this.tenderContact);
  }

}
