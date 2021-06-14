import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { LoginInfoVO } from '../../services/LoginInfoVO';
import { SupplierService } from '../../services/supplier.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'src/app/tools';
import { AuthenticationService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({

  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss']
})
export class Login1Component implements OnInit {
  name = 'Angular';
  currDiv: string = 'A';
  isShow = false;
  chttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loginInfoVO: LoginInfoVO = {
    username: null,
    password: null,
    language: null,
    loginName: null,
    sessionId: null,
    invalidAttempt: null,
    pwdLastChanged: null,
    isFirstLogin: null,
    isLocked: null,
    roleName: null,
    roleId: null,
    gender: null,
    isLoggedIn: null,
    titleId: null,
    dob: null,
    status: null,
    deleteFlag: null,
    rowNo: null,
    langId: null,
    userId: null,
    locale: null,
    ArLangId: null,
    otherLangName: null,
    contextPath: null,
    menus: null,
    pageSize: null,
    loginUserID: null,
    vendorId: null,
    tradeLicenseNo: null,
    contactNo: null,
    email: null,
    entityTypeId: null,
    searchFilters: null,
    companyName: null,
    givenName: null,
    supplierId: null,
    firstName: null,
    middleName: null,
    lastName: null,
    designation: null,
    phoneNo: null,
    companyId: null,
    companyAddress: null,
    companyCountry: null,
    companyCity: null,
    companyPhone: null,
    companyFax: null,
    companyEmail: null,
    companyWebsite: null
  };
  supplierId: string;
  invalidLogin: boolean = false;
  json;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  errorMsg: string;

  loginFormStep1: boolean = true;
  loginFormStep2: boolean = false;


  constructor(public supplierService: SupplierService, private router: Router,
    private route: ActivatedRoute, private authenticationService: AuthenticationService, private httpClient: HttpClient, private procureCacheService: ProcureCacheService) { }

  ngOnInit(): void {

    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login1']);
      return;
    }
  }

  ShowDiv(divVal: string) {
    this.currDiv = divVal;
  }

  // loginDetails() {
  //   this.supplierService.loginDetails(this.loginInfoVO);
  //   this.router.navigate(['/dashboard']);
  // }

  sendUserName(event, userName) {
    if (userName != null) {
      this.procureCacheService.setLoginUserName(userName);
      // this.router.navigate(['/login2']);
      this.loginFormStep1 = false;
      this.loginFormStep2 = true;
    } else {
      this.errorMsg = "Please enter the User name";
    }
  }
  displayLoginStep() {
    this.loginFormStep1 = true;
    this.loginFormStep2 = false;
  }


  onSubmit() {
    console.log("inside submit");
    
    // this.supplierService.login(this.loginInfoVO).subscribe(resp => {
    //   let LoginObject: LoginInfoVO = JSON.parse(JSON.stringify(resp));
    //   this.router.navigate(['/dashboard', LoginObject.supplierId, LoginObject.loginUserID, LoginObject.companyId]);
    // });
    // if (!isNullOrUndefined(this.loginInfoVO.password)) {

    //   this.supplierService.login(this.loginInfoVO).subscribe(resp => {

    //     let LoginObject: LoginInfoVO = JSON.parse(JSON.stringify(resp));
    //     console.log(JSON.stringify(resp));

    //     if (!isNullOrUndefined(LoginObject.username)) {

    //       this.procureCacheService.setLoginDetails(LoginObject);
    //       this.router.navigate(['/dashboard']);

    //     } else {
    //       this.errorMsg = "Please enter valid Credentials";
    //     }
    //   });

    // } else {
    //   this.errorMsg = "Please enter the password";
    // }




    this.authenticationService.login(this.loginInfoVO.username, this.loginInfoVO.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Login Data : ",data);
          // if (data['status'] == 1) {
          //   // console.info('data', data, this.returnUrl);
          //   // this.spinner.hide('loginSpinner');
          //   console.log("Data : ", data)
          // } else {

          // }
          this.router.navigate(['/dashboard']);
        },
        error => {

        });

  }
}
