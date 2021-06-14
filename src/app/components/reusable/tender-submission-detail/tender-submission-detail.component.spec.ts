import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSubmissionDetailComponent } from './tender-submission-detail.component';

describe('TenderSubmissionDetailComponent', () => {
  let component: TenderSubmissionDetailComponent;
  let fixture: ComponentFixture<TenderSubmissionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSubmissionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSubmissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
