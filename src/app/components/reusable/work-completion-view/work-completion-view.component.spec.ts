import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCompletionViewComponent } from './work-completion-view.component';

describe('WorkCompletionViewComponent', () => {
  let component: WorkCompletionViewComponent;
  let fixture: ComponentFixture<WorkCompletionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCompletionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCompletionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
