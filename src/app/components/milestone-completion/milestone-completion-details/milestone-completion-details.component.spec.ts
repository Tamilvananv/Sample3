import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneCompletionDetailsComponent } from './milestone-completion-details.component';

describe('MilestoneCompletionDetailsComponent', () => {
  let component: MilestoneCompletionDetailsComponent;
  let fixture: ComponentFixture<MilestoneCompletionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneCompletionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneCompletionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
