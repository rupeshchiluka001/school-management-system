import { Component, OnDestroy, OnInit } from '@angular/core';
import { subscribeOn, Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractLibInfoService } from '../../services/extract-lib-info.service';

@Component({
  selector: 'app-new-book-form',
  templateUrl: './new-book-form.component.html',
  styleUrls: ['./new-book-form.component.css']
})
export class NewBookFormComponent implements OnInit, OnDestroy {

  constructor(private libService: ExtractLibInfoService) { }

  newBookSub!: Subscription;
  title!: string;
  ISN!: string;
  author!: string;
  description!: string;
  category!: string;
  book!: Book;

  ngOnInit(): void {
    console.log("Amazing");
    this.book = {
      title: this.title, 
      ISN: this.ISN, 
      author: this.author, 
      description: this.description, 
      category: this.category,
      stock: 1
    };
  }

  submitNewBook(): Boolean {
    this.book.title = this.title;
    this.book.ISN = this.ISN;
    this.book.author = this.author;
    this.book.description = this.description;
    this.book.category = this.category;

    this.newBookSub = this.libService.postNewBook(this.book).subscribe({
        next: data => console.log("data: "+data),
        error: err => console.log("err: "+err)
    });
    return false;
  }

  ngOnDestroy(): void {
    if ( this.newBookSub ) {
      this.newBookSub.unsubscribe();
    }
  }

}
