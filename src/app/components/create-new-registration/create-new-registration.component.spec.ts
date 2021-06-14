import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewRegistrationComponent } from './create-new-registration.component';

describe('CreateNewRegistrationComponent', () => {
  let component: CreateNewRegistrationComponent;
  let fixture: ComponentFixture<CreateNewRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
