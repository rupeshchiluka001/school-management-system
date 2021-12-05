import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HostelRequest } from 'src/app/models/hostel-request';
import { ExtractHostelInfoService } from 'src/app/services/extract-hostel-info.service';

@Component({
  selector: 'app-hostel-request',
  templateUrl: './hostel-request.component.html',
  styleUrls: ['./hostel-request.component.css']
})
export class HostelRequestComponent implements OnDestroy {

  constructor(private hostelService: ExtractHostelInfoService,
              private router: Router) { }

  @Input() request!: HostelRequest;
  userSub!: Subscription
  sub!: Subscription;

  acceptRequest(): void {
    this.sub = this.hostelService.acceptRequest(this.request._id, this.request.userId).subscribe({
      next: data => {
        console.log("Data: ", data);
        window.location.reload();
      },
      error: err => {
        alert(`Err: ${err}`);
        window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }

}
