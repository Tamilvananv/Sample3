import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login1Component } from './components/login1/login1.component';
import { Login2Component } from './components/login2/login2.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SupplierInfoComponent } from './components/supplier/supplier-info/supplier-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardTendersComponent } from './components/dashboard-tenders/dashboard-tenders.component';
import { SupplierAddressDetailsComponent } from './components/supplier/supplier-address-details/supplier-address-details.component';
import { SupplierContactDetailsComponent } from './components/supplier/supplier-contact-details/supplier-contact-details.component';
import { SupplierFinancialBusinessComponent } from './components/supplier/supplier-financial-business/supplier-financial-business.component';
import { SupplierBankDetailsComponent } from './components/supplier/supplier-bank-details/supplier-bank-details.component';
import { SupplierCategoryScopeComponent } from './components/supplier/supplier-category-scope/supplier-category-scope.component';
import { AttachmentDetailsComponent } from './components/supplier/attachment-details/attachment-details.component';
import { FinalViewComponent } from './components/supplier/final-view/final-view.component';
import { PreviewComponent } from './components/supplier/preview/preview.component';
import { SupplierInformationComponent } from './components/supplier/supplier-information/supplier-information.component';
import { DashboardContactsComponent } from './components/dashboard-contacts/dashboard-contacts.component';
import { ClaimSearchComponent } from './components/contracts/claim-search/claim-search.component';
import { VariationOrderSearchComponent } from './components/contracts/variation-order-search/variation-order-search.component';
import { ContractSearchComponent } from './components/contracts/contract-search/contract-search.component';
import { CompletionCertificateSearchComponent } from './components/milestone-completion/completion-certificate-search/completion-certificate-search.component';
import { InvoiceSearchComponent } from './components/payment/invoice-search/invoice-search.component';
import { InvoiceDetailsComponent } from './components/payment/invoice-details/invoice-details.component';
import { InnerDashboardComponent } from './components/dashboard-module/inner-dashboard/inner-dashboard.component';
import { NotificationComponent } from './components/notification/notification/notification.component';
import { ContractInformationComponent } from './components/contracts/contract-information/contract-information.component';
import { SupplierInfoAddComponent } from './components/supplier/supplier-info-add/supplier-info-add.component';
import { SupplierInfoEditComponent } from './components/supplier/supplier-info-edit/supplier-info-edit.component';
import { ContractEditComponent } from './components/contracts/contract-edit/contract-edit.component';
import { ClaimEditComponent } from './components/contracts/claim-edit/claim-edit.component';
import { ValidationOrderDetailsComponent } from './components/contracts/validation-order-details/validation-order-details.component';
import { MilestoneCompletionDetailsComponent } from './components/milestone-completion/milestone-completion-details/milestone-completion-details.component';
import { PublicTendersComponent } from './components/tenders/public-tenders/public-tenders.component';
import { LimitedTendersComponent } from './components/tenders/limited-tenders/limited-tenders.component';
import { RfiComponent } from './components/tenders/rfi/rfi.component';
import { AuctionComponent } from './components/tenders/auction/auction.component';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { SupplierPrequalificationComponent } from './components/supplier/supplier-prequalification/supplier-prequalification.component';
import { CompanyScoreCardComponent } from './components/supplier/company-score-card/company-score-card.component';
import { SupplierScoreCardSummaryComponent } from './components/supplier/supplier-score-card-summary/supplier-score-card-summary.component';
import { PublicTenderDetailsComponent } from './components/tenders/public-tender-details/public-tender-details.component';
import { TenderDetailsComponent } from './components/tenders/tender-details/tender-details.component';
import { LimitedTenderSearchComponent } from './components/tenders/limited-tender-search/limited-tender-search.component';
import { TenderSearchComponent } from './components/tenders/tender-search/tender-search.component';
import { RfiDetailsComponent } from './components/tenders/rfi-details/rfi-details.component';
import { AuctionDetailsComponent } from './components/tenders/auction-details/auction-details.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { LinkingContractComponent } from './components/contracts/linking-contract/linking-contract.component';
import { TempCreateComponent } from './components/contracts/temp-create/temp-create.component';
import { LinkTempContractComponent } from './components/contracts/link-temp-contract/link-temp-contract.component';
import { PostQueriesComponent } from './components/tenders/post-queries/post-queries.component';
import { PublishedNotificationsDetailComponent } from './components/tenders/published-notifications-detail/published-notifications-detail.component';
import { TenderSubmissionComponent } from './components/tenders/tender-submission/tender-submission.component';
import { ConsolidatedQuestionsAnswerComponent } from './components/tenders/consolidated-questions-answer/consolidated-questions-answer.component';
import { CreateClaimComponent } from './components/contracts/create-claim/create-claim.component';
import { CreateInvoiceComponent } from './components/payment/create-invoice/create-invoice.component';
import { CreateNewRegistrationComponent } from './components/create-new-registration/create-new-registration.component';
import { RfiSearchComponent } from './components/tenders/rfi-search/rfi-search.component';
import { AuctionDetailOnlineComponent } from './components/tenders/auction-detail-online/auction-detail-online.component';
import { AuthGuardService } from './service/auth-guard.service';
import { MilestoneCompletionViewComponent } from './components/milestone-completion/milestone-completion-view/milestone-completion-view.component';
import { MilestoneCompletionSearchComponent } from './components/milestone-completion/milestone-completion-search/milestone-completion-search.component';
import { InvoiceContractSearchComponent } from './components/payment/invoice-contract-search/invoice-contract-search.component';
import { InvoiceViewComponent } from './components/payment/invoice-view/invoice-view.component';
import { QueriesSubmittedComponent } from './components/reusable/queries-submitted/queries-submitted.component';
import { QueriesNotificationComponent } from './components/tenders/queries-notification/queries-notification.component';
import { EntityAssignmentComponent } from './components/supplier/entity-assignment/entity-assignment.component';
import { CustomerVendorCollabrationComponent } from './components/supplier/customer-vendor-collabration/customer-vendor-collabration.component';
import { ClaimsContractSearchComponent } from './components/contracts/claims-contract-search/claims-contract-search.component';
import { DashboardContractMgtSystemComponent } from './components/dashboard-contract-mgt-system/dashboard-contract-mgt-system.component';
import { SupplierRegistrationPreviewComponent } from './components/supplier-registration-preview/supplier-registration-preview.component';
import { TemplateRespositoryComponent } from './components/contracts/template-respository/template-respository.component';

