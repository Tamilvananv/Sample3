import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOQPaymentDetailsComponent } from './boq-payment-details.component';

describe('BOQPaymentDetailsComponent', () => {
  let component: BOQPaymentDetailsComponent;
  let fixture: ComponentFixture<BOQPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOQPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOQPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
