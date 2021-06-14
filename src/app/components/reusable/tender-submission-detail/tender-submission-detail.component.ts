import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TenderDetails } from 'src/app/services/TenderDetails';
import { TenderMaster } from 'src/app/services/TenderMaster';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';

@Component({
  selector: 'app-tender-submission-detail',
  templateUrl: './tender-submission-detail.component.html',
  styleUrls: ['./tender-submission-detail.component.scss']
})
export class TenderSubmissionDetailComponent implements OnInit {
   @Input() tenderMaster:TenderMaster;
  constructor() { }

  ngOnInit(): void {    
    console.log(this.tenderMaster);           
  }
}
