import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SupplierInformationComponent } from './supplier/supplier-information/supplier-information.component';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal) { }

  openSupplierSaveConfirmation(componentType: any, title: string, content: string) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    const modalRef = this.modalService.open(componentType, ngbModalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    return modalRef;
  }
}
