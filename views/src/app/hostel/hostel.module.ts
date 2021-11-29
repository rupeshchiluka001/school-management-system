import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelHomeComponent } from './hostel-home/hostel-home.component';
import { RouterModule, Routes } from '@angular/router';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { BookRoomFormComponent } from './book-room-form/book-room-form.component';
import { FormsModule } from '@angular/forms';
import { RequestListComponent } from './request-list/request-list.component';
import { RoomComponent } from './room/room.component';
import { HostelRequestComponent } from './hostel-request/hostel-request.component';

const routes: Routes = [
  { path: '', component: HostelHomeComponent,
    children: [
      { path: 'room-details', component: RoomDetailsComponent },
      { path: 'book-room', component: BookRoomFormComponent },
      { path: 'room-requests-list', component: RequestListComponent },
      { path: '**', redirectTo: 'room-details' },
    ]
   },
];

@NgModule({
  declarations: [
    HostelHomeComponent,
    RoomDetailsComponent,
    BookRoomFormComponent,
    RequestListComponent,
    RoomComponent,
    HostelRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HostelModule { }
