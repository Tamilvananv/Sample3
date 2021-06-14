import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderBasicInformationComponent } from './tender-basic-information.component';

describe('TenderBasicInformationComponent', () => {
  let component: TenderBasicInformationComponent;
  let fixture: ComponentFixture<TenderBasicInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderBasicInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
