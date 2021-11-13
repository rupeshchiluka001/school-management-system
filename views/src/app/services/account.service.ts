import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost';
  private port = 3000;
  private signUpUrl = `${this.apiUrl}:${this.port}/api/register`;

  constructor(private http: HttpClient) { }

  registerUser(userData: User): Observable<String> {
    return this.http.post<String>(this.signUpUrl, userData);
  }
}
