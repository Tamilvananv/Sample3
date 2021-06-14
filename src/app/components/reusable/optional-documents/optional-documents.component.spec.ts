import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalDocumentsComponent } from './optional-documents.component';

describe('OptionalDocumentsComponent', () => {
  let component: OptionalDocumentsComponent;
  let fixture: ComponentFixture<OptionalDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
