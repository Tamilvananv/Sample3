import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachSectionComponent } from './attach-section.component';

describe('AttachSectionComponent', () => {
  let component: AttachSectionComponent;
  let fixture: ComponentFixture<AttachSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
