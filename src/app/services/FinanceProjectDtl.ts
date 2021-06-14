// export interface Supplier {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     quantity: number;
// }

export class FinanceProjectDtl {
    // id: number;
    projectId:string;
	projectType:string;
	customerName:string;
	projectName:string;
	location:string;
	value:string;
	supplierId:string;
	userId:string;
	createdDate:string;
	modifiedDate:string;

	constructor(projectType:string){
		this.projectId="";
		this.createdDate="";
		this.customerName="";
		this.projectName="";
		this.projectType=projectType;
		this.location="";
		this.value="";
		this.supplierId="";
		this.userId="";
		this.createdDate="";
		this.modifiedDate="";
	}
    
}



