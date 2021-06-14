import { Component, Input, OnInit } from '@angular/core';
import { BidBondDetails } from 'src/app/services/BidBondDetails';

@Component({
  selector: 'app-tender-bid-bond-details',
  templateUrl: './tender-bid-bond-details.component.html',
  styleUrls: ['./tender-bid-bond-details.component.scss']
})
export class TenderBidBondDetailsComponent implements OnInit {

  @Input() bidBondDetails:BidBondDetails;
  constructor() { }

  ngOnInit(): void {
    console.log(this.bidBondDetails);
  }

}
