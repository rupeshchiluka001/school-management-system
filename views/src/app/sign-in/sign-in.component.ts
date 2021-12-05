import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private accountService: AccountService,
    private router: Router) { }

  username = '';
  password = '';
  sub!: Subscription;

  ngOnInit(): void {
  }

  submitForm(): void {
    this.sub = this.accountService.loginUser(this.username, this.password).subscribe({
      next: data => {
        this.router.navigate(['']);
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) this.sub.unsubscribe();
  }

}
