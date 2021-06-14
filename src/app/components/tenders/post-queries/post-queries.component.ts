import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostQueriesNotification } from 'src/app/services/PostQueriesNotification';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { isNullOrUndefined } from 'src/app/tools';
import { saveAs } from 'file-saver';
import { PostQueriesList } from 'src/app/services/PostQueriesList';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-post-queries',
  templateUrl: './post-queries.component.html',
  styleUrls: ['./post-queries.component.scss']
})
export class PostQueriesComponent implements OnInit {

  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  postQueriesTenderDtls: PostQueriesNotification;
  postQueriesNotificationList: PostQueriesNotification[];
  postQueriesList:PostQueriesList;
  categoryDropdown: any;
  postDetailSNo: number;
  postQueriesDetails:PostQueriesNotification[];
  fileName: string;
  type: string;
  message: string;
  tabName: string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.tabName = "postQueries";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.postQueriesDetails=[];
    this.postQueriesList=new PostQueriesList();
    let postQuery:PostQueriesNotification=new PostQueriesNotification() ;
    postQuery.serialNo="1";
    this.postQueriesDetails.push(postQuery);
    
    console.log(this.postQueriesDetails);
    this.supplierService.getPostQueriesTenderDetails(this.supplierId, this.procureCacheService.getTenderId())
      .subscribe((data: SupplierDataModel) => {
        this.postQueriesTenderDtls = data.data;
        console.log(this.postQueriesTenderDtls);
      });

    this.supplierService.getSubmittedQueries
      (this.procureCacheService.getTenderId(), this.supplierId)
      .subscribe((data: SupplierDataModel) => {
        this.postQueriesNotificationList = data.data.postQueriesNotiList;
        console.log(this.postQueriesNotificationList);
      });

    this.langId = this.procureCacheService.getLangId();
    this.supplierService.getScoreCardStatus(this.langId, "8070").subscribe(
      (preQualificationData: SupplierDataModel) => {
      this.categoryDropdown = preQualificationData.data;
      console.log(this.categoryDropdown);

    })
  }

  downloadDocument(docName) {
    this.attachmentService.downloadDocuments(docName, 'PostQueries',this.supplierId).subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    })
  }

  deleteSelectedQueryDetails($event, queryDetails) {
     console.log(queryDetails);
     console.log(this.postQueriesDetails);
     const index=this.postQueriesDetails.indexOf(queryDetails,0);
     if (index > -1) {
      this.postQueriesDetails.splice(index, 1);
      }
      console.log(this.postQueriesDetails);
    }     

  addItem() {
    let postQuery:PostQueriesNotification=new  PostQueriesNotification();
    postQuery.serialNo=''+(this.postQueriesDetails.length+1);
    console.log(this.categoryDropdown);
    this.postQueriesDetails.push(postQuery);
  }

submitPostQueries(){
  this.postQueriesList.postQueriesNotiList=this.postQueriesDetails;
  this.postQueriesList.maxPages=0;
  this.postQueriesList.maxSerialNo="";
  this.postQueriesList.tenderId=this.postQueriesTenderDtls.tenderId;

  this.supplierService.submitPostQueries(this.postQueriesList,this.supplierId).subscribe(
    (data: SupplierDataModel) => {      
      console.log(data);
      this.postQueriesNotificationList = data.data.postQueriesNotiList;
      this.postQueriesDetails=[];
      this.addItem();
    }
  )
}

uploadDocument(event,queryDetails:PostQueriesNotification,info:string,ok:string,errMsg:string){
  let selectedfiles = event.target.files[0];
  console.log(selectedfiles);
  
  //this.fileName = selectedfiles.name;
  var type:string = selectedfiles.type;
  var size:string = selectedfiles.size;
  var docDesc;
  const formData: FormData = new FormData();
  formData.append('file', selectedfiles);
//  docSeqNo=(docSeqNo==null?"":docSeqNo);
  this.attachmentService.uploadDocument('post queries', type, this.supplierId, "PostQueries", 
  this.loginUserID, formData)

  .subscribe((data: SupplierDataModel) => {
      console.log(data);
     queryDetails.docType=selectedfiles.type;
     queryDetails.docFileName=selectedfiles.name;
     queryDetails.docSize=selectedfiles.size;
     console.log(queryDetails);
     console.log(this.postQueriesDetails);

  });      
}

  onClickViewResponse() {
    this.router.navigate(['/consolidated-questions-answer']);
  }

}
