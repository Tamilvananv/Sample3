import { Component, OnInit } from '@angular/core';
import { PostQueriesNotification } from 'src/app/services/PostQueriesNotification';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-consolidated-questions-answer',
  templateUrl: './consolidated-questions-answer.component.html',
  styleUrls: ['./consolidated-questions-answer.component.scss']
})
export class ConsolidatedQuestionsAnswerComponent implements OnInit {

  loginObj: { supplierId: any; loginUserID: any; username: any; langId: any; companyId: any; };
  supplierId: string;
  loginUserID: any;
  companyId: string;
  langId: string;
  postQueriesResponseListAll: PostQueriesNotification[];
  postQueriesResponseListMy: PostQueriesNotification[];
  postQueriesResponseList: PostQueriesNotification[];
  viewResponseModeAll:boolean=true;
  
  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loginObj = this.procureCacheService.getLoginObject();
    this.supplierId = this.loginObj.supplierId;
    this.loginUserID = this.loginObj.loginUserID;
    this.companyId = this.loginObj.companyId;
    this.langId = this.loginObj.langId;

      this.supplierService.getViewResponseAll(this.procureCacheService.getTenderId())
        .subscribe((data: SupplierDataModel) => {
          this.postQueriesResponseListAll = data.data.viewAllResponse;
          this.postQueriesResponseList=this.postQueriesResponseListAll;
          console.log(this.postQueriesResponseListAll);
          
        });

        this.supplierService.getViewResponseMy(this.supplierId, this.procureCacheService.getTenderId())
        .subscribe((data: SupplierDataModel) => {
          this.postQueriesResponseListMy = data.data.viewResponse;
          console.log(this.postQueriesResponseListMy);
        });
  }
  setViewResponseMode(viewMode:boolean){
    this.viewResponseModeAll=viewMode;
    if(viewMode){
      this.postQueriesResponseList=this.postQueriesResponseListAll;
    }else{
      this.postQueriesResponseList=this.postQueriesResponseListMy;
    }
    
  }
}
