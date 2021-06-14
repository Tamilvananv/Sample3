import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import {WorkCompletionDtls} from 'src/app/services/WorkCompletion';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { BOQDetails } from 'src/app/services/BOQDetails';

@Component({
  selector: 'app-work-completion-details',
  templateUrl: './work-completion-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./work-completion-details.component.scss']
})
export class WorkCompletionDetailsComponent implements OnInit {
  @Input() paymentMilestoneBOQ:BOQDetails;

  workCompletionDetails:WorkCompletionDtls;

  constructor(public supplierService: SupplierService,public procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    //const ccRefNo = this.procureCacheService.getCompletionCertificateRefNo();
   // console.log(ccRefNo);
    // this.supplierService.getWorkCompletionDetails(ccRefNo).subscribe((data: SupplierDataModel) => {
    //   console.log(data);
    //   this.workCompletionDetails = data.data;
    // })
    this.workCompletionDetails=new WorkCompletionDtls();
    console.log(this.paymentMilestoneBOQ);
  }
  changeFormat(event:any){  
    var date;
    if(moment(this.workCompletionDetails.workCompletionDate, 'DD-MMM-YYYY',true).isValid()){
      date = moment(this.workCompletionDetails.workCompletionDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    }else{
      date = moment(this.workCompletionDetails.workCompletionDate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    } 
    
    this.workCompletionDetails.workCompletionDate=date;
    console.log(this.workCompletionDetails.workCompletionDate);
  }
  

}
