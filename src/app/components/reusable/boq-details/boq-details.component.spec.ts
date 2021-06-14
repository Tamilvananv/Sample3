import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqDetailsComponent } from './boq-details.component';

describe('BoqDetailsComponent', () => {
  let component: BoqDetailsComponent;
  let fixture: ComponentFixture<BoqDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