import { ContractCreationComponent } from './components/contracts/contract-creation/contract-creation.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login1', pathMatch: 'full' },
  { path: 'login', component: Login1Component },


  // { path: 'login2', component: Login2Component },
  {

    path: 'create-new-registration',
    component: CreateNewRegistrationComponent,
  },
  {
    path: '', 
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-info',
        component: SupplierInfoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'customer-dashboard',
        component: CustomerDashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'contract-creation',
        component: ContractCreationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tenders-dashboard',
        component: DashboardTendersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'queries-notification',
        component: QueriesNotificationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate:[AuthGuardService]
      },
      

      {
        path: 'supplier-information',
        component: SupplierInformationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-prequalification',
        component: SupplierPrequalificationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'company-score-card',
        component: CompanyScoreCardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-score-card-summary',
        component: SupplierScoreCardSummaryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tender-details',
        component: TenderDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'public-tender-details',
        component: PublicTenderDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tender-search',
        component: TenderSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'limited-tender-search',
        component: LimitedTenderSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-address-details',
        component: SupplierAddressDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-contact-details',
        component: SupplierContactDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-financial-business',
        component: SupplierFinancialBusinessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-bank-details',
        component: SupplierBankDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-category-scope',
        component: SupplierCategoryScopeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'attachment-section',
        component: AttachmentDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'final-view',
        component: FinalViewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'contactus',
        component: ContactusComponent,
        canActivate:[AuthGuardService] 
      },
      {
        path: 'dashboard-contacts',
        component: DashboardContactsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'dashboard-contract-mgt-system',
        component: DashboardContractMgtSystemComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'entity-assignment',
        component: EntityAssignmentComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'customer-vendor-collabration',
        component: CustomerVendorCollabrationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'contract-search',
        component: ContractSearchComponent,
        canActivate: [AuthGuardService]
      },
      // {
      //   path: 'contract-creation',
      //   component: ContractCreationComponent,
      //   canActivate: [AuthGuardService]
      // },
      {
        path: 'claim-search',
        component: ClaimSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'invoice-contract-search',
        component: InvoiceContractSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'invoice-view',
        component: InvoiceViewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'variation-order-search',
        component: VariationOrderSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'milestone-completion',
        component: CompletionCertificateSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'preview',
        component: PreviewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'payment',
        component: InvoiceSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'invoice-details',
        component: InvoiceDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'inner-dashboard',
        component: InnerDashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'contract-information',
        component: ContractInformationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-info-add',
        component: SupplierInfoAddComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'supplier-info-edit/:applicationno',
        component: SupplierInfoEditComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'contract-edit',
        component: ContractEditComponent,
        canActivate: [AuthGuardService]
      },
      
      {
        path: 'template-respository',
        component: TemplateRespositoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'claim-edit',
        component: ClaimEditComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'validation-order-details',
        component: ValidationOrderDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'milestone-completion-details',
        component: MilestoneCompletionDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'milestone-completion-view',
        component: MilestoneCompletionViewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'milestone-completion-search',
        component: MilestoneCompletionSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'public-tenders',
        component: PublicTendersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'limited-tenders',
        component: LimitedTendersComponent,
        canActivate: [AuthGuardService]
      },
     
      {
        path: 'rfi',
        component: RfiComponent,
        canActivate: [AuthGuardService]
      },
     
      {
        path: 'auction-detail-online',
        component: AuctionDetailOnlineComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'rfi-search',
        component: RfiSearchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'rfi-details',
        component: RfiDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'auction',
        component: AuctionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'auction-details',
        component: AuctionDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'temp-create',
        component: TempCreateComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'linking-contract',
        component: LinkingContractComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'link-temp-contract',
        component: LinkTempContractComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: 'text-editor', 
        component: TextEditorComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'post-queries', 
        component: PostQueriesComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'published-notifications-detail', 
        component: PublishedNotificationsDetailComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'tender-submission', 
        component: TenderSubmissionComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'queries-submitted', 
        component: QueriesSubmittedComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'consolidated-questions-answer', 
        component: ConsolidatedQuestionsAnswerComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'create-claim', 
        component: CreateClaimComponent,
        canActivate: [AuthGuardService]
      }, {
        path: 'claim-contract-search', 
        component: ClaimsContractSearchComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'create-invoice', 
        component: CreateInvoiceComponent,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'supplier-registration-preview-page', 
        component: SupplierRegistrationPreviewComponent,
        canActivate: [AuthGuardService]
      },
      // {
      //   path: '**',
      //   pathMatch   : 'full',
      //   resolve: {
      //     path: PathResolveService
      //   },
      //   component: NotFoundComponent
      // }

    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   // imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const AppRoutingModule = RouterModule.forRoot(routes);
