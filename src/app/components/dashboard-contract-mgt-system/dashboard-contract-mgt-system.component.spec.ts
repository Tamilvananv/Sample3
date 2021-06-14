import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContractMgtSystemComponent } from './dashboard-contract-mgt-system.component';

describe('DashboardContractMgtSystemComponent', () => {
  let component: DashboardContractMgtSystemComponent;
  let fixture: ComponentFixture<DashboardContractMgtSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardContractMgtSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContractMgtSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
