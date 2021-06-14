import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesSubmittedComponent } from './queries-submitted.component';

describe('QueriesSubmittedComponent', () => {
  let component: QueriesSubmittedComponent;
  let fixture: ComponentFixture<QueriesSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
