
import { SupplierFinanceDocDtl } from './SupplierFinanceDocDtl';
import { SupplierFinanceDtl } from './SupplierFinanceDtl';
import { FinanceAssetDtl } from './FinanceAssetDtl';
import { FinanceProjectDtl } from './FinanceProjectDtl';
import { SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS, SUPPLIER_FINANCE_TOTAL_ASSETS } from './ApplicationConstants';

export class SupplierFinancialInfoVO {
    // id: number;
    finDocs: SupplierFinanceDocDtl[];
    finDtl :SupplierFinanceDtl ;

    supplierId: string;
    compId: string;
    userId: string;
    financeAssetDtl : FinanceAssetDtl[];
    financeProjectDtl :Array<FinanceProjectDtl>;
    constructor(){
        this.compId="";
        this.finDocs=new Array<SupplierFinanceDocDtl>();
        this.finDtl=new SupplierFinanceDtl();
        this.supplierId="";
        this.userId="";
        this.financeAssetDtl=new Array<FinanceAssetDtl>();
        this.financeAssetDtl.push(new FinanceAssetDtl(SUPPLIER_FINANCE_TOTAL_ASSETS));
        this.financeProjectDtl=new Array<FinanceProjectDtl>();
        this.financeProjectDtl.push(new FinanceProjectDtl(SUPPLIER_FINANCE_PROJECT_TYPE_PREVIOUS));
    }
    // getFinanceAssetDtl(){
    //     return this.financeAssetDtl;
    // }
    // setFinanceAssetDtl(financeAssetDtl:FinanceAssetDtl[]){
    //     this.financeAssetDtl=financeAssetDtl;
    // }

    // getFinanceProjectDtl(){
    //     return this.financeProjectDtl;
    // }
    // setFinanceProjectDtl(financeProjectDtl:FinanceProjectDtl[]){
    //     this.financeProjectDtl=financeProjectDtl;
    // }
}



