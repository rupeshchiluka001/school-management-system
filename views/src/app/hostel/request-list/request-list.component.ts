import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HostelRequest } from 'src/app/models/hostel-request';
import { ExtractHostelInfoService } from 'src/app/services/extract-hostel-info.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {

  constructor(private hostelService: ExtractHostelInfoService) { }

  requestList!: HostelRequest[];
  currentPage = 0;
  sub!: Subscription;
  totalPages = 0;
  listIsEmpty = false;

  ngOnInit(): void {
    this.getRequests(`?page=1`);
  }

  getRequests(queryParams: string) :void {
    this.sub = this.hostelService.getHostelRequests(queryParams).subscribe({
      next: data => {
        this.requestList = data.hostelRequests;
        this.currentPage = data.current;
        this.totalPages = data.pages;
        if (this.requestList.length === 0) {
          this.listIsEmpty = true;
        }
      },
      error: err => alert(`Err: ${err.console.error.msg});
      }`)
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  pageArray(): Array<number> {
    return new Array(this.totalPages);
  }

  showSelectedPage(pageNum: number): Object {
    if (pageNum == this.currentPage) {
      return {
        'box-shadow': '#00000029 0px 3px 6px, #0000003b 0px 3px 6px',
      }
    }
    else {
      return {
        'box-shadow': '0',
        'color': '#888888',
        'cursor': 'pointer',
      }
    }
  }

  pageClicked(pageNum: number): void {
    if (pageNum !== this.currentPage) {
      this.getRequests(`?page=${pageNum}`);
    }
  }

  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe() }
  }

}
