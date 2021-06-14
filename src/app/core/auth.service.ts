import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfoVO } from '../services/LoginInfoVO';
import { ProcureCacheService } from '../services/procure-cache.service';
import { map } from 'rxjs/operators';
import { SupplierDataModel } from '../components/supplier/model/SupplierDataModel';
import { Observable } from 'rxjs';
import { Holder } from './Model/holder';
import { User } from '../model/admin';
import { SupplierService } from '../services/supplier.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    loginInfoVO: LoginInfoVO;
    private isInitalized: boolean;
    loginUsername: string;
    userLoginObj = {
        username: null,
        password: null,
        grant_type: null
    }
    private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

    constructor(private http: HttpClient, private router: Router, private procureCacheService: ProcureCacheService, private supplierService: SupplierService) { }

    setLoggedIn(value: boolean) {
        this.loggedInStatus = value;
        localStorage.setItem('loggedIn', 'true');
    }

    getIsLoggedIn() {
        return this.loggedInStatus;
    }

    // auth(loginParams): Observable<User> {
    //     var rawData = {
    //         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ0ZXN0Zm5hbWUiLCJsYXN0TmFtZSI6InRlc3RsbmFtZSIsInN1cHBsaWVySWQiOiI2NTEiLCJ1c2VyX25hbWUiOiJ2ZW5kb3J1c2VyIiwicm9sZUlkIjoiNDMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJleHAiOjE2MDAwMTIyNTAsInVzZXJJZCI6Ijg4OCIsImF1dGhvcml0aWVzIjpbIlJPTEVfVkVORE9SIl0sImp0aSI6ImVmMmY4Yzg1LTEwZjYtNDE2YS1hM2I2LTE3YTVmMmM1MmE4ZiIsImNsaWVudF9pZCI6ImJjdHByb2N1cmUzNjAifQ._0pLkRmFU3ki6qu5ZotYxdzxxX7ZikXnluLLbIs4Xcw",
    //         "token_type": "bearer",
    //         "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ0ZXN0Zm5hbWUiLCJsYXN0TmFtZSI6InRlc3RsbmFtZSIsInN1cHBsaWVySWQiOiI2NTEiLCJ1c2VyX25hbWUiOiJ2ZW5kb3J1c2VyIiwicm9sZUlkIjoiNDMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJhdGkiOiJlZjJmOGM4NS0xMGY2LTQxNmEtYTNiNi0xN2E1ZjJjNTJhOGYiLCJleHAiOjE2MDAwMTIyNTAsInVzZXJJZCI6Ijg4OCIsImF1dGhvcml0aWVzIjpbIlJPTEVfVkVORE9SIl0sImp0aSI6IjkyNjg5Mjk5LWY0MjItNGQ1MS05ZjFiLWQ3N2Q3YzJmYTI1NSIsImNsaWVudF9pZCI6ImJjdHByb2N1cmUzNjAifQ.aQ6hWhTqUk3l7ixNGgG4xZnQ2pwrmUhth4DDZ-jSV8Y",
    //         "expires_in": 19999,
    //         "scope": "read write trust",
    //         "userId": "888",
    //         "firstName": "testfname",
    //         "lastName": "testlname",
    //         "roleId": "43",
    //         "supplierId": "651",
    //         "jti": "ef2f8c85-10f6-416a-a3b6-17a5f2c52a8f",
    //         "userName": "testUser",
    //         "role": "testRole"
    //     }
    //     // var user: User = rawData;
    //     // return user;
    //     if (this.isInitalized != true) {
    //         const headers = {
    //             'Authorization': 'Basic ' + btoa('bctprocure360:procure-secret'),
    //             'Content-type': 'application/x-www-form-urlencoded'
    //         }
    //         return this.http.post(this.apiURL + '/oauth/token/', loginParams, { headers }
    //         ).pipe(map(data => {

    //             let LoginObject = JSON.parse(JSON.stringify(data));
    //             console.log(JSON.stringify(data));
    //             if (!Holder.isError(LoginObject)) {
    //                 this.isInitalized = true;
    //                 this.procureCacheService.setLoginDetails(LoginObject);
    //                 this.router.navigate(['/dashboard']);
    //             } else {
    //                 throw new Error('Called Auth twice');
    //             }
    //             // const user : User = data.data;
    //             // return user;
    //             return rawData;
    //         })
    //         )}

    // }

//     auth(loginParams): Observable<any> {

//         if (this.isInitalized != true) {
//             const headers = {
//                 'Authorization': 'Basic ' + btoa('bctprocure360:procure-secret'),
//                 'Content-type': 'application/x-www-form-urlencoded'
//             }
//             return this.http.post(this.apiURL + '/oauth/token/', loginParams, { headers }
//             ).pipe(map(rawData => {

//                 let LoginObject = JSON.parse(JSON.stringify(rawData));
//                 console.log(JSON.stringify(rawData));
//                 if (!Holder.isError(LoginObject)) {
//                     this.isInitalized = true;
//                     this.procureCacheService.setLoginDetails(LoginObject);
//                     this.router.navigate(['/dashboard']);
//                 } else {
//                     throw new Error('Called Auth twice');
//                 }

//             })
//             )
//         }
//     }
// }

    auth() {

        this.loginInfoVO.username = this.loginUsername;
        // return this.httpClient.post(this.apiURL + '/welcome/', loginInfoVO)

        this.supplierService.login(this.loginInfoVO).subscribe(resp => {

            let LoginObject: LoginInfoVO = JSON.parse(JSON.stringify(resp));
            console.log(JSON.stringify(resp));
            if(LoginObject.username != null) {
            this.procureCacheService.setLoginDetails(LoginObject);
            // this.router.navigate(['/dashboard', LoginObject.supplierId, LoginObject.loginUserID, LoginObject.companyId, LoginObject.langId]);
            this.router.navigate(['/dashboard']);
            }
        });
    }
}
