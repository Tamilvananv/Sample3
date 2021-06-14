import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTenderDetailComponent } from './public-tender-detail.component';

describe('PublicTenderDetailComponent', () => {
  let component: PublicTenderDetailComponent;
  let fixture: ComponentFixture<PublicTenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
