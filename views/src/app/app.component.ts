import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    console.log("initializing...");
  }

  title: string = 'views';
  sub!: Subscription;

  logout(): void {
    this.sub = this.accountService.logoutUser().subscribe({
      next: data => {
        console.log("next: ", data);
        alert("User Successfully Logged Out!!");
      },
      error: error => console.log("user err: ", error),
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) {
      this.sub.unsubscribe();
    }
  }
}
