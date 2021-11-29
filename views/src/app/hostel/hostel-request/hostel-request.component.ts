import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HostelRequest } from 'src/app/models/hostel-request';
import { ExtractHostelInfoService } from 'src/app/services/extract-hostel-info.service';

@Component({
  selector: 'app-hostel-request',
  templateUrl: './hostel-request.component.html',
  styleUrls: ['./hostel-request.component.css']
})
export class HostelRequestComponent implements OnInit, OnDestroy {

  constructor(private hostelService: ExtractHostelInfoService) { }

  @Input() request!: HostelRequest;
  userSub!: Subscription
  sub!: Subscription;

  ngOnInit(): void {
  }

  acceptRequest(): void {
    console.log("accepting");
    this.sub = this.hostelService.acceptRequest(this.request._id, this.request.userId).subscribe({
      next: data => {console.log("Data: ", data)},
      error: err => console.log("Err: ", err),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }

}
