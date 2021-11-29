import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsHomeComponent } from './ts-home/ts-home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TsHomeComponent,
    children: [
      // { path: 'home', component: TsHomeComponent },
      { path: '**', redirectTo: '' },
    ]
   },
];

@NgModule({
  declarations: [
    TsHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TutoringScriptsModule { }
