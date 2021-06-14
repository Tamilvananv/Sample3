import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogBoxComponent } from './modal-dialog-box.component';

describe('ModalDialogBoxComponent', () => {
  let component: ModalDialogBoxComponent;
  let fixture: ComponentFixture<ModalDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
