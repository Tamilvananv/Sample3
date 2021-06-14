import { SupplierDataModel } from '../model/SupplierDataModel';
import { isNullOrUndefined } from 'src/app/tools';
import { isArray } from 'util';

export class SupplierAdapter{

    static parser(data:any):SupplierDataModel{

        if(isNullOrUndefined(data)){
            return new SupplierDataModel(true,data,null,null);
        }
        if(isNullOrUndefined(data.data)){
            return new SupplierDataModel(true,data.data,data.message,data.status);
        }
            return new SupplierDataModel(false,data.data,data.message,data.status);
    }
}