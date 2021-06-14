import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationRecordCountComponent } from './pagination-record-count.component';

describe('PaginationRecordCountComponent', () => {
  let component: PaginationRecordCountComponent;
  let fixture: ComponentFixture<PaginationRecordCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationRecordCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationRecordCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
