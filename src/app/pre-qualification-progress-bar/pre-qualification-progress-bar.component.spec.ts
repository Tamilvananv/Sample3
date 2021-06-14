import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreQualificationProgressBarComponent } from './pre-qualification-progress-bar.component';

describe('PreQualificationProgressBarComponent', () => {
  let component: PreQualificationProgressBarComponent;
  let fixture: ComponentFixture<PreQualificationProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreQualificationProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreQualificationProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
