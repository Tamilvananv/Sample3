import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTenderDetailsComponent } from './public-tender-details.component';

describe('PublicTenderDetailsComponent', () => {
  let component: PublicTenderDetailsComponent;
  let fixture: ComponentFixture<PublicTenderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTenderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
