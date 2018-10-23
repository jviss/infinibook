import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreStoriesComponent } from './genre-stories.component';

describe('GenreStoriesComponent', () => {
  let component: GenreStoriesComponent;
  let fixture: ComponentFixture<GenreStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
