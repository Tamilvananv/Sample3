import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiBidBondComponent } from './rfi-bid-bond.component';

describe('RfiBidBondComponent', () => {
  let component: RfiBidBondComponent;
  let fixture: ComponentFixture<RfiBidBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiBidBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiBidBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
