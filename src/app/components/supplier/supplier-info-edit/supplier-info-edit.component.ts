import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../services/supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-supplier-info-edit',
  templateUrl: './supplier-info-edit.component.html',
  styleUrls: ['./supplier-info-edit.component.scss']
})
export class SupplierInfoEditComponent implements OnInit {

  applicationno: number;
  supplier: Supplier;
  form: FormGroup;

  constructor(
    public supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.applicationno = this.route.snapshot.params['postId'];
    this.supplierService.find(this.applicationno).subscribe((data: Supplier)=>{
      this.supplier = data;
    });
    
    this.form = new FormGroup({
      applicationno: new FormControl('', [Validators.required]),
      scopeofwork: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      childcategory: new FormControl('', Validators.required),
      submiteddate: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  // c{
  //   console.log(this.form.value);
  //   this.supplierService.update(this.applicationno, this.form.value).subscribe(res => {
  //        console.log('Supplier updated successfully!');
  //        this.router.navigateByUrl('/supplier-info');
  //   })
  // }

}
