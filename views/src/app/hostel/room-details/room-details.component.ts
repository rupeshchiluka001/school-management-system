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
        if (this.user.hosteller) this.getRoomDetails();
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
      },
    });

    this.requestSub = this.hostelService.checkRequest().subscribe({
      next: data => {
        this.applied = data.msg == "204" ? false : true;
      },
      error: err => {
        if (err.status === 204) {
          this.applied = false;
        }
        alert(`Err: ${err.error.msg}`);
      }
    });

  }

  getRoomDetails(): void {
    this.roomAllotted = true;
    this.roomSub = this.hostelService.getHostelRoomDetails().subscribe({
      next: data => {
        this.room = data;
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
      },
    });
  }

  leaveRoom(): void {
    this.leaveSub = this.hostelService.leaveHostelRoom().subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.roomSub) this.roomSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
    if (this.requestSub) this.requestSub.unsubscribe();
    if (this.leaveSub) this.leaveSub.unsubscribe();
  }

}
