import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierScoreCardSummaryComponent } from './supplier-score-card-summary.component';

describe('SupplierScoreCardSummaryComponent', () => {
  let component: SupplierScoreCardSummaryComponent;
  let fixture: ComponentFixture<SupplierScoreCardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierScoreCardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierScoreCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
