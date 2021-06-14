export class SupplierDataModel {
    isError: boolean;
    data: any;
    message: string;
    status: string;

    constructor(
        isError: boolean,
        data: any,
        message: string,
        status: string) {
        this.isError = isError;
        this.data = data;
        this.message = message;
        this.status = status;
    }

}
