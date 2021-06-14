import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContactDetailsComponent } from './supplier-contact-details.component';

describe('SupplierContactDetailsComponent', () => {
  let component: SupplierContactDetailsComponent;
  let fixture: ComponentFixture<SupplierContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
