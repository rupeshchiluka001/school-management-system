import { Component, OnDestroy, OnInit } from '@angular/core';
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
        console.log("User: ", data);
        this.user = data;
        if (this.user.hosteller) {
          this.roomAllotted = true;
          console.log("Room Allotted");
        }
      },
      error: err => {console.log("Err occurred: ", err)}
    });

    this.requestSub = this.hostelService.checkRequest().subscribe({
      next: data => {
        console.log("request: ", data);
        this.applied = true;
        console.log("Room applied");
      },
      error: err => {
        console.log("Err: ", err);
        if (err.status === 401) {
          this.applied = false;
          console.log("Room Not Applied");
        }
      }
    });
  }

  submitRequest(): void {
    this.postDataSub = this.hostelService.bookHostelRoom().subscribe({
      next: data => {
        console.log("In book room form ... ", data);
      },
      error: err => console.log("Error: ", err),
    });
  }

  ngOnDestroy(): void {
    if (this.getUserSub) this.getUserSub.unsubscribe();
    if (this.postDataSub) this.postDataSub.unsubscribe();
    if (this.requestSub) this.requestSub.unsubscribe();
  }

}
