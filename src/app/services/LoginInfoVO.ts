import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';


export interface LoginInfoVO{
    // id: number;
    
    
    username: string;
	password: string;
	language: string;
    // @NotEmpty
	loginName: string;
	sessionId: string;
	invalidAttempt: string;
	pwdLastChanged: string;
	isFirstLogin: string;
	isLocked: string;
	roleName: string;
	roleId: string;
	gender: string;
	isLoggedIn: string;
	titleId: string;
	dob: string;
	status: string;
	deleteFlag: string;
	rowNo: string;
	langId: string;
	userId: string;
	locale: string;
	ArLangId: string;
	otherLangName: string;
	contextPath: string;
	menus: string;
	pageSize: string;
	loginUserID: string;
	vendorId: string;
	tradeLicenseNo: string;
	/* private String vendorUserId; */
	contactNo: string;
	email: string;
	entityTypeId: string;
	searchFilters: string;
	companyName: string;
	givenName: string;
	supplierId: string;
	
	//added by JG
	firstName: string;
	middleName: string;
	lastName: string;
	
	designation: string;
	phoneNo: string;
	
	companyId: string;
	companyAddress: string;
	companyCountry: string;
	companyCity: string;
	companyPhone: string;
	companyFax: string;
	companyEmail: string;
    companyWebsite: string;
    
	
}



