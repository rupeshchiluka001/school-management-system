import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ExtractHostelInfoService } from 'src/app/services/extract-hostel-info.service';

@Component({
  selector: 'app-book-room-form',
  templateUrl: './book-room-form.component.html',
  styleUrls: ['./book-room-form.component.css']
})
export class BookRoomFormComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private hostelService: ExtractHostelInfoService) { }

  user: User = {} as User;
  roomAllotted = false;
  applied = false;
  getUserSub!: Subscription;
  postDataSub!: Subscription;
  requestSub!: Subscription;

  ngOnInit(): void {
    this.getUserSub = this.accountService.getUserDetails().subscribe({
      next: data => {
        this.user = data;
        if (this.user.hosteller) {
          this.roomAllotted = true;
        }
      },
      error: err => {alert(`Err: ${err.error.msg}`)}
    });

    this.requestSub = this.hostelService.checkRequest().subscribe({
      next: data => {
        this.applied = data.msg == "204" ? false : true;
      },
      error: err => { }
    });
  }

  submitRequest(): void {
    this.postDataSub = this.hostelService.bookHostelRoom().subscribe({
      error: err => {
        alert(`Err: ${err.error.msg}`);
      },
      complete: () => {
        window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getUserSub) this.getUserSub.unsubscribe();
    if (this.postDataSub) this.postDataSub.unsubscribe();
    if (this.requestSub) this.requestSub.unsubscribe();
  }

}
