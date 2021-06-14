import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTendersComponent } from './public-tenders.component';

describe('PublicTendersComponent', () => {
  let component: PublicTendersComponent;
  let fixture: ComponentFixture<PublicTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
