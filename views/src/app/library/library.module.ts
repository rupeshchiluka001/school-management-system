import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { NewBookFormComponent } from './new-book-form/new-book-form.component';
import { ExtractLibInfoService } from '../services/extract-lib-info.service';
import { BookComponent } from './book/book.component';
import { BookLayerComponent } from './book-layer/book-layer.component';
import { UpdateBookFormComponent } from './update-book-form/update-book-form.component';
import { ReturnBooksComponent } from './return-books/return-books.component';

@NgModule({
  declarations: [
    LibraryHomeComponent,
    NewBookFormComponent,
    BookComponent,
    BookLayerComponent,
    UpdateBookFormComponent,
    ReturnBooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ExtractLibInfoService]
})
export class LibraryModule { }
