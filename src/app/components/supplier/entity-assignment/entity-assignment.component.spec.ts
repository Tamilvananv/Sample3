import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAssignmentComponent } from './entity-assignment.component';

describe('EntityAssignmentComponent', () => {
  let component: EntityAssignmentComponent;
  let fixture: ComponentFixture<EntityAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
