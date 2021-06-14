import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  addUserForm = new FormGroup({
    addUserTitle: new FormControl('', Validators.required),
    addUserLoginId: new FormControl('', Validators.compose([ Validators.required, Validators.maxLength(15)])),
    addUserLoginUserName: new FormControl('', Validators.compose([ Validators.required, Validators.maxLength(15)])),
    addUserPassword: new FormControl('', Validators.required),
    addUserLoginPassword: new FormControl('', Validators.required),
    addUserTransactionPswd: new FormControl('', Validators.required),
    addUserCategory: new FormControl('',Validators.compose([ Validators.required, Validators.maxLength(15)])),
    addUserGender: new FormControl('', Validators.required),
    addUserDOB: new FormControl(''),
    addUserLoginEmailId: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.\b[a-zA-Z]{2,4}$')])),
    addUserPhoneNumber: new FormControl('', Validators.required),
    addUserMobileNumber: new FormControl('', Validators.required),
    addUserOfficialId: new FormControl('', Validators.required),
    addUserEntityType: new FormControl('', Validators.required),
    addUserRole: new FormControl('', Validators.required),
    addUserPSP: new FormControl('', Validators.required),
    addUserEntityLevel: new FormControl('', Validators.required),
    addUserBranch: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  addNewUser() {
    console.log(this.addUserForm.value)
  }

}
