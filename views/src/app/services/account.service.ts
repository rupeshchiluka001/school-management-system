import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost';
  private port = 3000;
  private signUpUrl = `${this.apiUrl}:${this.port}/api/register`;
  private signInUrl = `${this.apiUrl}:${this.port}/api/login`;
  private logOutUrl = `${this.apiUrl}:${this.port}/api/logout`;

  constructor(private http: HttpClient) { }

  registerUser(userData: User): Observable<any> {
    return this.http.post(this.signUpUrl, userData, {responseType: 'text'});
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(this.signInUrl, {username, password}, {responseType: 'text'});
  }

  logoutUser(): Observable<any> {
    return this.http.get(this.logOutUrl);
  }
}
