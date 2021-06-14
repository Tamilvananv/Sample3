import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { InvoiceDetails } from 'src/app/services/InvoiceDetails';
import { InvoiceCompletionCertificateMapping } from 'src/app/services/InvoiceCompletionCertificateMapping';
import { InvoiceVendorDtls } from 'src/app/services/InvoiceVendorDtls';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../../supplier/model/SupplierDataModel';
import { AttachSectionComponent } from '../../reusable/attach-section/attach-section.component';
import { FileAttachmentAPIService } from 'src/app/services/file-attachment-api.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild(AttachSectionComponent) attachSectionChild:AttachSectionComponent;
  type: string;
  message: string;
  loginObj: any;
  langId: string;
  contractId: string;
  supplierId: string;
  invoiceDetails:Array<any>;
  paymentTypeList:any;
  finalPaymentList:any;
  invoiceDtls:InvoiceDetails;
  invoiceDetailsFinal:Array<any>;
  invoiceMappingDtls:Array<InvoiceCompletionCertificateMapping>;
  invoiceVendorDtls:InvoiceVendorDtls;
  moduleName:string; 
  moduleTxnId:string; 

  constructor(public procureCacheService: ProcureCacheService, public supplierService: SupplierService,
    private attachmentService: FileAttachmentAPIService) { }

  ngOnInit(): void {
    this.moduleTxnId=null;
    this.moduleName="Invoice";
    this.loginObj = this.procureCacheService.getLoginObject();
    console.log(this.loginObj);
    this.langId = this.loginObj.langId;
    this.invoiceDtls=new InvoiceDetails();
    this.invoiceDtls.paymentType=null;
    this.invoiceDtls.finalPayment=null;
    // this.invoiceId = this.loginObj.supplierId;
    this.supplierId = this.loginObj.supplierId;
    this.contractId = this.procureCacheService.getContractId();
    const invoiceId = this.procureCacheService.getInvoiceId();
    this.attachmentService.deleteAllUnusedModuleDocs(this.supplierId,this.supplierId,this.moduleName)
    .subscribe((data:SupplierDataModel)=>{
      console.log(data);
    });
    this.supplierService.getLov(this.langId, "9613").subscribe((lovData: SupplierDataModel) => {
      this.paymentTypeList = lovData.data;
      console.log(this.paymentTypeList);
      
    });
    this.supplierService.getLov(this.langId, "9519").subscribe((lovData: SupplierDataModel) => {
      this.finalPaymentList = lovData.data;
      console.log(this.finalPaymentList);
      
    });
    this.supplierService.getCompletionCertificateInvoiceDetails(this.contractId, this.langId, this.supplierId).subscribe((data: SupplierDataModel) => {
      console.log(data);      
      if(data.data!=null) {
        this.invoiceDetails = data.data;
        console.log(this.invoiceDetails);
      }

    });
   // this.invoiceDtls=new InvoiceDetails();
  }

  changeWcFormat(event){  
    var date;
    if(moment(this.invoiceDtls.workCompletedDate, 'DD-MMM-YYYY',true).isValid()){
      date = moment(this.invoiceDtls.workCompletedDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    }else{
      date = moment(this.invoiceDtls.workCompletedDate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    } 
    
    this.invoiceDtls.workCompletedDate=date;
    console.log(this.invoiceDtls.workCompletedDate);  
  }
  changeInvFormat(event){  
    var date;
    if(moment(this.invoiceDtls.invoiceDate, 'DD-MMM-YYYY',true).isValid()){
      date = moment(this.invoiceDtls.invoiceDate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    }else{
      date = moment(this.invoiceDtls.invoiceDate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    } 
    
    this.invoiceDtls.invoiceDate=date;
    console.log(this.invoiceDtls.invoiceDate);  
  }
  saveInvoiceDetails(){

    console.log(this.invoiceDetails);
    console.log(this.invoiceDtls);
    this.invoiceDetailsFinal=this.invoiceDetails.filter((inv)=>inv.invoiceStatus!="9621" && inv.selected!==null && inv.selected==true);
    console.log(this.invoiceDetailsFinal);
    this.invoiceMappingDtls=new Array<InvoiceCompletionCertificateMapping>();
    this.invoiceDetailsFinal.forEach((item)=>{
      console.log(this);
       let invMapDtl:InvoiceCompletionCertificateMapping=new InvoiceCompletionCertificateMapping();
       invMapDtl.boqId=item.paymentMileStoneOrBOQ.boqId;
       invMapDtl.workId=item.workId;
       invMapDtl.vendorId=this.supplierId;
       invMapDtl.userId=this.loginObj.loginUserID;
       this.invoiceMappingDtls.push(invMapDtl);
    });
    console.log(this.invoiceMappingDtls);
    this.invoiceDtls.vendorId=this.supplierId;
    this.invoiceDtls.userId=this.loginObj.userId;

    this.invoiceVendorDtls=new InvoiceVendorDtls();
    this.invoiceVendorDtls.invoiceWorkMappingList=this.invoiceMappingDtls;
    this.invoiceVendorDtls.invoiceDetails=this.invoiceDtls;
    this.invoiceVendorDtls.invDocs=new Array<any>();
    if(null!=this.attachSectionChild.supplierAttachmentSection && this.attachSectionChild.supplierAttachmentSection.length>0){
      this.attachSectionChild.supplierAttachmentSection.forEach(element => {
        this.invoiceVendorDtls.invDocs.push(element);
      });;
    }
    this.supplierService.saveInvoiceDetails(this.contractId,this.invoiceVendorDtls).subscribe((data: SupplierDataModel) => {
      
      
      if (data == null || data == undefined|| data.status != "OK") {
        this.type = 'danger';
        this.message = 'Failed to save the supplier information';
        return;
      }
      this.type = 'success';
      this.message = data.message;
      console.log(data);
      
    });
    document.getElementById("msgAlert").scrollIntoView();
  }

  close(){
    this.type = null;
  }
  
}
