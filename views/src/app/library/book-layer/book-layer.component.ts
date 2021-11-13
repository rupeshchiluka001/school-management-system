import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractLibInfoService } from '../../services/extract-lib-info.service';

@Component({
  selector: 'app-book-layer',
  templateUrl: './book-layer.component.html',
  styleUrls: ['./book-layer.component.css']
})
export class BookLayerComponent implements OnInit, OnDestroy {

  constructor(private libService: ExtractLibInfoService) { }

  sub!: Subscription;
  books!: Book[];
  filter = "title";
  searchValue = "";
  searchedValue = "";
  searchedFilter = "";
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.getBooks("");
  }

  getBooks(queryParams: string): void {
    this.sub = this.libService.getBooks(queryParams).subscribe({
      next: data => {
        this.books = data.books;
        this.searchedValue = data.value;
        this.searchedFilter = data.filter;
        this.currentPage = data.current;
        this.totalPages = data.pages;
      },
      error: err => console.log("Error: ", err),
    });
  }

  searchBooks(): void  {
    this.getBooks(`?filter=${this.filter}&value=${this.searchValue}`);
  }

  pageArray(): Array<number> {
    return new Array(this.totalPages);
  }

  showSelectedPage(pageNum: number): Object {
    if (pageNum == this.currentPage) {
      return {
        'box-shadow': '#00000029 0px 3px 6px, #0000003b 0px 3px 6px',
      }
    }
    else {
      return {
        'box-shadow': '0',
        'color': '#888888',
        'cursor': 'pointer',
      }
    }
  }

  pageClicked(pageNum: number): void {
    if (pageNum !== this.currentPage) {
      this.getBooks(`?filter=${this.filter}&value=${this.searchValue}&page=${pageNum}`);
    }
  }

  ngOnDestroy(): void {
    if (this.sub instanceof Subscription) {
      this.sub.unsubscribe();
    }
  }

}
