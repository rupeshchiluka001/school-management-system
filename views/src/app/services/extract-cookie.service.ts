import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractCookieService {

  private roleKey = "role=";
  private idKey = "id=j%3A%22";

  getRole(): string {
    let cookie = document.cookie;
    let roleIndex = cookie.indexOf(this.roleKey);
    if (roleIndex < 0) return '';
    roleIndex += 5;
    let partition = cookie.substring(roleIndex).indexOf(";");
    return (partition >= 0) ? cookie.substr(roleIndex, partition) : cookie.substr(roleIndex);
  }

  getId(): string {
    let cookie = document.cookie;
    let idIndex = cookie.indexOf(this.idKey);
    if (idIndex < 0) return '';
    idIndex += 10;
    let partition = cookie.substring(idIndex).indexOf(';');
    let value = (partition >= 0) ? cookie.substr(idIndex, partition) : cookie.substr(idIndex);
    console.log("user id: ", value.slice(0, -3));
    return value.slice(0, -3);
  }
}
