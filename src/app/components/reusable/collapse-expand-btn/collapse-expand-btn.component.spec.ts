import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseExpandBtnComponent } from './collapse-expand-btn.component';

describe('CollapseExpandBtnComponent', () => {
  let component: CollapseExpandBtnComponent;
  let fixture: ComponentFixture<CollapseExpandBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseExpandBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseExpandBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
