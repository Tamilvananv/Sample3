import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedQuestionsAnswerComponent } from './consolidated-questions-answer.component';

describe('ConsolidatedQuestionsAnswerComponent', () => {
  let component: ConsolidatedQuestionsAnswerComponent;
  let fixture: ComponentFixture<ConsolidatedQuestionsAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedQuestionsAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedQuestionsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
