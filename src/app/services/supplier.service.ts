import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Supplier } from './supplier';
import { SupplierInfoVO } from './SupplierInfoVO';
import { SupplierAddressDtl } from './SupplierAddressDtl';
import { SupplierContactDetails } from './SupplierContactDetails';
import { SupplierFinancialInfoVO } from './SupplierFinancialInfoVO';
import { SupplierBankDetails } from './SupplierBankDetails';
import { SupplierCategoryDetails } from './SupplierCategoryDetails';
import { LoginInfoVO } from './LoginInfoVO';
import { HttpParams } from "@angular/common/http";
import { SupplierAdapter } from '../components/supplier/Adapter/SupplierAdapter';
import { SupplierDataModel } from '../components/supplier/model/SupplierDataModel';
import { NewUser } from './NewUser';
import { FinalSupplierModel } from '../components/supplier/model/FinalSupplierModel';
import { environment } from 'src/environments/environment';
import { TenderMaster } from './TenderMaster';
import { BidBondDetails } from './BidBondDetails';
import { TenderDetails } from './TenderDetails';
import { WorkCompletionDtls } from './WorkCompletion';
import { InvoiceVendorDtls } from './InvoiceVendorDtls';
import { attachmentlist, fileDelete, fileDownload, fileUpload } from './ApplicationConstants';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  supplierDataUpdated: boolean = false;
  updatedSupplierId: string;
  private apiURL: string = environment.procureServletUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {  }

  getAll(supplierId, loginUserID, companyId): Observable<SupplierDataModel> {

    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('loginUserID', loginUserID);
    params = params.append('companyId', companyId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/suppliers/manageRegistration?', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  getSupplierDetails(supplierId: string, loginUserID: string, companyId: string): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('loginUserID', loginUserID);
    params = params.append('companyId', companyId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.apiURL + '/getSupplierInfo', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })
    })
    return supplierP;
  }




  getSupplierAddressDetails(supplierId: string, loginUserID: string, companyId: string): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('loginUserID', loginUserID);
    params = params.append('companyId', companyId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.apiURL + '/supplierAddressValues', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })

    })
    return supplierP;
  }

  saveSupplierAddressDetails(supplierAddressDtl: SupplierAddressDtl, supplierId: number, compId: string, userId: string, submClsfn: string): Observable<SupplierDataModel> {
    supplierAddressDtl.supplierId = supplierId;
    supplierAddressDtl.compId = compId;
    supplierAddressDtl.userId = userId;
    return this.httpClient.post(this.apiURL + '/saveAddress?submClsfn=' + submClsfn, supplierAddressDtl)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )

  }

  saveSupplierContactDetails(supplierContactDetails: SupplierContactDetails, supplierId: string, submClsfn: string): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/awards/saveNew?submClsfn=' + submClsfn, supplierContactDetails)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  login(loginInfoVO) {
    return this.httpClient.post(this.apiURL + '/welcome/', loginInfoVO)
  }

  loginDetails(loginInfoVO: LoginInfoVO) {
    this.httpClient.post(this.apiURL + '/welcome/', loginInfoVO).toPromise().then(data => {
      console.log(data);
    }

    );

  }

  saveSupplierDetails(supplierInfoVO: SupplierInfoVO, submClsfn: string): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/saveSupplierMst?submClsfn=' + submClsfn, supplierInfoVO).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  saveSupplierCategoryDetails(supplierCategoryDetails: SupplierCategoryDetails, supplierId: string, submClsfn: string): Observable<SupplierDataModel> {
    supplierCategoryDetails.supplierId = supplierId;
    return this.httpClient.post(this.apiURL + '/completion/saveNew?submClsfn=' + submClsfn, supplierCategoryDetails)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );

  }

  deleteSupplierAddressDetails(addressId: string, supplierId: string): Observable<SupplierDataModel> {

    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('addressId', addressId);


    return this.httpClient.get(this.apiURL + '/deleteAddress', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  getSupplierContactDetails(supplierId: string, userId: string, compId: string, langId: string): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('compId', compId);
    params = params.append('userId', userId);
    params = params.append('langId', langId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.apiURL + '/awards/getContact', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })
    })
    return supplierP;
  }

  deleteSupplierContactDetails(contactId: string, supplierId: string, langId: string) {
    let params = new HttpParams();
    params = params.append('contactId', contactId);
    params = params.append('langId', langId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.delete(this.apiURL + '/awards/updateDelete/', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );
  }

  deleteSupplierCategoryDetails(supplierCategoryDetails: SupplierCategoryDetails): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/completion/updateDelete/', supplierCategoryDetails)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }


  getSupplierBankDetails(supplierId: string, userId: string, compId: string, langId: string): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('loginUserID', userId);
    params = params.append('companyId', compId);
    params = params.append('langId', langId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {

      this.httpClient.get<SupplierDataModel>(this.apiURL + '/claims/getBank?', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })
    });
    return supplierP;
  }

  saveSupplierBankDetails(supplierBankDetails: SupplierBankDetails, supplierId: string, submClsfn: string): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/supplierBank/saveNew?submClsfn=' + submClsfn, supplierBankDetails)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )

  }



  saveSupplierFinanceDetails(supplierFinancialInfoVO: SupplierFinancialInfoVO, supplierId: string, submClsfn: string): Observable<SupplierDataModel> {
    supplierFinancialInfoVO.supplierId = supplierId.toString();
    supplierFinancialInfoVO['loginUserID']= "";
    console.log(supplierFinancialInfoVO);
    
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.post(this.apiURL + '/saveSupplierFinance?submClsfn=' + submClsfn, supplierFinancialInfoVO)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  deleteSupplierBankDetails(supplierId: string, bankId: string): Observable<SupplierDataModel> {

    let params = new HttpParams();
    params = params.append('bankId', bankId);
    params = params.append('supplierId', supplierId);
    return this.httpClient.delete(this.apiURL + '/claims/updateDelete?bankId=' + bankId + '&supplierId=' + supplierId)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );
  }

  getSupplierDropdownValues(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/dropdownValues', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  getSupplierInfoDropdownValues(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/dropdownValues', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }



  getSupplierFinanceDetails(supplierId): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.apiURL + '/getSupplierFinInfo', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })
    });
    return supplierP;
  }

  getCategoryDetails(supplierId: string, langId: string): Promise<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('langId', langId);

    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.apiURL + '/completion/getCategory', { params: params })
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        });
    });
    return supplierP;
  }

  loadParentCategoryDropdown(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadParentCategoryDropdown', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }


  loadChildCategoryDropdown(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadChildCategoryDropdown', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  loadSubCategoryDropdown(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadSubCategoryDropdown', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  loadCountryDropdown(): Observable<SupplierDataModel> {
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadCountryDropdown')
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  loadStates(country): Observable<SupplierDataModel> {
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadStatesDropdown?countryId=' + country)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  loadStatesDropdown(): Observable<SupplierDataModel> {
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/loadStatesDropdown?countryId=IN')
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }


  loadBankRefDropdown(langId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('langId', langId);
    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/dropdownValues', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }



  create(Supplier, submClsfn): Observable<Supplier> {
    return this.httpClient.post<Supplier>(this.apiURL + '/saveSupplierMst?submClsfn=' + submClsfn, JSON.stringify(Supplier), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(applicationno): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.apiURL + '/supplier/' + applicationno)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  update(applicationno, Supplier): Observable<Supplier> {
    return this.httpClient.put<Supplier>(this.apiURL + '/supplier/' + applicationno, JSON.stringify(Supplier), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(applicationno) {
    return this.httpClient.delete<Supplier>(this.apiURL + '/supplier/' + applicationno, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createNewUserDetails(userDetails: NewUser): Observable<SupplierDataModel> {
    console.log(userDetails);
    return this.httpClient.post(this.apiURL + '/register/', userDetails).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  submitFinalSupplierDetails(finalData: FinalSupplierModel): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/spmFinal/', finalData).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getSupplierReviewDetails(supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/supplierReviewData', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getPreQualificationScorecard(supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/getPreQualificationScorecard', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getScoreCardStatus(langId: string, parentId: string) {
    let params = new HttpParams();
    params = params.append('parentId', parentId);
    params = params.append('langId', langId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getLov(langId: string, parentId: string) {
    let params = new HttpParams();
    params = params.append('parentId', parentId);
    params = params.append('langId', langId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }
  savePreQualificationScoreCard(supplierScoreCardObj: any, supplierId: string) {

    return this.httpClient.post(this.apiURL + '/savePreQualification?supplierId=' + supplierId, supplierScoreCardObj).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getContractSearchDetails(langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('langId', langId);
    return this.httpClient.get(this.apiURL + '/contract/searchall', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getContractInformation(contractId: string, langId: string) {
    let params = new HttpParams();
    params = params.append('contractId', contractId);
    params = params.append('langId', langId);
    return this.httpClient.get(this.apiURL + '/contract', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getPaymentMilestoneBOQDetails(contractId: string, langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('contractId', contractId);
    params = params.append('langId', langId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/loadBOQorPaymentMileStone', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getClaimCategoryDropdownValues(langId) {
    const parentId = "9624";
    let params = new HttpParams();
    params = params.append('langId', langId);
    params = params.append('parentId', parentId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getClaimPriorityDropdownValues(langId) {
    var parentId = "9627";
    let params = new HttpParams();
    params = params.append('langId', langId);
    params = params.append('parentId', parentId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getClaimTypeDropdownValues(langId) {
    const parentId = "9630";
    let params = new HttpParams();
    params = params.append('langId', langId);
    params = params.append('parentId', parentId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  saveClaimDetails(claimDetail, supplierId: string) {

    return this.httpClient.post(this.apiURL + '/claimDetails/save?supplierId=' + supplierId, claimDetail).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler));
  }


  getClaimSearchDetails(supplierId) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/claims/search', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler));
  }

  loadDocumentType(langId, parentId) {
    let params = new HttpParams();
    params = params.append('langId', langId);
    params = params.append('parentId', parentId);

    return this.httpClient.get(this.apiURL + '/getLovMasterList', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler));
  }
  getVariationOrderSearchAll(supplierId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);

    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/variationorder/search', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }
  getVariationOrderDetails(variationOrderId: string): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('variationOrderId', variationOrderId);

    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/variationOrder', { params: params })
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }
  getVariationOrderPaymentMilestoneBOQList(variationOrderId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('variationOrderId', variationOrderId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/variationOrder/loadBOQorPaymentMileStone', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  variationOrderAgreeCheck(variationOrderId: string) {
    let params = new HttpParams();
    params = params.append('variationOrderId', variationOrderId);
    return this.httpClient.post(this.apiURL
      + '/variationOrderAgreeStatus', params).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );
  }
  getVariationOrderDocs(supplierId, variationOrderId): Observable<SupplierDataModel> {

    return this.httpClient.get<SupplierDataModel>(this.apiURL + '/variationOrder/docs?supplierId=' + supplierId + '&variationOrderId=' + variationOrderId)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }
  updateVariationOrderDownloadstatus(docId: string, variationOrderId: string, supplierId: string, userId: string) {
    let params = new HttpParams();
    params = params.append('variationOrderId', variationOrderId);
    params = params.append('supplierId', supplierId);
    params = params.append('userId', userId);
    params = params.append('docDtlId', docId);

    return this.httpClient.get(this.apiURL + '/variationOrder/downloadDocStatus', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  //tender management services

  searchTenders(tenderMaster: TenderMaster) {
    return this.httpClient.post(this.apiURL + '/tender/search', tenderMaster).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  getTenders(supplierId: string, tenderType: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/loadPublicTenderDashboard/' + tenderType, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  getTenderDtls(supplierId: string, tenderId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tender/edit/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  saveReviewedScoreCardDetails(supplierId) {
    return this.httpClient.post(this.apiURL + '/updateSupplierReviewData?supplierId=' + supplierId, supplierId).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getReviewedScoreCardDetails(supplierId) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/supplierReviewData?', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getInvoiceSearchDetails(langId: string, vendorId: string) {
    let params = new HttpParams();
    params = params.append('vendorId', vendorId);
    params = params.append('langId', langId);

    return this.httpClient.get(this.apiURL + '/invoice/search', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getWorkCompletionCertificates(invoiceId: string, langId: string) {
    let params = new HttpParams();
    params = params.append('invoiceId', invoiceId);
    params = params.append('langId', langId);

    return this.httpClient.get(this.apiURL + '/completionCertificateInvoice', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getCompletionCertificateInvoiceDetails(contractId: string, langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('contractId', contractId);
    params = params.append('langId', langId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/contract/loadWorkCompletionCertificates', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }
  getCompletionCertificateDetails(invoiceId: string, langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('invoiceId', invoiceId);
    params = params.append('langId', langId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/invoice/loadWorkCompletionCertificates',
      { params: params }).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  getPostQueriesTenderDetails(supplierId: string, tenderId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/postQueries/edit/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getCompletionCertificateSearch(langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('langId', langId);

    return this.httpClient.get(this.apiURL + '/completion/search', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getWorkCompletionDetails(ccRefNo: string) {
    let params = new HttpParams();
    params = params.append('ccRefNo', ccRefNo);

    return this.httpClient.get(this.apiURL + '/workCompletionDetails', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }
  getSubmittedQueries(tenderId: string, supplierId: string) {

    return this.httpClient.get(this.apiURL + '/fetchSubmittedQueries/' + tenderId + '?supplierId=' + supplierId).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getNotificationDetails(tenderId: string, supplierId: string) {

    return this.httpClient.get(this.apiURL + '/publishedNoticationDetails/edit/' + tenderId + '?supplierId=' + supplierId).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getNotificationDocDetails(tenderId: string, supplierId: string) {

    return this.httpClient.get(this.apiURL + '/notificationDocDetails/' + tenderId + '?supplierId=' + supplierId).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }


  saveTenderAuctionDetails(auctionModel, supplierId) {

    return this.httpClient.post(this.apiURL + '/auction/search?supplierId=' + supplierId, auctionModel).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getTenderAuctionList(supplierId) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/tender/getSearchFilters', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getCompletionCertificateBOQDetails(contractId) {
    let params = new HttpParams();
    params = params.append('contractId', contractId);

    return this.httpClient.get(this.apiURL + '/completionCertificate/BOQ', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }


  getTenderSubmissionDtls(supplierId: string, tenderId: string, refno: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('refNo', refno);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/edit/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  getTenderReferenceNo(supplierId: string, tenderId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/getRefNo/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  getViewResponseMy(supplierId: string, tenderId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/myViewResponses/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  getViewResponseAll(tenderId: string) {
    return this.httpClient.get(this.apiURL + '/allViewResponse/' + tenderId).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  getBidbondDetails(tenderId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/fetchBidBondDetails/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  saveBidBondDetails(supplierId: string, langId: string, tenderId: string, bidBondDetails: BidBondDetails) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('amount', bidBondDetails.bbAmount);
    params = params.append('langId', langId);
    params = params.append('bankName', bidBondDetails.bankName);
    params = params.append('bbType', bidBondDetails.bbType);
    params = params.append('bbRefNo', bidBondDetails.bbReferenceNo);
    params = params.append('expiresOn', bidBondDetails.expiresOn);
    params = params.append('validFrom', bidBondDetails.validFrom);
    params = params.append('tenderBbDtlId', bidBondDetails.tenderBbDtlId);
    params = params.append('tenderId', tenderId);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/saveBidBondDetails', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  createResponse(tenderId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/createResponse/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  fetchBoQDetails(supplierId: string, tenderId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tenderSubmission/fetchBoqDetails/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }
  saveBoQDetails(supplierId: string, fileImport: string, tenderDetails: TenderDetails) {

    return this.httpClient.post(this.apiURL + '/tenderSubmission/saveBoqDetails/' + fileImport + '?supplierId=' + supplierId, tenderDetails).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  deleteTenderSubmissionDocs(supplierId: string, tenderId: string,
    docId: string, docType: string, docFlag: string, check: string, docDesc: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);

    return this.httpClient.get(this.apiURL + '/tenderSubmission/deleteDoc/'
      + docId + '/' + docType + '/' + docFlag + '/' + tenderId, { params: params }).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );
  }

  tenderFinalSubmission(supplierId: string, tenderId: string, refNo: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('refNo', refNo);

    return this.httpClient.get(this.apiURL + '/tenderSubmission/finalSubmission/'
      + tenderId, { params: params }).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      );
  }

  submitPostQueries(postQueries, supplierId: string) {
    return this.httpClient.post(this.apiURL
      + '/submitPostQueries?supplierId=' + supplierId, postQueries).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )

  }
  getClaimsDetails(claimId: string) {
    let params = new HttpParams();
    params = params.append('claimId', claimId);
    return this.httpClient.get(this.apiURL + '/claims/claimData', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    );
  }

  saveWorkCompletionDetails(workCompletionDtls: WorkCompletionDtls) {

    return this.httpClient.post(this.apiURL + '/completionCertificate/saveWorkCompletionDetails', workCompletionDtls).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler));
  }

  getCompletionSearchList(langId: string, supplierId: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('langId', langId);
    return this.httpClient.get(this.apiURL + '/completionsearch/search', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  saveInvoiceDetails(contractId: string, invoiceDtls: InvoiceVendorDtls): Observable<SupplierDataModel> {

    return this.httpClient.post(this.apiURL + '/completionCertificateInvoice/save?contractId=' + contractId, invoiceDtls)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )

  }

  subscribeTender(supplierId, subscribeFlag, tenderId) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    return this.httpClient.get(this.apiURL + '/tender/subscribe/' + subscribeFlag + '/' + tenderId, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getPardonReason() {
    return this.httpClient.get(this.apiURL + '/loadPardonReason').pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  savePardonDetails(formData: any) {
    return this.httpClient.post(this.apiURL + '/tender/view/savePardonDetails', formData).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  setSupplierDetailsUpdated(supplierId: string, isSupplierDataUpdated: boolean) {
    this.supplierDataUpdated = isSupplierDataUpdated;
    this.updatedSupplierId = supplierId;
  }

  isSupplierDetailsUpdatedOrNot() {
    return { isSupplierUpdated: this.supplierDataUpdated, supplierID: this.updatedSupplierId }
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
