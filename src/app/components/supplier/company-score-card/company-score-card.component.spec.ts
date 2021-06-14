import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyScoreCardComponent } from './company-score-card.component';

describe('CompanyScoreCardComponent', () => {
  let component: CompanyScoreCardComponent;
  let fixture: ComponentFixture<CompanyScoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyScoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
