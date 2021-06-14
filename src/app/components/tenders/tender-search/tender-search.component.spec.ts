import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSearchComponent } from './tender-search.component';

describe('TenderSearchComponent', () => {
  let component: TenderSearchComponent;
  let fixture: ComponentFixture<TenderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
