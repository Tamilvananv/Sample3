import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/services/supplier';
// import { SupplierDataModel } from '../components/supplier/model/SupplierDataModel';
import { QualificationStatusService } from 'src/app/services/PrequalificationStatusUpdate.service';
import { isNullOrUndefined } from 'src/app/tools';
import { AuthenticationService, UserService, SharedService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   name = 'Angular';
   currDiv: string = 'A';
   qualificationStatus: string;
   isShow = false;
   qualifiedStatus: boolean = null;
   loginObj: any;
   supplierId: string;
   loginUserID: string;
   companyId: string;
   suppliers = []; //Array of supplier
   supplierScoreCardSummary: any;
   langId: string;
   preQualificationScorecardDtlList = [{
      description: null,
      weightage: null,
      givenScore: null,
      applicableScore: null,
      preQualiId: null
   }];
   supplierCategoryList: any;
   qualiStatus: string;
   currentUser: any;
   isLoginMenu: boolean = false;

   menuList: any = [];


   menuSampleJson = [
      {
         "menuName": "General",
         "menuUrl": "/admin-home",
         "parentMenu": true,
         "displayOrder": 1,
         "menuId": 1,
         "parentId": 0,
         "menuType": null
      },
      {
         "menuName": "ENTITY",
         "menuUrl": "/company-hierarchy-setup",
         "parentMenu": false,
         "displayOrder": 2,
         "menuId": 2,
         "parentId": 1,
         "menuType": null
      },
      {
         "menuName": "MASTER DATA",
         "menuUrl": "/lov-master",
         "parentMenu": false,
         "displayOrder": 1,
         "menuId": 3,
         "parentId": 1,
         "menuType": null
      },
      {
         "menuName": "SUPPLIER REGISTRATION",
         "menuUrl": "/supplier-info",
         "parentMenu": true,
         "displayOrder": 11,
         "menuId": 11,
         "parentId": 1,
         "menuType": null
      },
      {
         "menuName": "MANAGE SUPPLIER REGISTRATION",
         "menuUrl": "/supplier-info",
         "parentMenu": false,
         "displayOrder": 1,
         "menuId": 18,
         "parentId": 11,
         "menuType": null
      },
      {
         "menuName": "PROFILE UPDATES",
         "menuUrl": "/profile_updates",
         "parentMenu": false,
         "displayOrder": 2,
         "menuId": 19,
         "parentId": 11,
         "menuType": null
      },
      {
         "menuName": "ADD/REMOVE SCOPE",
         "menuUrl": "/supplier-category-scope",
         "parentMenu": false,
         "displayOrder": 3,
         "menuId": 20,
         "parentId": 11,
         "menuType": null
      }
   ];

   constructor(public supplierService: SupplierService, public translateService: TranslateService,
      public procureCacheService: ProcureCacheService, private router: Router,
      private qualiData: QualificationStatusService, private authenticationService: AuthenticationService,
      private userService: UserService, private sharedService: SharedService) {
      this.currentUser = this.authenticationService.currentUserValue;
      if (this.currentUser) {
         this.isLoginMenu = true;
      }
      translateService.addLangs(['en', 'ar']);
      translateService.setDefaultLang('en');
   }
   toggleDisplay() {
      this.isShow = !this.isShow;
   }

   useLanguage(language) {
      this.translateService.use(language).toPromise();
   }

   ngOnInit(): void {
      this.langId = this.procureCacheService.getLangId();
      // this.constructMenu();
      // let results = this.constructMenu(this.menuSampleJson, 0);
      // this.menuList = JSON.stringify(results, null, ' ');
      if (this.isLoginMenu) {
         this.getMenuList();
         // this.menuList = this.constructMenu(this.menuSampleJson, 0);
         // console.log("Results : ", results);
      }


      /* this.supplierService.getPreQualificationScorecard(this.procureCacheService.getSupplierId()).subscribe((preQualificationData: SupplierDataModel) => {
         this.procureCacheService.setPrequalificationStatus(preQualificationData.data.qualificationStatus);
         console.log(preQualificationData.data.qualificationStatus);
       });*/

      // this.supplierService.getCategoryDetails(this.procureCacheService.getSupplierId(), this.langId).then((data: SupplierDataModel) => {
      //   if (!isNullOrUndefined(data.data)) {
      //     this.supplierScoreCardSummary = data.data;
      //     console.log(this.supplierScoreCardSummary);

      //     if (!isNullOrUndefined(this.supplierScoreCardSummary)) {
      //       this.supplierScoreCardSummary.forEach(categoryData => {

      //         if (categoryData.status == "7001") { //Qualified
      //           this.qualiStatus = categoryData.status;
      //         }
      //         if (categoryData.status == "7002") { //Rejected
      //           this.qualiStatus = categoryData.status;
      //         }
      //         if (categoryData.status == "7003") { //Need more info
      //           this.qualiStatus = categoryData.status;
      //         }
      //       })
      //       this.procureCacheService.setPrequalificationStatus(this.qualiStatus);
      //       this.qualificationStatus = this.qualiStatus;

      //       this.qualiData.changeQualiStatus(this.qualificationStatus);
      //       console.log(this.qualificationStatus);
      //     }
      //   }
      // });

   }

   getMenuList() {
      this.userService.getUserMenus()
         .pipe(first())
         .subscribe(
            data => {
               console.log("Menu Data : ", data);
               this.menuList = this.constructMenu(data, 0);
               this.menuList = this.menuList.sort((a, b) => a.displayOrder - b.displayOrder);
               console.log("Parent Menu : ", this.menuList.filter(function (d) { return d.parentId === 0 }))
               this.sharedService.setMenuCallback(this.menuList.filter(function (d) { return d.parentId === 0 }));
            },
            error => {

            });
   }

   constructMenu(directories, parent) {
      let node = [];
      directories
         .filter(function (d) { return d.parentId === parent })
         .forEach(function (d) {
            var cd = d;
            cd.submenu = this.constructMenu(directories, d.menuId);
            return node.push(cd);
         }.bind(this))
      return node;
   }

   menuBarClick() {
      this.qualiData.currentQualiStatus.subscribe(status => {
         this.qualificationStatus = status;
         console.log(this.qualificationStatus);
      });

      // this.supplierService.getCategoryDetails(this.procureCacheService.getSupplierId(), this.langId).then((data: SupplierDataModel) => {
      //   this.supplierScoreCardSummary = data.data;
      //   var qualifiedStatus = 0;
      //   var rejectedStatus = 0;
      //   var needMoreInfoStatus = 0;

      //   console.log(this.supplierScoreCardSummary);

      //   if (!isNullOrUndefined(this.supplierScoreCardSummary)) {
      //     this.supplierScoreCardSummary.forEach(scoreCard => {
      //       if (scoreCard.status == "7001") {
      //         qualifiedStatus = qualifiedStatus + 1;
      //       } //Qualified {
      //       if (scoreCard.status == "7002") {
      //         rejectedStatus = rejectedStatus + 1;
      //       }//Rejected {
      //       if (scoreCard.status == "7003") {
      //         needMoreInfoStatus = needMoreInfoStatus + 1;
      //       }//Need more info
      //     });
      //   }

      //   if (qualifiedStatus > 0) {
      //     this.qualifiedStatus = true; //qualified
      //     this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
      //   } else if (qualifiedStatus == 0 && needMoreInfoStatus > 0) {
      //     this.qualifiedStatus = false; //needMoreInfo
      //     this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
      //   } else {
      //     this.qualifiedStatus = false; //rejected
      //     this.procureCacheService.setQualifiedStatus(this.qualifiedStatus);
      //   }
      //   console.log(qualifiedStatus);
      //   console.log(this.qualifiedStatus);

      // })
   }

   ShowDiv(divVal: string) {
      this.currDiv = divVal;
   }

   profileUpdateSupplierTabs() {

      this.loginObj = this.procureCacheService.getLoginObject();
      this.supplierId = this.loginObj.supplierId;
      this.loginUserID = this.loginObj.loginUserID;
      this.companyId = this.loginObj.companyId;

      // this.supplierService.getAll(this.supplierId, this.loginUserID, this.companyId).subscribe((data: SupplierDataModel) => {

      //   if (data.data.length > 1) {
      //     this.suppliers = data.data;


      //     this.router.navigate(['/supplier-info']);
      //   }
      //   else if(data.data.length != 0) {
      //     this.procureCacheService.setProfileUpdateSelected(this.qualifiedStatus);
      //     this.procureCacheService.setCompId(this.suppliers[0].compId);

      //     this.router.navigate(['/supplier-information']);
      //     return;
      //   }

      // })
   }

   addRemoveScopeSupplierTabs() {
      this.loginObj = this.procureCacheService.getLoginObject();
      this.supplierId = this.loginObj.supplierId;
      this.loginUserID = this.loginObj.loginUserID;
      this.companyId = this.loginObj.companyId;

      // this.supplierService.getAll(this.supplierId, this.loginUserID, this.companyId).subscribe((data: SupplierDataModel) => {
      //   this.suppliers = data.data;
      //   if (this.suppliers.length == 1) {
      //     this.procureCacheService.setProfileUpdateSelected(this.qualifiedStatus);

      //     this.router.navigate(['/supplier-category-scope']);
      //     return;
      //   } else {
      //     this.router.navigate(['/supplier-info']);
      //   }
      // })
   }

   onProcureLogoClick() {
      this.router.navigate(['/dashboard']);

      // href="http://localhost:4200/dashboard"
   }
   onLogout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
   }
}
