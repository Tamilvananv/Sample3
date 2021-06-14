import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQueriesComponent } from './post-queries.component';

describe('PostQueriesComponent', () => {
  let component: PostQueriesComponent;
  let fixture: ComponentFixture<PostQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
