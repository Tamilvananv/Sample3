import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTendersComponent } from './dashboard-tenders.component';

describe('DashboardTendersComponent', () => {
  let component: DashboardTendersComponent;
  let fixture: ComponentFixture<DashboardTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
