import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderProgressBarComponent } from './tender-progress-bar.component';

describe('TenderProgressBarComponent', () => {
  let component: TenderProgressBarComponent;
  let fixture: ComponentFixture<TenderProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
