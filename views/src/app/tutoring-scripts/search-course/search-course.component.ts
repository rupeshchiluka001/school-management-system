import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseQuery } from 'src/app/models/course-query';
import { ExtractTsInfoService } from 'src/app/services/extract-ts-info.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit, OnDestroy {

  constructor(private tsService: ExtractTsInfoService) { }

  courseList: CourseQuery = {} as CourseQuery;
  tsSub!: Subscription;

  ngOnInit(): void {
  }

  getList(page: number) {
    this.tsSub = this.tsService.getCourseList(this.courseList.filter || 'name', this.courseList.value, page).subscribe({
      next: data => {
        this.courseList = data;
      },
      error: err => {
        alert(`Err: ${err.error.msg}`);
      },
      complete: () => {
        this.tsSub.unsubscribe();
      }
    });
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
