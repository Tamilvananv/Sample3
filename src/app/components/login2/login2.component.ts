import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
import { LoginInfoVO } from '../../services/LoginInfoVO';
import { SupplierService } from '../../services/supplier.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/admin';
import { SupplierDataModel } from '../supplier/model/SupplierDataModel';
import { isNullOrUndefined } from 'src/app/tools';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {
  name = 'Angular';
  currDiv: string = 'A';
  isShow = false;
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
    //added by JG
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

  constructor(public supplierService: SupplierService, private router: Router, private route: ActivatedRoute, public translateService: TranslateService,
    private httpClient: HttpClient, private procureCacheService: ProcureCacheService, private authService: AuthService) {
      translateService.addLangs(['en', 'ar']);
      translateService.setDefaultLang('en');
     }

     toggleDisplay() {
      this.isShow = !this.isShow;
    }
  
    useLanguage(language) {
      this.translateService.use(language).toPromise();
    }

  supplierId: string;
  loginUsername: string;
  errorMsg: string;

  ngOnInit(): void {

    // this.loginUsername = this.route.snapshot.params['loginUsername'];
    this.loginUsername = this.procureCacheService.getUserNameBeforeLogin();
    console.log(this.loginUsername);

  }

  ShowDiv(divVal: string) {
    this.currDiv = divVal;
  }


  onSubmit() {

    this.loginInfoVO.username = this.loginUsername;
    // const body = new HttpParams().
    // set('username',this.loginInfoVO.username).
    // set('password',this.loginInfoVO.password).
    // set('grant_type','password');
    // this.authService.auth(body.toString()).subscribe((response: Observable<User>) => {
    //   console.log(response);
    // })

    if (!isNullOrUndefined(this.loginInfoVO.password)) {

      this.supplierService.login(this.loginInfoVO).subscribe(resp => {

        let LoginObject: LoginInfoVO = JSON.parse(JSON.stringify(resp));
        console.log(JSON.stringify(resp));

        if (!isNullOrUndefined(LoginObject.username)) {

          this.procureCacheService.setLoginDetails(LoginObject);
          this.router.navigate(['/dashboard']);

        } else {
          this.errorMsg = "Please enter valid Credentials";
        }
      });

    } else {
      this.errorMsg = "Please enter the password";
    }
  }

}
