import { Component, Input, OnInit } from '@angular/core';
import { HostelRequest } from 'src/app/models/hostel-request';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor() { }

  hostelRequest!: HostelRequest;

  ngOnInit(): void {
  }

}
