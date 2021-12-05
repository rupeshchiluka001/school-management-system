import { Component, OnInit } from '@angular/core';
import { ExtractCookieService } from 'src/app/services/extract-cookie.service';
import { BookQuery } from 'src/app/models/book-query';
import { ExtractLibInfoService } from 'src/app/services/extract-lib-info.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.css']
})
export class ReturnBooksComponent implements OnInit {

  constructor(private cookieService: ExtractCookieService,
              private libService: ExtractLibInfoService) { }

  role = this.cookieService.getRole();
  books!: Book[];
  listEmpty = false;

  ngOnInit(): void {
    this.libService.getIssuedBookList().subscribe({
      next: data => {
        this.books = data;
        if (Object.keys(data).length == 0) this.listEmpty = true;
      },
      error: err => alert(`Err: ${err.error.msg}`),
    });
  }

}
