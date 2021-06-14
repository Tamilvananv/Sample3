import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiContactDetailComponent } from './rfi-contact-detail.component';

describe('RfiContactDetailComponent', () => {
  let component: RfiContactDetailComponent;
  let fixture: ComponentFixture<RfiContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
