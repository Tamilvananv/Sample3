import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { Login1Component } from './components/login1/login1.component';
import { Login2Component } from './components/login2/login2.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';

import { SupplierInfoComponent } from './components/supplier/supplier-info/supplier-info.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { SupplierInformationComponent } from './components/supplier/supplier-information/supplier-information.component';
import { SupplierAddressDetailsComponent } from './components/supplier//supplier-address-details/supplier-address-details.component';
import { SupplierContactDetailsComponent } from './components/supplier//supplier-contact-details/supplier-contact-details.component';
import { SupplierFinancialBusinessComponent } from './components/supplier//supplier-financial-business/supplier-financial-business.component';
import { SupplierBankDetailsComponent } from './components/supplier//supplier-bank-details/supplier-bank-details.component';
import { SupplierCategoryScopeComponent } from './components/supplier//supplier-category-scope/supplier-category-scope.component';
import { AttachmentDetailsComponent } from './components/supplier//attachment-details/attachment-details.component';
import { FinalViewComponent } from './components/supplier//final-view/final-view.component';
import { DashboardTendersComponent } from './components/dashboard-tenders/dashboard-tenders.component';
import { DashboardContactsComponent } from './components/dashboard-contacts/dashboard-contacts.component';
import { ProgressBarComponent } from './components/supplier/progress-bar/progress-bar.component';

import { ModelWindowComponent } from './components/model-window/model-window.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbdSortableHeader } from './services/sortable.directive';
import { ClaimSearchComponent } from './components/contracts/claim-search/claim-search.component';
import { ContractSearchComponent } from './components/contracts/contract-search/contract-search.component';
import { VariationOrderSearchComponent } from './components/contracts/variation-order-search/variation-order-search.component';
import { CompletionCertificateSearchComponent } from './components/milestone-completion/completion-certificate-search/completion-certificate-search.component';
import { InvoiceSearchComponent } from './components/payment/invoice-search/invoice-search.component';
import { InnerDashboardComponent } from './components/dashboard-module/inner-dashboard/inner-dashboard.component';
import { NotificationComponent } from './components/notification/notification/notification.component';
import { InvoiceDetailsComponent } from './components/payment/invoice-details/invoice-details.component';
import { ContractInformationComponent } from './components/contracts/contract-information/contract-information.component';
import { SupplierInfoAddComponent } from './components/supplier/supplier-info-add/supplier-info-add.component';
import { SupplierInfoEditComponent } from './components/supplier/supplier-info-edit/supplier-info-edit.component';
import { ContractEditComponent } from './components/contracts/contract-edit/contract-edit.component';
import { ClaimEditComponent } from './components/contracts/claim-edit/claim-edit.component';
import { ValidationOrderDetailsComponent } from './components/contracts/validation-order-details/validation-order-details.component';
import { MilestoneCompletionDetailsComponent } from './components/milestone-completion/milestone-completion-details/milestone-completion-details.component';
import { PreviewComponent } from './components/supplier/preview/preview.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicTendersComponent } from './components/tenders/public-tenders/public-tenders.component';
import { LimitedTendersComponent } from './components/tenders/limited-tenders/limited-tenders.component';
import { RfiComponent } from './components/tenders/rfi/rfi.component';
import { AuctionComponent } from './components/tenders/auction/auction.component';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { SupplierPrequalificationComponent } from './components/supplier/supplier-prequalification/supplier-prequalification.component';
import { CompanyScoreCardComponent } from './components/supplier/company-score-card/company-score-card.component';
import { SupplierScoreCardSummaryComponent } from './components/supplier/supplier-score-card-summary/supplier-score-card-summary.component';
import { PublicTenderDetailsComponent } from './components/tenders/public-tender-details/public-tender-details.component';
import { LimitedTenderSearchComponent } from './components/tenders/limited-tender-search/limited-tender-search.component';
import { RfiDetailsComponent } from './components/tenders/rfi-details/rfi-details.component';
import { AuctionDetailsComponent } from './components/tenders/auction-details/auction-details.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { TempCreateComponent } from './components/contracts/temp-create/temp-create.component';
import { LinkingContractComponent } from './components/contracts/linking-contract/linking-contract.component';
import { LinkTempContractComponent } from './components/contracts/link-temp-contract/link-temp-contract.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CreateNewRegistrationComponent } from './components/create-new-registration/create-new-registration.component';

