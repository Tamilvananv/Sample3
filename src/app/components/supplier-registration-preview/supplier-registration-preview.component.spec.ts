import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistrationPreviewComponent } from './supplier-registration-preview.component';

describe('SupplierRegistrationPreviewComponent', () => {
  let component: SupplierRegistrationPreviewComponent;
  let fixture: ComponentFixture<SupplierRegistrationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRegistrationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRegistrationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
