import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedTenderSearchComponent } from './limited-tender-search.component';

describe('LimitedTenderSearchComponent', () => {
  let component: LimitedTenderSearchComponent;
  let fixture: ComponentFixture<LimitedTenderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitedTenderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitedTenderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
