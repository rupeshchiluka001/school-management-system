import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractLibInfoService } from 'src/app/services/extract-lib-info.service';

@Component({
  selector: 'app-update-book-form',
  templateUrl: './update-book-form.component.html',
  styleUrls: ['./update-book-form.component.css']
})
export class UpdateBookFormComponent implements OnInit, OnDestroy {

  constructor(private libService: ExtractLibInfoService,
              private route: ActivatedRoute) { }

  updateBookSub!: Subscription;
  getBookSub!: Subscription;
  book: Book = {} as Book;

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') || '';
    
    if ( this.getBookSub ) this.getBookSub.unsubscribe();
    this.getBookSub = this.libService.getBookDetails(id).subscribe({
      next: data => {
        this.book = JSON.parse(data);
      },
      error: err => alert(`Err: ${err.error.msg}`)
    });
  }

  submitNewBook(): Boolean {
    this.updateBookSub = this.libService.postNewBook(this.book).subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
        window.location.reload();
      }
    });
    return false;
  }

  ngOnDestroy(): void {
    if ( this.updateBookSub ) this.updateBookSub.unsubscribe();
    if ( this.getBookSub ) this.getBookSub.unsubscribe();
  }

}
