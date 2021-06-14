import { LoginInfoVO } from './LoginInfoVO';
import { TenderMaster } from './TenderMaster';
import { VariationOrderDtl } from './VariationOrderDtl';
import { isNullOrUndefined } from 'src/app/tools';

export class ProcureCacheService {

    private supplierId: string;
    private loginUserID: string;
    private username: string;
    private langId: string;
    private companyId: string;
    private tenderId: string;
    private tenderMaster: TenderMaster;
    private prequalificationStatus: string;
    private selectedSupplierId: string;

    private loginObj = {
        supplierId: null,
        loginUserID: null,
        username: null,
        langId: null,
        companyId: null
    };

    private supplierPreQualObj = {
        supplierId: null,
        supplierNameInEnglish: null,
        tradelicenseno: null,
        submittedDate: null,
        submissionClassification: null,
        parentCategory: null,
        childCategory: null,
        subCategory: null
    };

    private userName: string;
    private contractId: string;
    private claimSearchDetailData: any;
    private variationOrderId: string;
    private variationOrderDtl: VariationOrderDtl;
    private invoiceNumber: string;
    private ccRefNo: string;
    private invoiceId: string;
    private supId: string;
    private finalSubmitReferenceNo: string;
    private qualifiedStatus: boolean;
    private supplierBtnDisabling: boolean;
    private disableCategoryFinalSubmitPage: boolean;
    private claimId;
    private compId: string;

    setLoginDetails(loginObject: LoginInfoVO) {

        this.loginObj.supplierId = loginObject.supplierId;
        this.loginObj.loginUserID = loginObject.loginUserID;
        this.loginObj.username = loginObject.username;
        this.loginObj.langId = loginObject.langId;
        this.loginObj.companyId = loginObject.companyId;
        console.log(this.loginObj);
    }

    getLoginObject() {
        console.log(this.loginObj);
        return this.loginObj;
    }

    setSupplierId(supplierId: string) {
        this.selectedSupplierId = supplierId;
    }
    getSupIdForSupplierTabs() {
        return this.selectedSupplierId;
    }
    getSupplierId() {
        // this.supplierId = this.loginObj.supplierId;
        if(isNullOrUndefined(this.loginObj.supplierId)) {
            this.supplierId = this.selectedSupplierId;
        } else {
            this.supplierId = this.loginObj.supplierId;
        }
        console.log(this.supplierId);
        return this.supplierId;
    }

    setCompId(compId: string) {
        this.compId = compId;
    }
    getCompId() {
        return this.compId;
    }
    getLoginUserID() {
        this.loginUserID = this.loginObj.loginUserID;
        console.log(this.loginUserID);
        return this.loginUserID;
    }

    getUsername() {
        this.username = this.loginObj.username;
        console.log(this.username);
        return this.username;
    }

    getLangId() {
        this.langId = this.loginObj.langId;
        console.log(this.langId);
        return this.langId;
    }

    getCompanyId() {
        this.companyId = this.loginObj.companyId;
        console.log(this.companyId);
        return this.companyId;
    }

    setSupplierPreQualDetails(supplierId, supplierNameInEnglish, tradelicenseno, submittedDate, submissionClassification,
        parentCategory, childCategory, subCategory) {
        this.supId = supplierId;
        this.supplierPreQualObj.supplierNameInEnglish = supplierNameInEnglish;
        this.supplierPreQualObj.tradelicenseno = tradelicenseno;
        this.supplierPreQualObj.submittedDate = submittedDate;
        this.supplierPreQualObj.submissionClassification = submissionClassification;
        this.supplierPreQualObj.parentCategory = parentCategory;
        this.supplierPreQualObj.childCategory = childCategory;
        this.supplierPreQualObj.subCategory = subCategory;

        console.log(this.supplierPreQualObj);
    }

    getSupId() {
        return this.supId;
    }

    getSupplierPreQualDetails() {
        return this.supplierPreQualObj;
    }

    setLoginUserName(userName: string) {
        this.userName = userName;
    }

    getUserNameBeforeLogin() {
        return this.userName;
    }

    setContractId(contractId) {
        this.contractId = contractId;
    }

    getContractId() {
        return this.contractId;
    }

    setClaimDetails(claimSearchDetailData) {
        this.claimSearchDetailData = claimSearchDetailData;
    }

    getClaimDetails() {
        return this.claimSearchDetailData;
    }

    setVariationOrderId(variationOrderId) {
        this.variationOrderId = variationOrderId;
    }

    getVariationOrderId() {
        return this.variationOrderId;
    }

    setVariationOrderDtl(variationOrderDtl) {
        this.variationOrderDtl = variationOrderDtl;
    }

    getVariationOrderDtl() {
        return this.variationOrderDtl;
    }

    setInvoiceNumber(invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    getInvoiceNumber() {
        return this.invoiceNumber;
    }

    setTenderId(tenderId) {
        this.tenderId = tenderId;
    }

    getTenderId() {
        return this.tenderId;
    }
    setTenderMaster(tenderMaster: TenderMaster) {
        this.tenderMaster = tenderMaster;
    }

    getTenderMaster() {
        return this.tenderMaster;
    }

    setCompletionCertificateRefNo(cc_ref_no, contractId) {
        this.ccRefNo = cc_ref_no;
        this.contractId = contractId;
    }
    getCompletionCertificateRefNo() {
        return this.ccRefNo;
    }

    setInvoiceId(invoiceId) {
        this.invoiceId = invoiceId;
    }

    getInvoiceId() {
        return this.invoiceId;
    }

    getPrequalificationStatus() {
        return this.prequalificationStatus;
    }
    setPrequalificationStatus(prequalificationStatus) {
        this.prequalificationStatus = prequalificationStatus;
    }
    setQualifiedStatus(qualifiedStatus: boolean) {
        this.qualifiedStatus = qualifiedStatus;
    }
    getQualifiedStatus() {
        return this.qualifiedStatus;
    }
    setSupplierTabsButtonDisabling(disableButtons: boolean = false) {
        this.supplierBtnDisabling = disableButtons;
    }
    getSupplierTabsButtonDisableStatus() {
        return this.supplierBtnDisabling;
    }
    setProfileUpdateSelected(profileUpdateSelected) {
        if (profileUpdateSelected == true) {
            this.disableCategoryFinalSubmitPage = true;
        } else {
            this.disableCategoryFinalSubmitPage = false;
        }
    }
    getProfileUpdateSelected() {
        return this.disableCategoryFinalSubmitPage;
    }
    setFinalRefNo(submissionRefNo) {
        this.finalSubmitReferenceNo = submissionRefNo;
    }

    getFinalRefNo() {
        return this.finalSubmitReferenceNo;
    }

    setClaimId(claimId) {
        this.claimId = claimId;
    }

    getClaimId() {
        return this.claimId;
    }
}