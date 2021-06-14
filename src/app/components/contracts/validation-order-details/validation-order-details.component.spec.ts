import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationOrderDetailsComponent } from './validation-order-details.component';

describe('ValidationOrderDetailsComponent', () => {
  let component: ValidationOrderDetailsComponent;
  let fixture: ComponentFixture<ValidationOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
