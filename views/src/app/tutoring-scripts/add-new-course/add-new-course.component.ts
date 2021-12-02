import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseLink } from 'src/app/models/course-link';
import { AccountService } from 'src/app/services/account.service';
import { ExtractTsInfoService } from 'src/app/services/extract-ts-info.service';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit, OnDestroy {

  constructor(private tsService: ExtractTsInfoService,
              private accountService: AccountService) { }

  course: Course = {} as Course;
  tsSub!: Subscription;
  userSub!: Subscription;

  ngOnInit(): void {
    this.course.links = [];
    this.userSub = this.accountService.getUserDetails().subscribe({
      next: data => {
        console.log("Data: ", data);
        this.course.professor = data.name;
      },
      error: err => console.log("Err: ", err)
    });
  }

  addLink(): void {
    this.course.links.push({} as CourseLink);
  }

  deleteLink(num: number) {
    this.course.links.splice(num, 1);
  }

  saveCourse(): void {
    console.log(this.course);
    this.tsSub = this.tsService.addNewCourse(this.course).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.log("Err: ", err)
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.tsSub) this.tsSub.unsubscribe();
  }

}
