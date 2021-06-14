import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBankDetailsComponent } from './supplier-bank-details.component';

describe('SupplierBankDetailsComponent', () => {
  let component: SupplierBankDetailsComponent;
  let fixture: ComponentFixture<SupplierBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
