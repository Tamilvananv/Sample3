
import { FinanceProjectDtl } from './FinanceProjectDtl';
import { FinanceAssetDtl } from './FinanceAssetDtl';

export class SupplierFinanceDtl {
    // id: number;
	 supplierId :string;
	 finBusId:string;
	 dateEstd:string;
	 expHistory:string;
	 totalProjectVal:string;
	 maxProjectVal:string;
	 isNetProfit:string;
	
	 userId:string;
	 createdDate:string;
	 modifiedDate:string;
	
	 financeProjectDtl: FinanceProjectDtl[];
	 financeAssetDtl :FinanceAssetDtl[];

	 constructor(){
		 this.supplierId="";
		 this.finBusId="";
		 this.dateEstd="";
		 this.expHistory="";
		 this.totalProjectVal="";
		 this.maxProjectVal="";
		 this.isNetProfit="";
		 this.userId="";
		 this.createdDate="";
		 this.modifiedDate="";
		this.financeAssetDtl=new Array<FinanceAssetDtl>();
		this.financeProjectDtl=new Array<FinanceProjectDtl>();
		
	 }

    
}



