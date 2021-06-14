import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderBidBondDetailsComponent } from './tender-bid-bond-details.component';

describe('TenderBidBondDetailsComponent', () => {
  let component: TenderBidBondDetailsComponent;
  let fixture: ComponentFixture<TenderBidBondDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderBidBondDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderBidBondDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
