import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { routing } from './layout.routes';
import { NavigationComponent } from '../navigation/navigation.component';
import { UserSummaryComponent } from 'app/user-summary/user-summary.component';

/* Angular Material Modules */
import {
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdToolbarModule,
  MdButtonModule,
  MdMenuModule,
  MdCardModule,
  MdDatepickerModule,
  MdNativeDateModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    routing,
  ],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    LayoutComponent,
    UserSummaryComponent,
  ]
})
export class LayoutModule { }
