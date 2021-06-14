import { isNullOrUndefined } from 'src/app/tools';
	
export class Holder<T>{

  isError: boolean;
  errorCode: Number;
  errorMessage: string;
  data: T;

  constructor(isError: boolean, errorCode: Number, errorMessage: string, data: T) {
    this.isError = isError;
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.data = data;
  }

  public static isError(holder: Holder<any>): boolean {
    if (isNullOrUndefined(holder) || isNullOrUndefined(holder.isError) || holder.isError || isNullOrUndefined(holder.data)) {
      return true;
    }
    return false;
  }
}
