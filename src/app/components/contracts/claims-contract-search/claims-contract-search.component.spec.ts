import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsContractSearchComponent } from './claims-contract-search.component';

describe('ClaimsContractSearchComponent', () => {
  let component: ClaimsContractSearchComponent;
  let fixture: ComponentFixture<ClaimsContractSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsContractSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsContractSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
