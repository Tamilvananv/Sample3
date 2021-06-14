import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSubmissionComponent } from './tender-submission.component';

describe('TenderSubmissionComponent', () => {
  let component: TenderSubmissionComponent;
  let fixture: ComponentFixture<TenderSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
