import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ExtractHostelInfoService } from 'src/app/services/extract-hostel-info.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {

  constructor(private hostelService: ExtractHostelInfoService,
              private accountService: AccountService) { }

  room: Room = {} as Room;
  user: User = {} as User;
  roomAllotted = false;
  applied = false;
  userSub!: Subscription;
  roomSub!: Subscription;
  requestSub!: Subscription;
  leaveSub!: Subscription;

  ngOnInit(): void {
    this.userSub = this.accountService.getUserDetails().subscribe({
      next: data => {
        this.user = data;
        console.log("User: ", data);
        if (this.user.hosteller) {
          this.roomAllotted = true;
          console.log("Room alloted");
          this.roomSub = this.hostelService.getHostelRoomDetails().subscribe({
            next: data => {
              this.room = data;
              console.log("Room: ", data);
            },
            error: err => console.log("Err: ", err),
          });
        }
      },
      error: err => console.log("Err: ", err),
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

  leaveRoom(): void {
    this.leaveSub = this.hostelService.leaveHostelRoom().subscribe({
      next: data => {
        console.log("leave: ", data);
      },
      error: err =>   console.log("leave err: ", err)
    })
  }

  ngOnDestroy(): void {
    if (this.roomSub) this.roomSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
    if (this.requestSub) this.requestSub.unsubscribe();
    if (this.leaveSub) this.leaveSub.unsubscribe();
  }

}
