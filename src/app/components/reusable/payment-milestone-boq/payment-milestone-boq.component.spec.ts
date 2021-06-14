import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMilestoneBoqComponent } from './payment-milestone-boq.component';

describe('PaymentMilestoneBoqComponent', () => {
  let component: PaymentMilestoneBoqComponent;
  let fixture: ComponentFixture<PaymentMilestoneBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMilestoneBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMilestoneBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
