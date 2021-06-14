import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiDetailsComponent } from './rfi-details.component';

describe('RfiDetailsComponent', () => {
  let component: RfiDetailsComponent;
  let fixture: ComponentFixture<RfiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
