import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInfoAddComponent } from './supplier-info-add.component';

describe('SupplierInfoAddComponent', () => {
  let component: SupplierInfoAddComponent;
  let fixture: ComponentFixture<SupplierInfoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierInfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
