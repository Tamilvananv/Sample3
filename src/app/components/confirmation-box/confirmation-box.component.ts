import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  content: string;

  confirmationBoxForm: any;
  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

  onYesClick() {    
    this.activeModal.close('Yes');
  }

  onNoClick() {
    this.activeModal.close('No');
  }
}
