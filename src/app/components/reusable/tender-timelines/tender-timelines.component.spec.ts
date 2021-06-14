import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderTimelinesComponent } from './tender-timelines.component';

describe('TenderTimelinesComponent', () => {
  let component: TenderTimelinesComponent;
  let fixture: ComponentFixture<TenderTimelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderTimelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
