import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneCompletionViewComponent } from './milestone-completion-view.component';

describe('MilestoneCompletionViewComponent', () => {
  let component: MilestoneCompletionViewComponent;
  let fixture: ComponentFixture<MilestoneCompletionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneCompletionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneCompletionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
