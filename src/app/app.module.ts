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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { rootReducer } from './store/store';
import { INITIAL_STATE } from './store/initial.state';
import { AppState } from './store/app.state.interface';
import { AuthGuard } from './user/user.guard';
import { LoginGuard } from './login/login.guard';

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
import { SharedModule } from 'app/shared/shared.module';

import { appRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { CounterActions } from './store/actions';
import { UserService } from './user/user.service';
import { TileComponent } from './tile/tile.component';
import { RippleDirective } from './shared/ripple.directive';

export const firebaseConfig = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCHjRmkOAeAwHcjsTCTVNXQ8ZuJWrj3TUA',
    authDomain: 'ngtheme.firebaseapp.com',
    databaseURL: 'https://ngtheme.firebaseio.com',
    projectId: 'ngtheme',
    storageBucket: 'ngtheme.appspot.com',
    messagingSenderId: '161069526888'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    LoginFormComponent,
    TileComponent,
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
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgReduxRouterModule,
    SharedModule,
  ],
  providers: [
    CounterActions,
    NgReduxRouter,
    AngularFireDatabase,
    UserService,
    AuthGuard,
    LoginGuard,
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
