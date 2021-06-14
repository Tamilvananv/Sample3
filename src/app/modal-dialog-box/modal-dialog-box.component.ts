import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dialog-box',
  templateUrl: './modal-dialog-box.component.html',
  styleUrls: ['./modal-dialog-box.component.scss']
})
export class ModalDialogBoxComponent implements OnInit {

  @Input()
  title : string;

  @Input()
  bodyContent : string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
