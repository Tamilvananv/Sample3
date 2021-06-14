import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionDetailOnlineComponent } from './auction-detail-online.component';

describe('AuctionDetailOnlineComponent', () => {
  let component: AuctionDetailOnlineComponent;
  let fixture: ComponentFixture<AuctionDetailOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionDetailOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionDetailOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
