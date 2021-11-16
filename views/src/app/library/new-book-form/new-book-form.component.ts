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
  book: Book = {} as Book;

  ngOnInit(): void {
    console.log("printing from new form component");
    this.book.stock = 1;
  }

  submitNewBook(): Boolean {
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
