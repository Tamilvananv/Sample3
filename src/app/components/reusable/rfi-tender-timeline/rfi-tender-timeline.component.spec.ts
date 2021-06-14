import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiTenderTimelineComponent } from './rfi-tender-timeline.component';

describe('RfiTenderTimelineComponent', () => {
  let component: RfiTenderTimelineComponent;
  let fixture: ComponentFixture<RfiTenderTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiTenderTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiTenderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
