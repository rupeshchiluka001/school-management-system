import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsHomeComponent } from './ts-home/ts-home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { UpdateCoursesComponent } from './update-courses/update-courses.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  { path: '', component: TsHomeComponent,
    children: [
      { path: 'search', component: SearchCourseComponent },
      { path: 'add-new-course', component: AddNewCourseComponent },
      { path: 'update-courses', component: UpdateCoursesComponent },
      { path: 'update-course/:id', component: UpdateCourseComponent },
      { path: 'course/:id', component: CourseComponent },
      { path: '**', redirectTo: 'search' },
    ]
   },
];

@NgModule({
  declarations: [
    TsHomeComponent,
    CourseComponent,
    AddNewCourseComponent,
    SearchCourseComponent,
    UpdateCoursesComponent,
    UpdateCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TutoringScriptsModule { }
