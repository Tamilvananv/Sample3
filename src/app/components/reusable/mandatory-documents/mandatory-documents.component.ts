import { Component, Input, OnInit } from '@angular/core';
import { BidBondDetails } from 'src/app/services/BidBondDetails';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderDoc } from 'src/app/services/TenderDoc';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';
declare var $: any;

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
}
@Component({
  selector: 'app-mandatory-documents',
  templateUrl: './mandatory-documents.component.html',
  styleUrls: ['./mandatory-documents.component.scss']
})
export class MandatoryDocumentsComponent implements OnInit {

  @Input() tenderDtls:TenderDetails;
  @Input() altProp:any;
  @Input() tenderMode:number;
  @Input() isInvited:boolean;
  @Input() isScopeOne:boolean;
  @Input() isPrequalified:boolean;

  type: string;
  message: string;
  supplierId: string;
  loginUserId:string;
  tenderMandDocList:TenderDoc[];
  tenderId:string;
  langId: string;
  bbTypeList:any;
  bankList:any;
  loginObj: any;
  validfromdt:any;
  bidBondDetails:BidBondDetails=new BidBondDetails();
  
  constructor(public procureCacheService: ProcureCacheService,
     public supplierService: SupplierService, private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserId=this.loginObj.loginUserID;
    
    this.tenderMandDocList=this.tenderDtls.tenderMandDocList;
    console.log(this.tenderMandDocList);
    this.langId = this.procureCacheService.getLangId();
    this.supplierService.getLov(this.langId, "8090").subscribe((bbTypedata: SupplierDataModel) => {
      this.bbTypeList = bbTypedata.data;
      console.log(this.bbTypeList);
      
    });
    this.supplierService.getLov(this.langId, "9080").subscribe((bankData: SupplierDataModel) => {
      this.bankList = bankData.data;
      console.log(this.bankList);
      
    });

  }  

  loadBidBondDetails(){
    this.supplierService.getBidbondDetails(this.tenderDtls.tenderMaster.tender_id,
      this.supplierId).subscribe((bidBondData: SupplierDataModel) => {
        this.bidBondDetails = bidBondData.data;
        console.log(this.bidBondDetails);
        console.log(bidBondData.data.validFrom);
        console.log(bidBondData.data.expiresOn);
        if (bidBondData.data.validFrom!==null && bidBondData.data.validFrom!=='')
          this.bidBondDetails.validFrom = this.setDateValue(bidBondData.data.validFrom);
        if (bidBondData.data.expiresOn!==null && bidBondData.data.expiresOn!=='')
          this.bidBondDetails.expiresOn = this.setDateValue(bidBondData.data.expiresOn);
        $('#bidBondModalForm').modal('show');
      });
  }
  setDateValue(inputDate) {
    var date = moment(inputDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    console.log(date);
    return date;
  }
  convertDateFormat(inputDate: string) {
    var date = moment(inputDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
    return date;
  }
  saveBidBondDetails(){
    console.log('Inside bidbond details : '+ this.bidBondDetails);
    this.bidBondDetails.validFrom = this.convertDateFormat(this.bidBondDetails.validFrom);
    this.bidBondDetails.expiresOn = this.convertDateFormat(this.bidBondDetails.expiresOn);
    this.supplierService.saveBidBondDetails(this.supplierId,this.langId,
      this.tenderDtls.tenderMaster.tender_id,this.bidBondDetails).subscribe((data: SupplierDataModel) => {
      console.log(data);
      this.tenderDtls.tenderMandDocList = data.data.tenderMandDocList;
      this.tenderDtls.bidBondCheck = data.data.bidBondCheck;
      this.tenderDtls.bidBondStatus = data.data.bidBondStatus;
      //$('#bidBondModalForm').modal('show');
      //need to show the alert here
    });
  }
  uploadDocument(event,docId:string,docSeqNo:string,info:string,ok:string,errMsg:string){
    let selectedfiles = event.target.files[0];
    console.log(selectedfiles);
    
    //this.fileName = selectedfiles.name;
    let type = selectedfiles.type;
    let size = selectedfiles.size;
    const formData: FormData = new FormData();
    formData.append('files', selectedfiles);
    docSeqNo=(docSeqNo==null?"":docSeqNo);
    this.attachmentService.uploadTenderDoc(this.supplierId,this.loginUserId,
      this.tenderDtls.tenderMaster.tender_id,docId,docSeqNo,formData)
      .subscribe((data: SupplierDataModel) => {
        console.log(data);
        this.tenderDtls.tenderMandDocList = data.data.tenderMandDocList;
        this.tenderMandDocList= data.data.tenderMandDocList;
        this.tenderDtls.mandDocUploadCheck=data.data.mandDocUploadCheck;
        this.tenderDtls.tenderMaster.tenderSubmissionStatus=data.data.tenderVendorStatusName;
				this.tenderDtls.isEdmsExpOccured = data.data.isEdmsExpOccured;
					// if(this.tenderDtls.isEdmsExpOccured){
					// show modal with errMsg
					// this.checkOk="6";}
    });      
  }
  
  downloadDoc(docId:string,docName:string,docFileType:string,docType:string){
    console.log('docId : docName : docFileType :docType-->'+docId+' : '+docName+':'+docFileType+' : '+docType);
    this.attachmentService.downloadTenderSubmissionDocs(this.supplierId,docId,docName,docType) 
    .subscribe((data) => {
      const EXT = docName.substr(docName.lastIndexOf('.') + 1);
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), docName);
    });
  }
  deleteDoc(docId:string,docType:string,docFlag:string,check:string,docDesc:string){
    console.log(docId+' : '+docType+' : '+docFlag+' : '+check+' : '+docDesc);
    this.supplierService.deleteTenderSubmissionDocs(this.supplierId,this.tenderDtls.tenderMaster.tender_id,
      docId,docType,docFlag,check,docDesc)
    .subscribe((data:SupplierDataModel)=>{
      this.tenderDtls.tenderMandDocList = data.data.tenderMandDocList;
				this.tenderDtls.mandDocUploadCheck = data.data.mandDocUploadCheck;
    });
  }
  
  close(){
    this.type = null;
  }
  
}
