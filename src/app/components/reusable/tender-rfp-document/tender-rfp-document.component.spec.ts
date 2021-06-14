import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderRfpDocumentComponent } from './tender-rfp-document.component';

describe('TenderRfpDocumentComponent', () => {
  let component: TenderRfpDocumentComponent;
  let fixture: ComponentFixture<TenderRfpDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderRfpDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderRfpDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
