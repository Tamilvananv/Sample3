import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionCertificateSearchComponent } from './completion-certificate-search.component';

describe('CompletionCertificateSearchComponent', () => {
  let component: CompletionCertificateSearchComponent;
  let fixture: ComponentFixture<CompletionCertificateSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionCertificateSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionCertificateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
