import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ExtractCookieService } from 'src/app/services/extract-cookie.service';
import { ExtractLibInfoService } from '../../services/extract-lib-info.service';

@Component({
  selector: 'app-library-home',
  templateUrl: './library-home.component.html',
  styleUrls: ['./library-home.component.css'],
})
export class LibraryHomeComponent implements OnInit {

  constructor(private cookieService: ExtractCookieService) {}

  hello: string = "Hello world";
  books: Book[] = [];
  role = '';

  ngOnInit(): void {
    this.role = this.cookieService.getRole();
  }

}
