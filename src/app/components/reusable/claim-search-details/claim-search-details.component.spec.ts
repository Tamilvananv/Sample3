import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSearchDetailsComponent } from './claim-search-details.component';

describe('ClaimSearchDetailsComponent', () => {
  let component: ClaimSearchDetailsComponent;
  let fixture: ComponentFixture<ClaimSearchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSearchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
