import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headerDict: any;
  currentUser: any;
  requestOptions: any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log("User Service : ", this.currentUser)
    this.headerDict = {
      'Content-Type': 'application/json',
      'Authorization': this.currentUser ? this.currentUser.token : '',
    }
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
  }

  getUserMenus() {
    let params = { langId: this.currentUser.langId, roles: this.currentUser.roles };
    return this.http.post<any>(`${environment.apiUrl}admin/rolemenu/getMenus`, params, this.requestOptions);
  }

  addUser(params) {
    return this.http.post<any>(`${environment.apiUrl}auth/user/registration`, params, this.requestOptions);
  }
}
