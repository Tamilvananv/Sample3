import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupplierAdapter } from '../components/supplier/Adapter/SupplierAdapter';
import { SupplierDataModel } from '../components/supplier/model/SupplierDataModel';
import { attachmentlist, fileDelete, fileDownload, fileUpload } from './ApplicationConstants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileAttachmentAPIService {
  private attachmentApiUrl: string = environment.procureServletUrlAttachment;

  constructor(private httpClient: HttpClient) { }

  openAttachmentDetails(supplierId, categoryId, docCategory): Observable<SupplierDataModel> {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('categoryId', categoryId);
    params = params.append('docCategory', docCategory);
    return this.httpClient.get(this.attachmentApiUrl + '/spmCategory/spmAttachmentGetDocsForPopup', { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  getSupplierAttachmentsDetails(supplierId, moduleId, moduleName): Promise<SupplierDataModel> {
    let supplierP: Promise<SupplierDataModel> = new Promise((resolve) => {
      this.httpClient.get<SupplierDataModel>(this.attachmentApiUrl + attachmentlist + '?moduleId=' + moduleId + '&moduleName=' + moduleName + '&supplierId=' + supplierId)
        .pipe(
          map(data => SupplierAdapter.parser(data)),
          catchError(this.errorHandler)
        ).subscribe(result => {
          resolve(result);
        })
    });
    return supplierP;
  }

  getSupplierTxnAttachmentsDetails(supplierId, moduleId, moduleName, moduleTxnId): Observable<SupplierDataModel> {
    return this.httpClient.get<SupplierDataModel>(this.attachmentApiUrl + attachmentlist + '?moduleId=' + moduleId + '&moduleName=' + moduleName + '&supplierId=' + supplierId + '&moduleTxnId=' + moduleTxnId)
      .pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  uploadDocument(docDesc, type, supplierId, moduleName, userId, formData, docCategory?: string): Observable<SupplierDataModel> {
    var queryString = '';
    if (docCategory != null && docCategory !== '') {
      queryString = '&docCategory=' + docCategory;
    }
    return this.httpClient.post(this.attachmentApiUrl + fileUpload + '?documentDescription=' + docDesc + '&documentType=' + type +
      '&moduleName=' + moduleName + '&supplierId=' + supplierId + '&userId=' + userId + queryString
      , formData).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  uploadTxnDocument(docDesc, type, supplierId, moduleTxnId, moduleName, userId, formData, docCategory?: string): Observable<SupplierDataModel> {
    var queryString = '';
    if (docCategory != null && docCategory !== '') {
      queryString = '&docCategory=' + docCategory;
    }
    return this.httpClient.post(this.attachmentApiUrl + fileUpload + '?documentDescription=' + docDesc + '&documentType=' + type +
      '&moduleId=' + supplierId + '&moduleName=' + moduleName + '&supplierId=' + supplierId + '&moduleTxnId=' + moduleTxnId + '&userId=' + userId + queryString, formData).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  uploadTenderDoc(supplierId: string, userId: string, tenderId: string, docId: string, docSeqNo: string, formData) {
    return this.httpClient.post(this.attachmentApiUrl
      + '/tenderSubmission/view/upload?supplierId=' + supplierId + '&docId=' + docId
      + '&tenderId=' + tenderId + '&userId=' + userId + '&docSeqNo=' + docSeqNo, formData).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  uploadOptTenderDoc(supplierId: string, userId: string, tenderId: string, refNo: string, docCategory: string,
    docDesc: string, formData) {
    return this.httpClient.post(this.attachmentApiUrl
      + '/tenderSubmission/view/uploadOptionalDoc?supplierId=' + supplierId + '&category=' + docCategory
      + '&tenderId=' + tenderId + '&userId=' + userId + '&description=' + docDesc + '&refNo=' + refNo, formData).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  uploadCategoryDocs(supplierId: string, userId: string,
    docCategory: string, docDesc: string, parentCategory: string, subCategory: string
    , childCategory: string, formData) {
    return this.httpClient.post(this.attachmentApiUrl
      + 'spmCategory/docs/upload/' + supplierId + '/' + docCategory + '/' + docDesc + '/'
      + parentCategory + '/' + subCategory + '/' + childCategory + '/' + userId, formData).pipe(
        map(data => SupplierAdapter.parser(data)),
        catchError(this.errorHandler)
      )
  }

  downloadDocuments(docName, moduleName, supplierId) {
    let params = new HttpParams();
    params = params.append('docName', docName);
    return this.httpClient.get(this.attachmentApiUrl + fileDownload + '?documentName=' + docName + '&moduleName=' + moduleName + "&supplierId=" + supplierId, {
      responseType: 'arraybuffer'
    })
  }

  downloadTenderSubmissionDocs(supplierId: string, docId: string,
    docName: string, docType: string) {
    return this.httpClient.get(this.attachmentApiUrl + '/tenderSubmission/downloadDoc?supplierId=' + supplierId
      + '&docId=' + docId + '&docName=' + docName + '&docType=' + docType
      , {
        responseType: 'arraybuffer'
      });
  }

  deleteAttachment(documentId, moduleName, supplierId, moduleTxnId?: string) {
    let params = new HttpParams();
    params = params.append('documentId', documentId);
    params = params.append('moduleName', moduleName);
    params = params.append('supplierId', supplierId);

    if (moduleTxnId != null && moduleTxnId !== '') {
      params = params.append('moduleTxnId', moduleTxnId);
    }
    return this.httpClient.delete(this.attachmentApiUrl + fileDelete, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  deleteTxnAttachments(documentId, moduleId, moduleName, supplierId, moduleTxnId) {
    let params = new HttpParams();
    params = params.append('documentId', documentId);
    params = params.append('moduleName', moduleName);
    params = params.append('moduleTxnId', moduleTxnId);
    params = params.append('supplierId', supplierId);

    return this.httpClient.delete(this.attachmentApiUrl + fileDelete, { params: params }).pipe(
      map(data => SupplierAdapter.parser(data)),
      catchError(this.errorHandler)
    )
  }

  deleteAllUnusedModuleDocs(supplierId: string, moduleId: string, moduleName: string) {
    let params = new HttpParams();
    params = params.append('supplierId', supplierId);
    params = params.append('moduleId', moduleId);
    params = params.append('moduleName', moduleName);
    return this.httpClient.post(this.attachmentApiUrl + '/deleteAllAttachments', params);
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
