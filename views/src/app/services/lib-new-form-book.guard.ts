import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExtractCookieService } from './extract-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LibNewFormBookGuard implements CanActivate {

  constructor(private cookieService: ExtractCookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let role = this.cookieService.getRole();
    return ( role === 'admin' || role === 'librarian' ) ? true : false;
  }
}
