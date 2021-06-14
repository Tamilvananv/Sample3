import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFinancialBusinessComponent } from './supplier-financial-business.component';

describe('SupplierFinancialBusinessComponent', () => {
  let component: SupplierFinancialBusinessComponent;
  let fixture: ComponentFixture<SupplierFinancialBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFinancialBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFinancialBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
