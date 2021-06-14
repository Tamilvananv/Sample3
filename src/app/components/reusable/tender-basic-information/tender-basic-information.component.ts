import { Component, Input, OnInit } from '@angular/core';
import { TenderMaster } from 'src/app/services/TenderMaster';

@Component({
  selector: 'app-tender-basic-information',
  templateUrl: './tender-basic-information.component.html',
  styleUrls: ['./tender-basic-information.component.scss']
})
export class TenderBasicInformationComponent implements OnInit {

  @Input() tenderMaster:TenderMaster
  constructor() { }

  ngOnInit(): void {
  }

}
