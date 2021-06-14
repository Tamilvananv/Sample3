import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCategoryScopeComponent } from './supplier-category-scope.component';

describe('SupplierCategoryScopeComponent', () => {
  let component: SupplierCategoryScopeComponent;
  let fixture: ComponentFixture<SupplierCategoryScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCategoryScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCategoryScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
