import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTempContractComponent } from './link-temp-contract.component';

describe('LinkTempContractComponent', () => {
  let component: LinkTempContractComponent;
  let fixture: ComponentFixture<LinkTempContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkTempContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTempContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
