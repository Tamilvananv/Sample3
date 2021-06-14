import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedTendersComponent } from './limited-tenders.component';

describe('LimitedTendersComponent', () => {
  let component: LimitedTendersComponent;
  let fixture: ComponentFixture<LimitedTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitedTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitedTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
