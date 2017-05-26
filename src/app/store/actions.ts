import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './app.state.interface';
import { User } from '../user/user';

@Injectable()
export class CounterActions {
    static SUBMIT_LOGIN = 'SUBMIT_LOGIN';
    static ENTER_CREDENTIALS = 'ENTER_CREDENTIALS';
    static UPDATE_USER = 'UPDATE_USER';
    static ERROR_ON_LOGIN = 'ERROR_ON_LOGIN';
    static LOGIN_RESET = 'LOGIN_RESET';
    static UPDATE_NAVIGATION = 'UPDATE_NAVIGATION';
    static FULL_SCREEN = 'FULL_SCREEN';

    constructor(private ngRedux: NgRedux<AppState>) {}

    submitLogin(state) {
        this.ngRedux.dispatch({ type: CounterActions.SUBMIT_LOGIN, payload: state });
    }
    enterCredentials({email, password}) {
      this.ngRedux.dispatch({ type: CounterActions.ENTER_CREDENTIALS, payload: { email, password } });
    }
    updateUser(user: User) {
      this.ngRedux.dispatch({ type: CounterActions.UPDATE_USER, payload: user });
    }
    loginReset() {
      this.ngRedux.dispatch({ type: CounterActions.LOGIN_RESET });
    }
    errorOnLogin(error) {
      this.ngRedux.dispatch({ type: CounterActions.ERROR_ON_LOGIN, payload: error });
    }
    updateNavigation(item) {
      this.ngRedux.dispatch({ type: CounterActions.UPDATE_NAVIGATION, payload: item });
    }
    fullScreenAction() {
      this.ngRedux.dispatch({ type: CounterActions.FULL_SCREEN });
    }
}
