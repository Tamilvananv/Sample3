import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-tender-detail',
  templateUrl: './public-tender-detail.component.html',
  styleUrls: ['./public-tender-detail.component.scss']
})
export class PublicTenderDetailComponent implements OnInit {

  @Input() tenderMasterDtl;
  constructor() { }

  ngOnInit(): void {
    
  }

}
