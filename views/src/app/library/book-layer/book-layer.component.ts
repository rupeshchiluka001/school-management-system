import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractLibInfoService } from '../services/extract-lib-info.service';

@Component({
  selector: 'app-book-layer',
  templateUrl: './book-layer.component.html',
  styleUrls: ['./book-layer.component.css']
})
export class BookLayerComponent implements OnInit, OnDestroy {

  constructor(private libService: ExtractLibInfoService) { }

  sub!: Subscription;
  books!: Book[];
  filter: string = "title";
  searchValue: string = "";

  ngOnInit(): void {
    this.getBooks("");
  }

  getBooks(queryParams: string): void {
    if (this.sub instanceof Subscription) {
      this.sub.unsubscribe();
    }

    this.sub = this.libService.getBooks(queryParams).subscribe({
      next: data => this.books = data,
      error: err => console.log("Error: ", err),
    });
  }

  searchBooks(): void  {
    this.getBooks(`?filter=${this.filter}&value=${this.searchValue}`);
  }

  ngOnDestroy(): void {
    if (this.sub instanceof Subscription) {
      this.sub.unsubscribe();
    }
  }

}
