import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ExtractCookieService } from '../services/extract-cookie.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private accountService: AccountService,
              private cookieService : ExtractCookieService) { }

  username = '';
  password = '';
  sub!: Subscription;

  ngOnInit(): void {
  }

  submitForm(): void {
    this.sub = this.accountService.loginUser(this.username, this.password).subscribe({
      next: data => {
        console.log(data);
        let cookie = this.cookieService.getRole();
        console.log(cookie);
      },
      error: err => console.log("err: ",err.status)
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) {
      this.sub.unsubscribe();
    }
  }

}
