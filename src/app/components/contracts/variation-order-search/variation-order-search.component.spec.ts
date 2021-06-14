import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationOrderSearchComponent } from './variation-order-search.component';

describe('VariationOrderSearchComponent', () => {
  let component: VariationOrderSearchComponent;
  let fixture: ComponentFixture<VariationOrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationOrderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
