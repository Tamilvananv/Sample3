import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkingContractComponent } from './linking-contract.component';

describe('LinkingContractComponent', () => {
  let component: LinkingContractComponent;
  let fixture: ComponentFixture<LinkingContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkingContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkingContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
