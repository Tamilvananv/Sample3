import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesDetailComponent } from './queries-detail.component';

describe('QueriesDetailComponent', () => {
  let component: QueriesDetailComponent;
  let fixture: ComponentFixture<QueriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
