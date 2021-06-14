import { Component, Input, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { WorkCompletionDtls } from 'src/app/services/WorkCompletion';
import { BOQDetails } from 'src/app/services/BOQDetails';
import { VariationOrderBOQDtl } from 'src/app/services/VariationOrderBOQDtl';


@Component({
  selector: 'app-work-completion-view',
  templateUrl: './work-completion-view.component.html',
  styleUrls: ['./work-completion-view.component.scss']
})

export class WorkCompletionViewComponent implements OnInit {
  //@Input() paymentMilestoneBOQ:VariationOrderBOQDtl;
  @Input() workCompletionDetails :WorkCompletionDtls;
  // boqId:string;

  constructor(public supplierService: SupplierService,public procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {
    /* const ccRefNo = this.procureCacheService.getCompletionCertificateRefNo();
    console.log(ccRefNo);
    this.supplierService.getWorkCompletionDetails(ccRefNo).subscribe((data: SupplierDataModel) => {
      console.log(data);
      this.workCompletionDetails = data.data;
      this.boqId=this.workCompletionDetails.boqId;
    }) */
  }

}
