import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiSearchComponent } from './rfi-search.component';

describe('RfiSearchComponent', () => {
  let component: RfiSearchComponent;
  let fixture: ComponentFixture<RfiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
