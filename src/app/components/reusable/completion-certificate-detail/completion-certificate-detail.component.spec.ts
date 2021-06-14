import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionCertificateDetailComponent } from './completion-certificate-detail.component';

describe('CompletionCertificateDetailComponent', () => {
  let component: CompletionCertificateDetailComponent;
  let fixture: ComponentFixture<CompletionCertificateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionCertificateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionCertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
