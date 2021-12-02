import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { SignInGuard } from './services/sign-in.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent, canActivate: [SignInGuard] },
  { path: 'library', 
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)  },
  { path: 'hostel', canActivate: [AuthGuard],
    loadChildren: () => import('./hostel/hostel.module').then(m => m.HostelModule) },
  { path: 'tutoring-scripts',
    loadChildren: () => import('./tutoring-scripts/tutoring-scripts.module').then(m => m.TutoringScriptsModule) },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
