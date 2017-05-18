/* Angular Core Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';

/* Angular Material Modules */
import {
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdGridListModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdProgressBarModule,
} from '@angular/material';

/* Application Modules */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { appRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { CounterActions } from './store/actions';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MdListModule,
    MdSidenavModule,
    MdIconModule,
    MdGridListModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    NgReduxModule,
    MdProgressBarModule,
  ],
  providers: [
    CounterActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
