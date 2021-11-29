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
import { LibNewFormBookGuard } from '../services/lib-new-form-book.guard';

const routes: Routes = [
  { path: '', component: LibraryHomeComponent,
    children: [
      { path: 'add-new-book', component: NewBookFormComponent, canActivate: [LibNewFormBookGuard] },
      { path: 'update-book/:id', component: UpdateBookFormComponent },
      { path: 'return-books', component: ReturnBooksComponent },
      { path: 'books', component: BookLayerComponent },
      { path: '**', redirectTo: 'books' },
    ]
   },
];

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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ExtractLibInfoService]
})
export class LibraryModule { }
