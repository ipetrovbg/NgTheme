import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './app.state.interface';

@Injectable()
export class CounterActions {
    static SUBMIT_LOGIN = 'SUBMIT_LOGIN';
    static ENTER_CREDENTIALS = 'ENTER_CREDENTIALS';

    constructor(private ngRedux: NgRedux<AppState>) {}

    submitLogin(state) {
        this.ngRedux.dispatch({ type: CounterActions.SUBMIT_LOGIN, payload: state });
    }
    enterCredentials({email, password}) {
      this.ngRedux.dispatch({ type: CounterActions.ENTER_CREDENTIALS, payload: { email, password } });
    }
}
