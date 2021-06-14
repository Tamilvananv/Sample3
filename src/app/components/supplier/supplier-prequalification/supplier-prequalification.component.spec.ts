import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPrequalificationComponent } from './supplier-prequalification.component';

describe('SupplierPrequalificationComponent', () => {
  let component: SupplierPrequalificationComponent;
  let fixture: ComponentFixture<SupplierPrequalificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPrequalificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPrequalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
