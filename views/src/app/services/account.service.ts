import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  private getUserDetailsUrl = `${this.apiUrl}:${this.port}/api/user-details`;

  constructor(private http: HttpClient) { }

  registerUser(userData: User): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(this.signInUrl, {username, password});
  }

  logoutUser(): Observable<any> {
    return this.http.get(this.logOutUrl);
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.getUserDetailsUrl);
  }
}
