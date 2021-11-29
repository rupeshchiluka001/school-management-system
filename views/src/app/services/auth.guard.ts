import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ExtractCookieService } from './extract-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: ExtractCookieService) {}

  canActivate(): boolean {
    console.log("In auth guard...");
    return !(this.cookieService.getRole() === '');
  }
  
}
