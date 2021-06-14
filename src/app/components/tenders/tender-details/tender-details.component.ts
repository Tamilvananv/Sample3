import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderMaster } from 'src/app/services/TenderMaster';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {
  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  //tenderMasterList: TenderMaster[];
  tenderDtls: any;
  tenderMode:number;
  isInvited:boolean;
  isPrequalified:boolean;
  propNo:string;
  isScopeOne:boolean;
  altProp:any;
  obj:any;
  flag:any;
  pardonReason:any;
  errMsgRemark:boolean=false;
  errMsg:boolean=false;
  successMsg:boolean=false;
  pardonSubmit:boolean=false;
  tabName: string;

  constructor(public supplierService: SupplierService, public http: HttpClient,
    private router: Router, private route: ActivatedRoute, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    this.tabName = 'tenderDetails';
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;
    // this.supplierService.getPardonReason().subscribe((data:SupplierDataModel)=>{
    //   console.log(data);
    // });
    this.supplierService.getTenderDtls(this.supplierId,this.procureCacheService.getTenderId())
        .subscribe((data: SupplierDataModel) => {  

      this.tenderDtls=data.data; 
      this.flag='0';
      console.log(this.tenderDtls);
    });

    this.supplierService.getTenderReferenceNo(this.supplierId,this.procureCacheService.getTenderId())
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

  clickSubscribe(subscriptionFlag, flag) {//#showPopup2
		var subscribeFlag = 1;
		var mode = 'tender';
		if (subscriptionFlag == true && flag == 0) {
			subscribeFlag = 1;
			this.flag = '1';
		} else if(subscriptionFlag == true && flag == 1) {
			subscribeFlag = 1;
			this.flag = '1';
		//	$('#showPopup2').modal('show');
		} else {
			subscribeFlag = 0;
			// $('#pardonSubmit').show();
			// $('#showPopupChk').modal('show');
			// $('#checkbox').prop('checked', true);
		}
		if(this.flag == '1') {
			this.flag = '0';
      this.supplierService
      .subscribeTender(this.supplierId,subscribeFlag,this.procureCacheService.getTenderId())
        .subscribe((data: SupplierDataModel) => {
				this.tenderDtls.mappingExist='Y';
					console.log(data);
				});
		}
		}

    savePardonDetails(pardonSucMsg,info,ok){
		
      if((this.tenderDtls.tenderMaster.pardonReason=="9229" && 
      this.tenderDtls.tenderMaster.pardonRemark=="") || 
      (this.tenderDtls.tenderMaster.pardonReason=="9229" && 
      this.tenderDtls.tenderMaster.pardonRemark==null)){
        this.errMsgRemark=true;
        this.errMsg=false;
        this.successMsg=false;
        this.tenderDtls.tenderVendorMapping.subscription_flag=true;
        //remove disabled from the subscribe checkbox
       return false;
      }	
      
      if( this.tenderDtls.tenderMaster.pardonReason=="" || this.tenderDtls.tenderMaster.pardonReason==null ){
        this.errMsg=true;
        this.errMsgRemark=false;
        this.successMsg=false;
        this.tenderDtls.tenderVendorMapping.subscription_flag=true;
        //remove disabled from the subscribe checkbox
        return false;
      } else{ 
        var mode = 'tender';
        var subscribeFlag = 0;
        this.flag = '1';
        this.errMsg=false;
        this.errMsgRemark=false;
        var formData = new FormData();
        formData.append("reason",this.tenderDtls.tenderMaster.pardonReason);
        formData.append("remark",this.tenderDtls.tenderMaster.pardonRemark);
        var tenderId = this.procureCacheService.getTenderId();
        formData.append("tenderId",tenderId);
        
        this.supplierService
      .subscribeTender(this.supplierId,subscribeFlag,this.procureCacheService.getTenderId())
        .subscribe((data: SupplierDataModel) => {
				this.tenderDtls.mappingExist='Y';
          console.log(data);
          // if(data.data==1){
          //   this.berclinsteps['subscribe']=true;	
          // }
			
       this.supplierService.savePardonDetails(formData).subscribe((data:SupplierDataModel)=>{
        
           if(data.data!=0)
             this.successMsg=true;
           this.tenderDtls.tenderMaster.pardonReason="";
           this.tenderDtls.tenderMaster.pardonRemark="";           
           this.tenderDtls.tenderVendorMapping.subscription_flag=false;           
           this.pardonSubmit=false;
         })
           
          });
      
      
      }
      
    }
}
