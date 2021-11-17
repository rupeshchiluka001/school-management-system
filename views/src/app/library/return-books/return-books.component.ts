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

  ngOnInit(): void {
    this.libService.getIssuedBookList(this.cookieService.getId()).subscribe({
      next: data => {
        console.log("return books:", data)
        this.books = data;
      },
      error: err => console.log("err: ", err),
    });
  }

}
