import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { LayoutComponent } from './layout.component';

import { AuthGuard } from '../user/user.guard';


const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
    ],
    canActivate: [ AuthGuard ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
