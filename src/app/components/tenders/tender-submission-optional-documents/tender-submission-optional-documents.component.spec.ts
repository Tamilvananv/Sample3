import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSubmissionOptionalDocumentsComponent } from './tender-submission-optional-documents.component';

describe('TenderSubmissionOptionalDocumentsComponent', () => {
  let component: TenderSubmissionOptionalDocumentsComponent;
  let fixture: ComponentFixture<TenderSubmissionOptionalDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSubmissionOptionalDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSubmissionOptionalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
