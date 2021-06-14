import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatoryDocumentsComponent } from './mandatory-documents.component';

describe('MandatoryDocumentsComponent', () => {
  let component: MandatoryDocumentsComponent;
  let fixture: ComponentFixture<MandatoryDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatoryDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatoryDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
