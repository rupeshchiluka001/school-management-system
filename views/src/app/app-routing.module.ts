import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookLayerComponent } from './library/book-layer/book-layer.component';
import { LibraryHomeComponent } from './library/library-home/library-home.component';
import { NewBookFormComponent } from './library/new-book-form/new-book-form.component';
import { UpdateBookFormComponent } from './library/update-book-form/update-book-form.component';
import { AuthGuard } from './services/auth.guard';
import { LibNewFormBookGuard } from './services/lib-new-form-book.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent, canActivate: [AuthGuard] },
  { path: 'library', component: LibraryHomeComponent,
    children: [
      { path: 'add-new-book', component: NewBookFormComponent, canActivate: [LibNewFormBookGuard] },
      { path: 'update-book/:id', component: UpdateBookFormComponent },
      { path: 'books', component: BookLayerComponent },
      { path: '**', redirectTo: 'books' },
    ]  
  },
  // { path: 'library/home', component: LibraryHomeComponent },
  // { path: 'library/add-new-book', component: NewBookFormComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
