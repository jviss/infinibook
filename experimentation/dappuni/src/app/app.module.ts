import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MetaModule } from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';
import { GenresContentComponent } from './genres-content/genres-content.component';
import { GenreStoriesComponent } from './genres-content/genre-stories/genre-stories.component';
import { StoriesComponent } from './stories/stories.component';

@NgModule({
  declarations: [
    AppComponent,
    GenresContentComponent,
    GenreStoriesComponent,
    StoriesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
