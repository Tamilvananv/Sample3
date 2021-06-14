import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCompletionDetailsComponent } from './work-completion-details.component';

describe('WorkCompletionDetailsComponent', () => {
  let component: WorkCompletionDetailsComponent;
  let fixture: ComponentFixture<WorkCompletionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCompletionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCompletionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
