import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRespositoryComponent } from './template-respository.component';

describe('TemplateRespositoryComponent', () => {
  let component: TemplateRespositoryComponent;
  let fixture: ComponentFixture<TemplateRespositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRespositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRespositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
