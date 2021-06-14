import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInformationDetailsComponent } from './contract-information-details.component';

describe('ContractInformationDetailsComponent', () => {
  let component: ContractInformationDetailsComponent;
  let fixture: ComponentFixture<ContractInformationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractInformationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInformationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