import { BoqDetailsComponent } from './components/reusable/boq-details/boq-details.component';
import { MandatoryDocumentsComponent } from './components/reusable/mandatory-documents/mandatory-documents.component';
import { OptionalDocumentsComponent } from './components/reusable/optional-documents/optional-documents.component';
import { PostQueriesDetailsComponent } from './components/reusable/post-queries-details/post-queries-details.component';
import { QueriesDetailComponent } from './components/reusable/queries-detail/queries-detail.component';
import { TenderBasicInformationComponent } from './components/reusable/tender-basic-information/tender-basic-information.component';
import { TenderBidBondDetailsComponent } from './components/reusable/tender-bid-bond-details/tender-bid-bond-details.component';
import { TenderContactDetailsComponent } from './components/reusable/tender-contact-details/tender-contact-details.component';
import { TenderProgressBarComponent } from './components/reusable/tender-progress-bar/tender-progress-bar.component';
import { TenderRfpDocumentComponent } from './components/reusable/tender-rfp-document/tender-rfp-document.component';
import { TenderSubmissionDetailComponent } from './components/reusable/tender-submission-detail/tender-submission-detail.component';
import { TenderTimelinesComponent } from './components/reusable/tender-timelines/tender-timelines.component';
import { PostQueriesComponent } from './components/tenders/post-queries/post-queries.component';
import { PublishedNotificationsDetailComponent } from './components/tenders/published-notifications-detail/published-notifications-detail.component';
import { TenderSubmissionComponent } from './components/tenders/tender-submission/tender-submission.component';
import { ViewResponseComponent } from './components/tenders/view-response/view-response.component';
import { QueriesSubmittedComponent } from './components/reusable/queries-submitted/queries-submitted.component';
import { CreateClaimComponent } from './components/contracts/create-claim/create-claim.component';
import { CreateInvoiceComponent } from './components/payment/create-invoice/create-invoice.component';
import { ContractInformationDetailsComponent } from './components/reusable/contract-information-details/contract-information-details.component';
import { ClaimsDetailsComponent } from './components/reusable/claims-details/claims-details.component';
import { AttachSectionComponent } from './components/reusable/attach-section/attach-section.component';
import { BOQPaymentDetailsComponent } from './components/reusable/boq-payment-details/boq-payment-details.component';
import { CompletionCertificateDetailComponent } from './components/reusable/completion-certificate-detail/completion-certificate-detail.component';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { TenderDetailsComponent } from './components/tenders/tender-details/tender-details.component';
import { TenderSearchComponent } from './components/tenders/tender-search/tender-search.component';
import { RfiSearchComponent } from './components/tenders/rfi-search/rfi-search.component';
import { AuctionDetailOnlineComponent } from './components/tenders/auction-detail-online/auction-detail-online.component';
import { ClaimSearchDetailsComponent } from './components/reusable/claim-search-details/claim-search-details.component';
import { ConsolidatedQuestionsAnswerComponent } from './components/tenders/consolidated-questions-answer/consolidated-questions-answer.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/lang/", ".json");
}

