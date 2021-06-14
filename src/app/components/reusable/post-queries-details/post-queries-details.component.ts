import { Component, OnInit } from '@angular/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { saveAs } from 'file-saver';
import { isNullOrUndefined } from 'src/app/tools';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-post-queries-details',
  templateUrl: './post-queries-details.component.html',
  styleUrls: ['./post-queries-details.component.scss']
})
export class PostQueriesDetailsComponent implements OnInit {
  langId: string;
  supplierId: string;
  categoryDropdown: any;
  postQueriesDetails = {
    postQueriesCategory: null,
    rfpDocumentRef: null,
    question: null
  }

  type: string;
  message: string;

  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.langId = this.procureCacheService.getLangId();
    this.supplierId = this.procureCacheService.getSupplierId();
    this.supplierService.getScoreCardStatus(this.langId, "8070").subscribe((preQualificationData: SupplierDataModel) => {
      this.categoryDropdown = preQualificationData.data;
      console.log(this.categoryDropdown);
      
    })
  }

  downloadDocument(docName){
    this.attachmentService.downloadDocuments(docName,'preview',this.supplierId).subscribe((data)=>{
      const EXT = docName.substr(docName.lastIndexOf('.') + 1); 
      saveAs(new Blob([data], {type: MIME_TYPES[EXT]}), docName);     
    })
  }

  deleteSelectedQueryDetails($event, queryDetails) {
    
    const addressId = queryDetails.addressId;
    const supplierId = queryDetails.supplierId;

    this.supplierService.deleteSupplierAddressDetails(addressId, supplierId).subscribe((data: SupplierDataModel) => {

      if (data == null || data == undefined) {
        this.type = 'error';
        this.message = 'Failed to delete the supplier address';
        return;
      }

      if(isNullOrUndefined(data.data) || data.data.length==0) {
        this.type = 'error';
        this.message = 'Failed to save the supplier address details';
        return;
      }
      if (data.status != "OK") {
        this.type = 'error';
        this.message = data.message;
        return;
      }
      this.postQueriesDetails = data.data;
      this.type = 'success';
      this.message = data.message;
    });
  }

}
