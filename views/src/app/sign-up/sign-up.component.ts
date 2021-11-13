import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  name = '';
  email = '';
  pwd = '';
  gender = '';
  dateOfBirth = '';
  role = '';
  

  ngOnInit(): void {
  }

  submitForm(): void {
    //
  }
}
