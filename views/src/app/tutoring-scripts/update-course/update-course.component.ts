import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseLink } from 'src/app/models/course-link';
import { ExtractTsInfoService } from 'src/app/services/extract-ts-info.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private tsService: ExtractTsInfoService) { }

  course: Course = {} as Course;  
  id = '';
  courseSub!: Subscription;
  updateSub!: Subscription;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.courseSub = this.tsService.getCourseDetails(this.id).subscribe({
      next: data => {
        console.log("Data: ", data);
        this.course = data;
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

  updateCourse(): void {
    console.log(this.course);
    this.updateSub = this.tsService.updateCourseList(this.course).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.log("Err: ", err)
    });
  }

  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
    if (this.updateSub) this.updateSub.unsubscribe();
  }

}
