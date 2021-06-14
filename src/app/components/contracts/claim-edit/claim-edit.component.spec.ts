import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEditComponent } from './claim-edit.component';

describe('ClaimEditComponent', () => {
  let component: ClaimEditComponent;
  let fixture: ComponentFixture<ClaimEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
