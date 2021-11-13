import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, map } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookQuery } from 'src/app/models/book-query';

@Injectable(
  // {
  // providedIn: 'root'
// }
)
export class ExtractLibInfoService {

  private apiUrl = 'http://localhost';
  private port = 3000;
  private dataUrl = `${this.apiUrl}:${this.port}/api/logout`;
  private postNewBookUrl = `${this.apiUrl}:${this.port}/api/library/add-new-book`;
  private getBooksUrl = `${this.apiUrl}:${this.port}/api/library`;

  constructor(private http: HttpClient) { }

  getData(): Observable<String> {
    return this.http.get<String>(this.dataUrl);
  }

  postNewBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.postNewBookUrl, bookData);
  }

  getBooks(queryParams: String): Observable<BookQuery> {
    return this.http.get<BookQuery>(this.getBooksUrl+queryParams);
  }
}
