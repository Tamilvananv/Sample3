import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedNotificationsDetailComponent } from './published-notifications-detail.component';

describe('PublishedNotificationsDetailComponent', () => {
  let component: PublishedNotificationsDetailComponent;
  let fixture: ComponentFixture<PublishedNotificationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedNotificationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedNotificationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
