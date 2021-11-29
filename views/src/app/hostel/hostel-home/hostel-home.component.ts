import { Component, OnInit } from '@angular/core';
import { ExtractCookieService } from 'src/app/services/extract-cookie.service';

@Component({
  selector: 'app-hostel-home',
  templateUrl: './hostel-home.component.html',
  styleUrls: ['./hostel-home.component.css']
})
export class HostelHomeComponent implements OnInit {

  constructor(private cookieService: ExtractCookieService) { }

  role = '';

  ngOnInit(): void {
    this.role = this.cookieService.getRole();
  }

}
