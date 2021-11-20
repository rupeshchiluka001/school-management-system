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
  private getBookDetailsUrl = `${this.apiUrl}:${this.port}/api/library/get-book`;
  private deleteBookUrl = `${this.apiUrl}:${this.port}/api/library/delete-book`;
  private issuedBookListUrl = `${this.apiUrl}:${this.port}/api/library/get-issued-books`;
  private postIssueUrl = `${this.apiUrl}:${this.port}/api/library/post-issue`;
  private returnBookUrl = `${this.apiUrl}:${this.port}/api/library/return-book`;

  constructor(private http: HttpClient) { }

  getData(): Observable<string> {
    return this.http.get<string>(this.dataUrl);
  }

  postNewBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.postNewBookUrl, bookData);
  }

  getBooks(queryParams: string): Observable<BookQuery> {
    return this.http.get<BookQuery>(this.getBooksUrl+queryParams);
  }

  getBookDetails(id: string): Observable<any> {
    return this.http.get(this.getBookDetailsUrl, {params: {id}, responseType: 'text'});
  }

  getIssuedBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.issuedBookListUrl);
  }

  postIssue(bookId: string): Observable<any> {
    return this.http.post(this.postIssueUrl, {bookId});
  }

  returnBook(bookId: string): Observable<any> {
    return this.http.get(this.returnBookUrl, {params: {bookId}});
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.get(this.deleteBookUrl, {params: {bookId}});
  }
}
