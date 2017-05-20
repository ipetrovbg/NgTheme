/* Angular Core Modules */
import {
  Routes,
} from '@angular/router';

/* Application Modules */

/* Application Components */
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
/* Application Guards */
import { AuthGuard } from './user/user.guard';
import { LoginGuard } from './login/login.guard';

/*
 canActivate: [ AuthGuard ]
 */
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**',   component: NotFoundComponent }
];
