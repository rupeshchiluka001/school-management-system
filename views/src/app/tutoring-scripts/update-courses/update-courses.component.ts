import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseQuery } from 'src/app/models/course-query';
import { ExtractTsInfoService } from 'src/app/services/extract-ts-info.service';

@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.css']
})
export class UpdateCoursesComponent implements OnInit, OnDestroy {

  constructor(private tsService: ExtractTsInfoService) { }

  courseList: CourseQuery = {} as CourseQuery;
  tsSub!: Subscription;

  getList(page: number) {
    this.tsSub = this.tsService.getCourseListByProfessor(page).subscribe({
      next: data => {
        console.log(data);
        this.courseList = data;
        this.tsSub.unsubscribe();
      },
      error: err => {
        console.log("Err: ", err)
        this.tsSub.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.getList(1);
  }

  pageArray(): Array<number> {
    return new Array(this.courseList.pages);
  }

  pageClicked(pageNum: number): void {
    if (pageNum !== this.courseList.current) {
      this.getList(pageNum);
    }
  }

  showSelectedPage(pageNum: number): Object {
    if (pageNum == this.courseList.current) {
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

  ngOnDestroy(): void {
    if (this.tsSub) this.tsSub.unsubscribe();
  }

}
