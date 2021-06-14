import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQueriesDetailsComponent } from './post-queries-details.component';

describe('PostQueriesDetailsComponent', () => {
  let component: PostQueriesDetailsComponent;
  let fixture: ComponentFixture<PostQueriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostQueriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostQueriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