import { PaginationRecordCountComponent } from './components/resuable/pagination-record-count/pagination-record-count.component';
import { PaginationComponent } from './components/resuable/pagination/pagination.component';
import { PaymentMilestoneBoqComponent } from './components/reusable/payment-milestone-boq/payment-milestone-boq.component';
import { DownloadCenterComponent } from './components/reusable/download-center/download-center.component';
import { VariationDetailsComponent } from './components/reusable/variation-details/variation-details.component';
import { WorkCompletionDetailsComponent } from './components/reusable/work-completion-details/work-completion-details.component';
import { InvoicedetailsComponent } from './components/reusable/invoicedetails/invoicedetails.component';
import { CollapseExpandBtnComponent } from './components/reusable/collapse-expand-btn/collapse-expand-btn.component';
import { PublicTenderDetailComponent } from './components/reusable/public-tender-detail/public-tender-detail.component';
import { RfiInfoComponent } from './components/reusable/rfi-info/rfi-info.component';
import { RfiContactDetailComponent } from './components/reusable/rfi-contact-detail/rfi-contact-detail.component';
import { RfiBidBondComponent } from './components/reusable/rfi-bid-bond/rfi-bid-bond.component';
import { RfiTenderTimelineComponent } from './components/reusable/rfi-tender-timeline/rfi-tender-timeline.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AuthGuardService } from './service/auth-guard.service';
import { MilestoneCompletionViewComponent } from './components/milestone-completion/milestone-completion-view/milestone-completion-view.component';
import { MilestoneCompletionSearchComponent } from './components/milestone-completion/milestone-completion-search/milestone-completion-search.component';
import { WorkCompletionViewComponent } from './components/reusable/work-completion-view/work-completion-view.component';
import { InvoiceContractSearchComponent } from './components/payment/invoice-contract-search/invoice-contract-search.component';
import { InvoiceViewComponent } from './components/payment/invoice-view/invoice-view.component';
import { TenderSubmissionOptionalDocumentsComponent } from './components/tenders/tender-submission-optional-documents/tender-submission-optional-documents.component';
import { TenderSubmissionModalComponent } from './components/tenders/tender-submission-modal/tender-submission-modal.component';
import { QueriesNotificationComponent } from './components/tenders/queries-notification/queries-notification.component';
import { EntityAssignmentComponent } from './components/supplier/entity-assignment/entity-assignment.component';
import { CustomerVendorCollabrationComponent } from './components/supplier/customer-vendor-collabration/customer-vendor-collabration.component';
import { ContractsAttachmentSectionComponent } from './components/contracts/contracts-attachment-section/contracts-attachment-section.component';
import { QualificationStatusService } from './services/PrequalificationStatusUpdate.service';
import { ClaimsContractSearchComponent } from './components/contracts/claims-contract-search/claims-contract-search.component';
import { PreQualificationProgressBarComponent } from './pre-qualification-progress-bar/pre-qualification-progress-bar.component';
import { DashboardContractMgtSystemComponent } from './components/dashboard-contract-mgt-system/dashboard-contract-mgt-system.component';
import { ModalDialogBoxComponent } from './modal-dialog-box/modal-dialog-box.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import { SupplierRegistrationPreviewComponent } from './components/supplier-registration-preview/supplier-registration-preview.component';
import { TemplateRespositoryComponent } from './components/contracts/template-respository/template-respository.component';
import { HeaderComponent } from './common/header/header.component';
import { ContractCreationComponent } from './components/contracts/contract-creation/contract-creation.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    Login1Component,
    Login2Component,
    ContactusComponent,
    DashboardComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    LayoutComponent,
    SupplierInfoComponent,
    SupplierInformationComponent,
    SupplierAddressDetailsComponent,
    SupplierContactDetailsComponent,
    SupplierFinancialBusinessComponent,
    SupplierBankDetailsComponent,
    SupplierCategoryScopeComponent,
    AttachmentDetailsComponent,
    ForgotPasswordComponent,
    FinalViewComponent,
    DashboardTendersComponent,
    DashboardContactsComponent,
    ContractCreationComponent,
    ProgressBarComponent,
    ModelWindowComponent,
    NgbdSortableHeader,
    ClaimSearchComponent,
    ContractSearchComponent,
    VariationOrderSearchComponent,
    CompletionCertificateSearchComponent,
    InvoiceSearchComponent,
    InnerDashboardComponent,
    NotificationComponent,
    InvoiceDetailsComponent,
    ContractInformationComponent,
    SupplierInfoAddComponent,
    SupplierInfoEditComponent,
    ContractEditComponent,
    ClaimEditComponent,
    ValidationOrderDetailsComponent,
    MilestoneCompletionDetailsComponent,
    PreviewComponent,
    PublicTendersComponent,
    LimitedTendersComponent,
    RfiComponent,
    AuctionComponent,
    CustomerDashboardComponent,
    SupplierPrequalificationComponent,
    CompanyScoreCardComponent,
    SupplierScoreCardSummaryComponent,
    PublicTenderDetailsComponent,
    LimitedTenderSearchComponent,
    RfiDetailsComponent,
    AuctionDetailsComponent,
    TextEditorComponent,
    TempCreateComponent,
    LinkingContractComponent,
    LinkTempContractComponent,
    MessagesComponent,
    CreateNewRegistrationComponent,
    BoqDetailsComponent,
    MandatoryDocumentsComponent,
    OptionalDocumentsComponent,
    PostQueriesDetailsComponent,
    QueriesDetailComponent,
    TenderBasicInformationComponent,
    TenderBidBondDetailsComponent,
    TenderContactDetailsComponent,
    TenderProgressBarComponent,
    TenderRfpDocumentComponent,
    TenderSubmissionDetailComponent,
    TenderTimelinesComponent,
    PostQueriesComponent,
    PublishedNotificationsDetailComponent,
    TenderSubmissionComponent,
    ViewResponseComponent,
    QueriesSubmittedComponent,
    CreateClaimComponent,
    CreateInvoiceComponent,
    ContractInformationDetailsComponent,
    ClaimsDetailsComponent,
    AttachSectionComponent,
    BOQPaymentDetailsComponent,
    CompletionCertificateDetailComponent,
    TenderDetailsComponent,
    TenderSearchComponent,
    RfiSearchComponent, AuctionDetailOnlineComponent, ClaimSearchDetailsComponent, PaginationRecordCountComponent,
    PaginationComponent, PaymentMilestoneBoqComponent, DownloadCenterComponent, VariationDetailsComponent,
    WorkCompletionDetailsComponent, InvoicedetailsComponent, CollapseExpandBtnComponent, PublicTenderDetailComponent,
    RfiInfoComponent, RfiContactDetailComponent, RfiBidBondComponent, RfiTenderTimelineComponent,
    ConsolidatedQuestionsAnswerComponent, MilestoneCompletionViewComponent, MilestoneCompletionSearchComponent,
    WorkCompletionViewComponent, InvoiceContractSearchComponent, InvoiceViewComponent, TenderSubmissionOptionalDocumentsComponent,
    TenderSubmissionModalComponent, QueriesNotificationComponent, EntityAssignmentComponent,
    CustomerVendorCollabrationComponent, ContractsAttachmentSectionComponent, ClaimsContractSearchComponent, PreQualificationProgressBarComponent, DashboardContractMgtSystemComponent, ModalDialogBoxComponent, ConfirmationBoxComponent, SupplierRegistrationPreviewComponent, TemplateRespositoryComponent, 
     HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(maskConfigFunction)
  ],
  providers: [ProcureCacheService, AuthGuardService, QualificationStatusService, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
