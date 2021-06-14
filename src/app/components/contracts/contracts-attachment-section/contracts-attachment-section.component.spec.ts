import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsAttachmentSectionComponent } from './contracts-attachment-section.component';

describe('ContractsAttachmentSectionComponent', () => {
  let component: ContractsAttachmentSectionComponent;
  let fixture: ComponentFixture<ContractsAttachmentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsAttachmentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsAttachmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
