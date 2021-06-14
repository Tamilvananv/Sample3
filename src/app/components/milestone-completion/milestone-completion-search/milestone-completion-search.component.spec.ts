import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneCompletionSearchComponent } from './milestone-completion-search.component';

describe('MilestoneCompletionSearchComponent', () => {
  let component: MilestoneCompletionSearchComponent;
  let fixture: ComponentFixture<MilestoneCompletionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneCompletionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneCompletionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
