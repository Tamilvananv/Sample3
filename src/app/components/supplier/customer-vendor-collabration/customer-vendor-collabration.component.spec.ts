import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVendorCollabrationComponent } from './customer-vendor-collabration.component';

describe('CustomerVendorCollabrationComponent', () => {
  let component: CustomerVendorCollabrationComponent;
  let fixture: ComponentFixture<CustomerVendorCollabrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVendorCollabrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVendorCollabrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
