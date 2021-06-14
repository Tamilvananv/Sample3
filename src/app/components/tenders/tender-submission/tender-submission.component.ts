import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderMaster } from 'src/app/services/TenderMaster';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


//declare var $: any;
@Component({
  selector: 'app-tender-submission',
  templateUrl: './tender-submission.component.html',
  styleUrls: ['./tender-submission.component.scss']
})
export class TenderSubmissionComponent implements OnInit {
  @ViewChild('tenderSubmissionAlert', { static: false }) private content;
  modalReference:NgbModalRef;
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;  
  tenderMaster: TenderMaster;
  tenderMode:number;
  isInvited:boolean;
  isPrequalified:boolean;
  propNo:string;
  isScopeOne:boolean;
  altProp:any;
  bidbondManMsg:string;
  boqManMsg:string;
  manDocValiMsg:string;
  payErrMsg:string;
  createresvalidationmsg:string;
  beforeFinalSubalertMsg:string;
  bidbondManMsgShow:boolean=false;
  boqManMsgShow:boolean=false;
  manDocValiMsgShow:boolean=false;
  payErrMsgShow:boolean=false;
  createresvalidationmsgShow:boolean=false;
  beforeFinalSubalertMsgShow:boolean=false;
  tenderSubmExpiredMsgShow:boolean=false;
  tenderFinalSubmitRefNoMsgShow:boolean=false;
  okButtonStatus:string='';
  obj:any;
  tenderDetails: TenderDetails =new TenderDetails();
  tabName: string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    
    this.tabName = "tenderSubmission";
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    this.tenderMaster=this.procureCacheService.getTenderMaster();

    this.toggleModalShowFlags(false);
    console.log(this.tenderMaster);
    
        this.getTenderSubmissionDetails();
        this.supplierService.getTenderReferenceNo(this.supplierId,this.tenderMaster.tender_id)
        .subscribe((data: SupplierDataModel) => {
          this.obj=data.data;
          console.log(this.obj); 
          this.isInvited= this.obj.isInvited;
          this.tenderMode=this.obj.tenderMode;
          //this.isPrequalified=true;//this.obj.isPrequalified;
          this.altProp=this.obj.altProp;
          this.isScopeOne=this.obj.isScopeOne;
          this.propNo=this.obj.propNo;
           }); 
  }
  getTenderSubmissionDetails(){
    this.supplierService.getTenderSubmissionDtls(this.supplierId,this.tenderMaster.tender_id,this.tenderMaster.tender_response_no)
        .subscribe((data: SupplierDataModel) => {
          this.tenderDetails=data.data;
          this.isPrequalified=data.data.isPrequalified;
          console.log(data);
        });
  }
  createResponse(subsriptionErrMsg:string,info:string,ok:string,responseErr:string){
    this.supplierService.createResponse(this.tenderMaster.tender_id,this.supplierId)
    .subscribe((data:SupplierDataModel)=>{
      console.log(data);
      if(data.data != null) {
        if(data.data=='10000'){
          //  $scope.showModal = !$scope.showModal;
          // $scope.popupReferenceNum=responseErr;
          // $scope.info=info;
          // $scope.footerClose=ok;
          
        }else{
        this.tenderDetails.tenderMaster.referenceNumber = data.data;
          //$('#refNo').val($scope.tender.tenderMaster.referenceNumber);
          //$scope.refreshTenderSubmission();
          //$scope.fetchDetail();
        //$scope.berclinsteps['createResponse']=true;
       }
    }    
    });
  }

  toggleModalShowFlags(toggleValue:boolean){
    this.bidbondManMsgShow=toggleValue;
    this.boqManMsgShow=toggleValue;
    this.manDocValiMsgShow=toggleValue;
    this.payErrMsgShow=toggleValue;
    this.createresvalidationmsgShow=toggleValue;
    this.beforeFinalSubalertMsgShow=toggleValue;
    this.tenderSubmExpiredMsgShow=toggleValue;
    this.tenderFinalSubmitRefNoMsgShow=toggleValue;
  }
  tenderSubmissionAlertOkClick(){
    this.toggleModalShowFlags(false);
    if(this.okButtonStatus==='final-submit'){
      console.log('inside if block to invoke final submit');
      this.finalSubmit();
      this.okButtonStatus='';
    }
    //$('#tenderSubmissionAlert').modal('hide');
    this.modalReference.close();
    
  }

  finalSubmit(){
    this.supplierService.tenderFinalSubmission(this.supplierId,
      this.tenderDetails.tenderMaster.tender_id,this.tenderDetails.tenderMaster.referenceNumber)
      .subscribe((data:SupplierDataModel)=>{
        console.log(data);
        this.getTenderSubmissionDetails();
        
        if(data.data.lovId=='1'){
          //$('#tenderSubmissionAlert').modal('show');
          this.modalReference = this.modalService.open(this.content);
          this.tenderSubmExpiredMsgShow=true;
       }else{      
        //$('#tenderSubmissionAlert').modal('show');
        this.modalReference = this.modalService.open(this.content);
        this.tenderFinalSubmitRefNoMsgShow=true;
          //this.getTenderSubmissionDetails();
          
       }
    });
  }
  finalSubmCheck(mandDocUploadCheck:string,boqDeatilsCheck:string,bidBondCheck:string,referenceNumber:string,rfpType:string,
    pymtxnId:string,pymtTxnStatus:string,createResValidationMsg:string,manDocValiMsg:string,boqManMsg:string,bidbondManMsg:string,
    info:string,ok:string,payErrMsg:string){
      this.toggleModalShowFlags(false);
      if(referenceNumber==null||referenceNumber==''){
        //$('#tenderSubmissionAlert').modal('show');
        this.modalReference = this.modalService.open(this.content);
        this.createresvalidationmsgShow=true;
      }
      else if(pymtTxnStatus != '2' && rfpType=='8042') {
		   
        if(rfpType=='8042' && (pymtTxnStatus == '0' || pymtTxnStatus == '1' || pymtTxnStatus =='3' || pymtTxnStatus =='4' || pymtTxnStatus == null) ){
          //$('#tenderSubmissionAlert').modal('show');
          this.modalReference = this.modalService.open(this.content);
          this.payErrMsgShow=true;
        }       
      
      } else {
        
        if(mandDocUploadCheck == 'N') {
          //show modal with msg in manDocValiMsg;
          //$('#tenderSubmissionAlert').modal('show');
          this.modalReference = this.modalService.open(this.content);
          this.manDocValiMsgShow=true;
        } else {
          if(boqDeatilsCheck == 'N') {
            //show modal with msg in boqManMsg;
            //$('#tenderSubmissionAlert').modal('show');
            this.modalReference = this.modalService.open(this.content);
            this.boqManMsgShow=true;
          } else {
            if(bidBondCheck == 'N') {
              //show modal with msg in bidbondManMsg;
              //$('#tenderSubmissionAlert').modal('show');
              this.modalReference = this.modalService.open(this.content);
              this.bidbondManMsgShow=true;
            } else {
              //$('#tenderSubmissionAlert').modal('show');
              this.modalReference = this.modalService.open(this.content);
              this.beforeFinalSubalertMsgShow=true;
              this.okButtonStatus  ="final-submit"
           }
         }
       }
     } 
  }
}
