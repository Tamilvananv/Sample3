// export interface Supplier {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     quantity: number;
// }

export class FinanceAssetDtl {
    // id: number;
   supplierId : string;
   assetId: string;
   assetType: string;
   yearOne: string;
   yearTwo: string;
   yearThree: string;
   userId: string;
   createdDate: string;
   modifiedDate: string;
    
   constructor(assetType:string){
       this.supplierId="";
       this.assetId="";
       this.assetType=assetType;
       this.yearOne="";
       this.yearTwo="";
       this.yearThree="";
       this.userId="";
       this.createdDate="";
       this.modifiedDate="";
   }
}



