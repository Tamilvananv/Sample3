import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/services/NewUser';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDataModel } from '../supplier/model/SupplierDataModel';
import { Router } from '@angular/router';
import { ProcureCacheService } from 'src/app/services/procure-cache.service';
import { UserService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-new-registration',
  templateUrl: './create-new-registration.component.html',
  styleUrls: ['./create-new-registration.component.scss']
})
export class CreateNewRegistrationComponent implements OnInit {
  name = 'Angular';
  currDiv: string = 'A';
  isShow = false;
  type: string;
  message: string;
  newUser: NewUser = {
    companyName: null,
    tradeLicenseNo: null,
    firstName: null,
    middleName: null,
    lastName: null,
    designation: null,
    phoneNo: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    role: 1
  };

  constructor(public supplierService: SupplierService,
    public procureCacheService: ProcureCacheService,
    private userService: UserService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  createUser() {
    console.log("create user: " + JSON.stringify(this.newUser));
    

    if (this.newUser.password != this.newUser.confirmPassword) {
      alert("Login Password and Confirm Password should be same");
      return;
    }

    console.log("New User : ", this.newUser);
    // return;

    this.userService.addUser(this.newUser)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Register Data : ", data);
        },
        error => {

        });
    // this.supplierService.createNewUserDetails(this.newUser).subscribe((data: SupplierDataModel) => {
    //   console.log(data);

    //   if (data.status !== "OK" && data.data == null) {
    //     alert(data.message + "..Please enter different userId");
    //     return;
    //   }
    //   alert(data.message);
    //   this.router.navigate(['/login']);
    // });
  }

  close() {
    this.type = null;
  }

}
