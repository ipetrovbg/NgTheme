import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { routing } from './layout.routes';
import { NavigationComponent } from '../navigation/navigation.component';
import { UserSummaryComponent } from 'app/user-summary/user-summary.component';

/* Shared Module */
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
  ],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    LayoutComponent,
    UserSummaryComponent,
    ProfileComponent,
  ]
})
export class LayoutModule { }
