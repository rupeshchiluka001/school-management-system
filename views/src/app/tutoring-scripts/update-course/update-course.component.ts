import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private tsService: ExtractTsInfoService,
              private router: Router) { }

  course: Course = {} as Course;  
  id = '';
  courseSub!: Subscription;
  updateSub!: Subscription;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.courseSub = this.tsService.getCourseDetails(this.id).subscribe({
      next: data => {
        this.course = data;
      },
      error: err => alert(`Err: ${err.error.msg}`)
    });
  }

  addLink(): void {
    this.course.links.push({} as CourseLink);
  }

  deleteLink(num: number) {
    this.course.links.splice(num, 1);
  }

  updateCourse(): void {
    this.updateSub = this.tsService.updateCourseList(this.course).subscribe({
      next: data => {
        console.log(data);
        alert("Course Updated Successfully!");
        this.router.navigate(['tutoring-scripts']);
      },
      error: err => console.log("Err: ", err)
    });
  }

  ngOnDestroy(): void {
    if (this.courseSub) this.courseSub.unsubscribe();
    if (this.updateSub) this.updateSub.unsubscribe();
  }

}
