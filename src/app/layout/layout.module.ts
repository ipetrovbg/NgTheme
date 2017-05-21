import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { routing } from './layout.routes';
import { NavigationComponent } from '../navigation/navigation.component';

/* Angular Material Modules */
import {
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdToolbarModule,
  MdButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    routing,
  ],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    LayoutComponent,
  ]
})
export class LayoutModule { }
