import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  // private currentUserSubjectTemp: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public tempUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // this.currentUserSubjectTemp = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('tempCurrentUser')));
    // this.tempUser = this.currentUserSubjectTemp.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    // var value = { username, password };
    // var encryptData = this._AESEncryptDecryptService.encrypt("{ username, password }");
    // var decryptData = JSON.parse(this._AESEncryptDecryptService.decrypt(encryptData));

    // console.log("Encrypt Data : ", encryptData);
    // console.log("Decrypt Data : ", decryptData);

    return this.http.post<any>(`${environment.apiUrl}auth/token`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // let UserData = JSON.stringify(user);
          let UserData = user;
          console.log(UserData);
          // console.log("Status : ", UserData.status);
          if (UserData['status'] == 'OK') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user.data);
            // console.log("Email Data  : ", user);
          } else {
            console.log('Login failed');
            return user;
          }
          return user;
        } else {
          return { "status": 0, "message": "username and password are should not be empty." }
        }


      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
