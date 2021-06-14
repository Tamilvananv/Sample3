import { SupplierCategoryDocs } from "./SupplierCategoryDocs";

export interface SupplierCategoryDetails {
    // id: number;
	supplierId :string;
	userId: string;
	compId: string;
	categoryId:string;
	parentCategory:string;
	subCategory:string;
	childCategory:string;
	
	childCategory1:string;
	
	qualificationStatus:string;
	qualificationStatusName:string;
	deleteFlag:string;  
	submClsfn: string;  
	catDocs:Array<any>;
}



