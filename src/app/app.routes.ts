/* Angular Core Modules */
import {
  Routes,
} from '@angular/router';

/* Application Modules */

/* Application Components */
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';


export const appRoutes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**',   component: NotFoundComponent }
];
