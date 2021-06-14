import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSubmissionModalComponent } from './tender-submission-modal.component';

describe('TenderSubmissionModalComponent', () => {
  let component: TenderSubmissionModalComponent;
  let fixture: ComponentFixture<TenderSubmissionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSubmissionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSubmissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
