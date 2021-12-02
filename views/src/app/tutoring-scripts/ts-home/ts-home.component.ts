import { Component, OnInit } from '@angular/core';
import { ExtractCookieService } from 'src/app/services/extract-cookie.service';

@Component({
  selector: 'app-ts-home',
  templateUrl: './ts-home.component.html',
  styleUrls: ['./ts-home.component.css']
})
export class TsHomeComponent implements OnInit {

  constructor(private cookieService: ExtractCookieService) { }

  role = '';

  ngOnInit(): void {
    this.role = this.cookieService.getRole();
  }

}
