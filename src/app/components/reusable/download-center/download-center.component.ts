import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierAttachmentSection } from 'src/app/services/SupplierAttachmentSection';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}
@Component({
  selector: 'app-download-center',
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.scss']
})
export class DownloadCenterComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  isAlreadySaved: boolean;
 
  variationOrderId:string;
  supplierAttachmentSectionList: SupplierAttachmentSection[];

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.isAlreadySaved = false;
    this.variationOrderId = this.procureCacheService.getVariationOrderId();
    this.supplierService.getVariationOrderDocs(this.supplierId,this.variationOrderId)
    .subscribe((data: SupplierDataModel)=>{
      this.supplierAttachmentSectionList = data.data;
    })
      
  }

  downloadDoc(docId:string,docName:string){
    this.attachmentService.downloadDocuments(docName,'VariationOrder',this.supplierId)
      .subscribe((data)=>{
        const EXT = docName.substr(docName.lastIndexOf('.') + 1);
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
        this.supplierService.updateVariationOrderDownloadstatus(docId,this.variationOrderId, 
          this.supplierId, this.loginUserID).subscribe((data: SupplierDataModel)=>{
            this.supplierAttachmentSectionList = data.data;
          })
    },error => {
      // .... HANDLE ERROR HERE 
      console.log(error.message);
 })

  }

}
