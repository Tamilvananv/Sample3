import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }

      });
    }
    // else {
    // const headers = {
    //   'Authorization': 'Basic'+btoa('bctprocure360: procure-secret'),
    //   'Content-type': 'application/x-www-form-urlencoded'
    // }
    // request = request.clone({
    //   setHeaders: {
    //     Type: 'Basic Auth',
    //     Username: 'bctprocure360',
    //     Password: 'procure-secret'
    //   }

    // });
    // }
    return next.handle(request);
  }
}
