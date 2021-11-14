import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractCookieService {

  private key = "role=";

  getRole(): string {
    let cookie = document.cookie;
    let roleIndex = cookie.indexOf(this.key);
    if (roleIndex < 0) {
      return "";
    }
    roleIndex += 5;
    let partition = cookie.substring(roleIndex).indexOf(";");
    return (partition >= 0) ? cookie.substr(roleIndex, partition) : cookie.substr(roleIndex);
  }
}
