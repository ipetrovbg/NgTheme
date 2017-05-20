import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './app.state.interface';
import { User } from '../user/user';

@Injectable()
export class CounterActions {
    static SUBMIT_LOGIN = 'SUBMIT_LOGIN';
    static ENTER_CREDENTIALS = 'ENTER_CREDENTIALS';
    static UPDATE_USER = 'UPDATE_USER';
    static ERROR_ON_UPDATE_USER = 'ERROR_ON_UPDATE_USER';

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

    errorOnUpdateUser(error) {
      this.ngRedux.dispatch({ type: CounterActions.ERROR_ON_UPDATE_USER, payload: error });
    }
}
