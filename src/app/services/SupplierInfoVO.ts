import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { SupplierMst } from './SupplierMst';
import { SupplierManagerDtl } from './SupplierManagerDtl';
import { SupplierTradelicenseDtl } from './SupplierTradelicenseDtl';


export interface SupplierInfoVO{
    // id: number;
    
    
    qualification:number;
    typeOfOwner :number;
		   
    ownerType : string;
    qualAreaLevel : string;
	website: string;
	estdDate: string;
	parentCompName: string;
	
	supplierNameEn: string;
	supplierNameAr: string;
	agreeCheck: string;
	
	supplierId: string;
	userId: string;
	compId: string;
	managerName: string;
	jobTitle: string;
	mobile: string;
	email: string;
	isPrimary: string;
	
	tradelicenseno: string;
	issuedby: string;
	issueddate: string;
	location: string;
	expirydate: string;
	submissionClassification: string;
}



