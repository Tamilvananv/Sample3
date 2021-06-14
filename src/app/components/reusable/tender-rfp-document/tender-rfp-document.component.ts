import { Component, Input, OnInit } from '@angular/core';
import { RfpDocuments } from 'src/app/services/RfpDocuments';
import { SupplierService } from 'src/app/services/supplier.service';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-tender-rfp-document',
  templateUrl: './tender-rfp-document.component.html',
  styleUrls: ['./tender-rfp-document.component.scss']
})
export class TenderRfpDocumentComponent implements OnInit {

  @Input() rfpDocList:RfpDocuments[];
  constructor(public procureCacheService: ProcureCacheService,public supplierService:SupplierService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    console.log(this.rfpDocList);
  }
  downloadDocument(docName) {
    console.log(docName);    
    this.attachmentService.downloadDocuments(docName,'RFP-Downloads',this.procureCacheService.getSupplierId()).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }
}
