import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { ProcureCacheService } from '../services/procure-cache.service';
import { SupplierService } from '../services/supplier.service';
import { AuthenticationService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  routeURL: string;


  constructor(public supplierService: SupplierService, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private procureCacheService: ProcureCacheService) {
    // console.log(this.routeURL + ":" + this.router.url);
    // this.routeURL = this.router.url;

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      // check if route is restricted by role
      // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     this.router.navigate(['/']);
      //     return false;
      // }

      // authorised so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;

    // console.log(state.url);
    // console.log(this.procureCacheService.getLoginObject());
    // if (this.procureCacheService.getLoginObject().supplierId == null) {
    //   this.router.navigate(['/login']);
    //   return false;

    //   // // role not authorised so redirect to home page
    //   // this.router.navigate(['/']);
    //   // return false;
    // }
    // console.log('Inside auth guard service' + this.procureCacheService.getPrequalificationStatus())
    

    // console.log(this.procureCacheService.getPrequalificationStatus());
    // console.log(this.procureCacheService.getProfileUpdateSelected());

    // if (this.procureCacheService.getPrequalificationStatus() == '7001' && state.url !== '/supplier-category-scope' && this.procureCacheService.getProfileUpdateSelected() != null) {
    //   console.log('Inside auth guard service - qualified, so redirecting to supplier category scope ');
    //   //qualified
    //   this.router.navigate(['/supplier-category-scope']);
    //   return false;
    // } else if (this.procureCacheService.getPrequalificationStatus() == '7003' && state.url == '/supplier-category-scope' && this.procureCacheService.getProfileUpdateSelected() != null) {
    //   console.log('Inside auth guard service - NMF, so redirecting from supplier category scope to attachment section');
    //   //need more info
    //   this.router.navigate(['/attachment-section']);
    //   //console.log(this.router.url);
    //   return false;
    // }
    // else {
    //   return true;
    // }

  }
}
