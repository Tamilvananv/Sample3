import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../services/supplier';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION} from '../../../services/ApplicationConstants';

@Component({
  selector: 'app-supplier-info-add',
  templateUrl: './supplier-info-add.component.html',
  styleUrls: ['./supplier-info-add.component.scss']
})
export class SupplierInfoAddComponent implements OnInit {

  form: FormGroup;
   
  constructor(
    public supplierService: SupplierService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      appno: new FormControl('', [Validators.required])
    });
  }
   
  get f(){
    return this.form.controls;
  }
    
  submit(){
    console.log(this.form.value);
    this.supplierService.create(this.form.value,SUBMISSION_CLASSIFICATION_SUPPLIER_REGISTRATION).subscribe(res => {
         console.log('Supplier information added successfully!');
         this.router.navigateByUrl('supplier-info');
    })
  }
  

}
