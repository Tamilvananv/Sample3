import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationDocumentDetails } from 'src/app/services/NotificationDocumentDetails';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderMaster } from 'src/app/services/TenderMaster';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
} 
@Component({
  selector: 'app-published-notifications-detail',
  templateUrl: './published-notifications-detail.component.html',
  styleUrls: ['./published-notifications-detail.component.scss']
})
export class PublishedNotificationsDetailComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  publishedNotifyDetails:TenderMaster;
  publishedNotifyDocDtlsList: NotificationDocumentDetails[];
  tabName: string;
  
  constructor(public supplierService: SupplierService, 
     private procureCacheService: ProcureCacheService,
     private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.tabName = "publishedNotificationDetail";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

    this.supplierService.getNotificationDetails
    (this.procureCacheService.getTenderId(),this.supplierId)
        .subscribe((data: SupplierDataModel) => {      
      this.publishedNotifyDetails=data.data; 
      console.log(this.publishedNotifyDetails);
    });

    this.supplierService.getNotificationDocDetails
    (this.procureCacheService.getTenderId(),this.supplierId)
        .subscribe((data: SupplierDataModel) => {      
      this.publishedNotifyDocDtlsList=data.data; 
      console.log(this.publishedNotifyDocDtlsList);
    });

  }

  downloadDocument(docName) {
    console.log(docName);    
    this.attachmentService.downloadDocuments(docName,'Notification',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }
}
