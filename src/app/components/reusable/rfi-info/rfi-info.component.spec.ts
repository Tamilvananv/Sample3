import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiInfoComponent } from './rfi-info.component';

describe('RfiInfoComponent', () => {
  let component: RfiInfoComponent;
  let fixture: ComponentFixture<RfiInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
