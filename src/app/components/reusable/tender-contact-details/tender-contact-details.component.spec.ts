import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderContactDetailsComponent } from './tender-contact-details.component';

describe('TenderContactDetailsComponent', () => {
  let component: TenderContactDetailsComponent;
  let fixture: ComponentFixture<TenderContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
