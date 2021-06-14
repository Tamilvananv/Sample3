import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesNotificationComponent } from './queries-notification.component';

describe('QueriesNotificationComponent', () => {
  let component: QueriesNotificationComponent;
  let fixture: ComponentFixture<QueriesNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
