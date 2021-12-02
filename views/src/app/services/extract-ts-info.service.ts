import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { CourseQuery } from '../models/course-query';

@Injectable({
  providedIn: 'root'
})
export class ExtractTsInfoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost';
  private port = 3000;
  private addNewCourseUrl = `${this.apiUrl}:${this.port}/api/ts/add-new-course`;
  private getCourseListByProfessorUrl = `${this.apiUrl}:${this.port}/api/ts/course-list-by-professor`;
  private getCourseListUrl = `${this.apiUrl}:${this.port}/api/ts/courses`;
  private updateCourseListUrl = `${this.apiUrl}:${this.port}/api/ts/update-course`;
  private getCourseDetailsUrl = `${this.apiUrl}:${this.port}/api/ts/course`;

  addNewCourse(course: Course): Observable<any> {
    return this.http.post(this.addNewCourseUrl, course);
  }

  getCourseListByProfessor(page: number): Observable<CourseQuery> {
    return this.http.get<CourseQuery>(this.getCourseListByProfessorUrl, {params: {page}});
  }

  getCourseList(filter: string, value: string, page: number): Observable<CourseQuery> {
    return this.http.get<CourseQuery>(this.getCourseListUrl, {params: {filter, value, page}});
  }

  getCourseDetails(courseId: string): Observable<Course> {
    return this.http.get<Course>(this.getCourseDetailsUrl, {params: {courseId}});
  }

  updateCourseList(course: Course): Observable<any> {
    return this.http.post(this.updateCourseListUrl, course);
  }

}
