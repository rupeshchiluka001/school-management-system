import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router) { }

  user: User = {} as User;
  sub!: Subscription;

  ngOnInit(): void {
  }

  submitForm(): void {
    this.sub = this.accountService.registerUser(this.user).subscribe({
      next: data => {
        this.router.navigate(['']);
      },
      error: err => alert(`Err: ${err.error.msg}`)
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) this.sub.unsubscribe();
  }
}
