/* Angular Core Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './store/store';
import { INITIAL_STATE } from './store/initial.state';
import { AppState } from './store/app.state.interface';

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
    NgReduxRouter,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngReduxRouter: NgReduxRouter,
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
  ) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      null,
      devTools.isEnabled() ? [ devTools.enhancer() ] : []
    );
    ngReduxRouter.initialize();
  }
}
