import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hostelRequestQuery } from '../models/hostel-request-query';

@Injectable({
  providedIn: 'root'
})
export class ExtractHostelInfoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost';
  private port = 3000;

  private bookRoomUrl = `${this.apiUrl}:${this.port}/api/hostel/book-hostel-room`;
  private leaveRoomUrl = `${this.apiUrl}:${this.port}/api/hostel/leave-hostel-room`;
  private roomDetailsUrl = `${this.apiUrl}:${this.port}/api/hostel/get-room-details`;
  private hostelRequestsUrl = `${this.apiUrl}:${this.port}/api/hostel/get-all-hostel-room-requests`;
  private acceptRequestUrl = `${this.apiUrl}:${this.port}/api/hostel/accept-room-request`;
  private checkRequestUrl = `${this.apiUrl}:${this.port}/api/hostel/check-room-request`;

  bookHostelRoom(): Observable<any> {
    return this.http.get(this.bookRoomUrl);
  }

  leaveHostelRoom(): Observable<any> {
    return this.http.get(this.leaveRoomUrl);
  }

  getHostelRoomDetails(): Observable<any> {
    return this.http.get(this.roomDetailsUrl);
  }

  getHostelRequests(queryParams: string): Observable<hostelRequestQuery> {
    return this.http.get<hostelRequestQuery>(this.hostelRequestsUrl+queryParams);
  }

  acceptRequest(hostelRequestId: string, userId: string): Observable<any> {
    console.log("hostel id: ", hostelRequestId);
    return this.http.post(this.acceptRequestUrl, {hostelRequestId, userId});
  }

  checkRequest(): Observable<any> {
    return this.http.get(this.checkRequestUrl);
  }
}
