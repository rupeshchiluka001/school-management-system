import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ExtractTsInfoService } from 'src/app/services/extract-ts-info.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private tsService: ExtractTsInfoService) { }

  course: Course = {} as Course;  
  id = '';
  tsSub!: Subscription;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.tsSub = this.tsService.getCourseDetails(this.id).subscribe({
      next: data => {
        console.log("Data: ", data);
        this.course = data;
      },
      error: err => console.log("Err: ", err)
    });
  }

  ngOnDestroy(): void {
    if (this.tsSub) this.tsSub.unsubscribe();
  }

}
