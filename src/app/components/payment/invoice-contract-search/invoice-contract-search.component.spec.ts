import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceContractSearchComponent } from './invoice-contract-search.component';

describe('InvoiceContractSearchComponent', () => {
  let component: InvoiceContractSearchComponent;
  let fixture: ComponentFixture<InvoiceContractSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceContractSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceContractSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
